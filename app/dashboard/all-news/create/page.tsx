import Form from '@/app/ui/all-news/create-form';
import Breadcrumbs from '@/app/ui/all-news/breadcrumbs';
import { fetchChannels } from '@/app/lib/data';

export default async function Page() {
    const channels = await fetchChannels();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'AllNews', href: '/dashboard/all-news' },
                    {
                        label: 'Create News',
                        href: '/dashboard/all-news/create',
                        active: true,
                    },
                ]}
            />
            <Form channels={channels} />
        </main>
    );
}
