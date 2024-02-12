import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchPublishedNews } from '@/app/lib/data';

export default async function PublishedNewsChart() {
  const publishedNews = await fetchPublishedNews(); // Fetch data inside the component
  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course

   const { yAxisLabels, topLabel } = generateYAxis(publishedNews);

   if (!publishedNews || publishedNews.length === 0) {
     return <p className="mt-4 text-gray-400">No data available.</p>;
   }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-yellow-500`}>
        Recent Published News
      </h2>

       <div className="rounded-xl bg-stone-900 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-stone-700 p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {publishedNews.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-stone-500"
                style={{
                  height: `${(chartHeight / topLabel) * month.total}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-white sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-amber-500" />
          <h3 className="ml-2 text-sm text-amber-500">Last 12 months</h3>
        </div>
      </div> 
    </div>
  );
}
