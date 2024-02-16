import Breadcrumbs from '@/app/ui/all-news/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchNewsById, fetchChannelById } from '@/app/lib/data';
import NewsView from '@/app/ui/all-news/news-view';

export default async function Page({ params }: { params: { id: string } }) {
    
    const id = params.id;

    const [nViewData] = await Promise.all([
        fetchNewsById(id),
    ]);


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
            <NewsView newsview={nViewData}  />
        </main>
    );
}

