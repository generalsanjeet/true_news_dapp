import Breadcrumbs from '@/app/ui/all-news/breadcrumbs';
//import { fetchNewsById, fetchChannels } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    
    const id = params.id;
    console.log("id is ",id);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'AllNews', href: '/dashboard/all-news' },
                    {
                        label: 'Views News',
                        href: `/dashboard/all_news/${id}/view`,
                        active: true,
                    },
                ]}
            />
            <div className="h-auto  w-auto p-10 mx-auto  bg-stone-800 rounded-md shadow-md shadow-black">
                <p className="text-white text-4xl">This page with id [${id}] is  under development.. will come soon</p> 
            </div>
        </main>
    );
}

