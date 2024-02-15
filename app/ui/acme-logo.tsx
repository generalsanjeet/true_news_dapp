import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-14 w-14 rotate-[15deg] ml-2" />
      <p className="text-[40px] text-amber-500 font-bold ml-2" >True News</p>
    </div>
  );
}
