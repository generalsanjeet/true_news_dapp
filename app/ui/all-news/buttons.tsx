import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {deleteNews} from '@/app/lib/actions';

export function CreateNews() {
    return (
        <Link
            href="/dashboard/all-news/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create News</span>{' '}
                <PlusIcon className="h-5 md:ml-4" />
            </Link>
    );
}

export function UpdateNews({ id }: { id: string }) {
    return (
        <Link
            href={`/dashboard/all-news/${id}/edit`}
            className="rounded-md  p-2 bg-stone-950 text-yellow-500  hover:text-white"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteNews({ id }: { id: string }) {
    const deleteNewsWithId = deleteNews.bind(null, id);
    return (
        <form action={deleteNewsWithId}>
            <button className="rounded-md  p-2  bg-stone-950 text-yellow-500 hover:text-white">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
