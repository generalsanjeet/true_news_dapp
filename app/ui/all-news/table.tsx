import Image from 'next/image';
import { UpdateNews, DeleteNews, ViewsNews} from '@/app/ui/all-news/buttons';
import PubOnBlock from '@/app/ui/all-news/pub-on-block';
import {formatDateToLocal} from '@/app/lib/utils';
import {fetchFilteredAllNews} from '@/app/lib/data';

export default async function AllNewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {

  const all_news = await fetchFilteredAllNews(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-stone-900 p-2 md:pt-0">
          <div className="md:hidden">
            {all_news?.map((news) => (
              <div key={news.id} className="mb-2 w-full rounded-md bg-stone-700 p-4 text-white">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={news.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${news.name}'s profile picture`}
                      />
                      <p>{news.name}</p>
                    </div>
                    <p className="text-sm text-white">{news.email}</p>
                  </div>
                  <PubOnBlock published_on_blockchain={news.published_on_blockchain} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {news.headline}
                    </p>
                    <p>{formatDateToLocal(news.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateNews id={news.id} />
                    <DeleteNews id={news.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm text-amber-500 font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Channel
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  headline
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  published on blockchain
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-stone-700">
              {all_news?.map((news) => (
                <tr
                  key={news.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg text-white"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={news.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${news.name}'s profile picture`}
                      />
                      <p>{news.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-stone-400">
                    {news.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {news.headline}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {formatDateToLocal(news.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <PubOnBlock published_on_blockchain={news.published_on_blockchain} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3 text-yellow-500">
                      <ViewsNews id={news.id} />
                      <UpdateNews id={news.id} />
                      <DeleteNews id={news.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
