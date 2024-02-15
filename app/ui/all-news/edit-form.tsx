'use client';
import { updateNews} from '@/app/lib/actions';

import { ChannelField, NewsForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditNewsForm({
  news,
  channels,
}: {
  news: NewsForm;
  channels: ChannelField[];
}) {
     const updateNewsWithId = updateNews.bind(null, news.id);
  return (
    <form action={updateNewsWithId}>
      <div className="rounded-md bg-stone-800 p-4 md:p-6">
        {/* Channel Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium text-amber-500">
            Choose channel
          </label>
          <div className="relative">
            <select
              id="channel"
              name="channelId"
              className="peer block w-full cursor-pointer rounded-md border border-stone-500 py-2 pl-10 text-sm outline-2 placeholder:text-stone-500 bg-stone-700 text-stone-400"
              defaultValue={news.channel_id}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* News Headline */}
        <div className="mb-4">
          <label htmlFor="headline" className="mb-2 block text-sm font-medium text-amber-500">
            Change the headline
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="headline"
                name="headline"
                type="text"
                step="0.01"
                defaultValue={news.headline}
                placeholder="Enter news headline"
                className="peer block w-full rounded-md border border-stone-500 py-2 pl-10 text-sm outline-2 placeholder:text-stone-500 text-stone-400 bg-stone-700"
              />
              <NewspaperIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* News Content */}
        <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-amber-500">
                Write the content
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <textarea
                        id="content"
                        name="content"
                        defaultValue={news.content}
                        placeholder="Enter content here"
                        className="peer block w-full rounded-md border border-stone-500 py-2 pl-10 text-sm outline-2 placeholder:text-stone-400 bg-stone-700 text-stone-400"
                        rows={4} // Set the number of rows for multi-line content input
                        cols={50} // Set the number of columns for multi-line content input
                    />
                    <NewspaperIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-200 peer-focus:text-stone-700" />
                </div>
            </div>
        </div>



        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-amber-500">
            Set the published on blockhain status
          </legend>
          <div className="rounded-md border border-stone-500 bg-stone-700 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="no"
                  name="published_on_blockchain"
                  type="radio"
                  value="no"
                  defaultChecked={news.published_on_blockchain === 'no'}
                  className="h-4 w-4 cursor-pointer border-black-300 bg-stone-400 text-black-500 focus:ring-2"
                />
                <label
                  htmlFor="no"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  No <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="yes"
                  name="published_on_blockchain"
                  type="radio"
                  value="yes"
                  defaultChecked={news.published_on_blockchain === 'yes'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="yes"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Yes <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/all-news"
          className="flex h-10 items-center rounded-lg bg-stone-500 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-900"
        >
          Cancel
        </Link>
        <Button type="submit">Edit News</Button>
      </div>
    </form>
  );
}
