import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  yes: BanknotesIcon,
  channels: UserGroupIcon,
  no: ClockIcon,
  all_news: InboxIcon,
};

export default async function CardWrapper() {
  const {
        numberOfAllNews,
        numberOfChannels,
        totalPublishedNews,
        totalUnpublishedNews,
    } = await fetchCardData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Published" value={totalPublishedNews} type="yes" />
      <Card title="Unpublished" value={totalUnpublishedNews} type="no" />
      <Card title="All news" value={numberOfAllNews} type="all_news" />
      <Card
        title="Total Channels"
        value={numberOfChannels}
        type="channels"
      /> 
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'all_news' | 'channels' | 'no' | 'yes';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-black p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-amber-500" /> : null}
        <h3 className="ml-2 text-sm font-medium text-amber-500">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-stone-800 px-4 py-8 text-center text-2xl text-white`}
      >
        {value}
      </p>
    </div>
  );
}

