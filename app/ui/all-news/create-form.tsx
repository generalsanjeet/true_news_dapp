import { ChannelField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    UserCircleIcon,
    NewspaperIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {createNews} from '@/app/lib/actions';

export default function Form({ channels }: { channels: ChannelField[] }) {
    return (
        <form action={createNews}>
            <div className="rounded-md bg-stone-800 p-4 md:p-6">
                {/* Channel Name */}
                <div className="mb-4">
                    <label htmlFor="channel" className="mb-2 block text-sm font-medium text-amber-500">
                        Choose channel
                    </label>
                    <div className="relative">
                        <select
                            id="channel"
                            name="channelId"
                            className="peer block w-full cursor-pointer rounded-md border border-stone-500 py-2 pl-10 text-sm outline-2 placeholder:text-stone-500 bg-stone-700  text-stone-400"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a channel
                            </option>
        {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
                {channel.name}
            </option>
        ))}
    </select>
    <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-200" />
</div>
        </div>

        {/* News headline */}
        <div className="mb-4">
            <label htmlFor="headline" className="mb-2 block text-sm font-medium text-amber-500">
                Write a headline
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <input
                        id="headline"
                        name="headline"
                        type="text"
                        step="0.01"
                        placeholder="Enter headline here"
                        className="peer block w-full rounded-md border border-stone-500 py-2 pl-10 text-sm outline-2 placeholder:text-stone-400 bg-stone-700 text-white"
                    />
                    <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone-200 peer-focus:text-stone-700" />
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
                Published on blockchain or not
            </legend>
            <div className="rounded-md border border-stone-500 bg-stone-700 px-[14px] py-3">
                <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                            id="no"
                            name="published_on_blockchain"
                            type="radio"
                            value="no"
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
        <Button type="submit">Create News</Button>
    </div>
</form>
  );
}
