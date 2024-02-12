import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestAllNews } from '@/app/lib/data';

export default async function LatestAllNews() {
  const latestAllNews = await fetchLatestAllNews();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-yellow-500`}>
        Latest All news
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-stone-950  p-4">

         <div className="px-1">
          {latestAllNews.map((news, i) => {
            return (
              <div
                key={news.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4 bg-stone-700 px-5 rounded-md',
                  {
                    'border-t border-black': i !== 0,
                  },
                )}
              >
                <div className="flex items-center text-white">
                  <Image
                    src={news.image_url}
                    alt={`${news.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {news.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {news.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base text-white`}
                >
                  {news.headline}
                </p>
              </div>
            );
          })}
        </div> 
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-amber-500" />
          <h3 className="ml-2 text-sm text-amber-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
