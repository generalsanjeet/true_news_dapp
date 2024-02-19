import Form from '@/app/ui/all-news/edit-form';
import Breadcrumbs from '@/app/ui/all-news/breadcrumbs';
import { fetchChannels, fetchNewsForEditById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [news, channels] = await Promise.all([
        fetchNewsForEditById(id),
        fetchChannels(),
    ]);

    if (!news) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'AllNews', href: '/dashboard/all-news' },
                    {
                        label: 'Edit News',
                        href: `/dashboard/all_news/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form news={news} channels={channels} />
        </main>
    );
}

