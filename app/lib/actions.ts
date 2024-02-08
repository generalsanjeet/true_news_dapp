'use server';

import {z} from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    channelId: z.string(),
    headline: z.string(),
    published_on_blockchain: z.enum(['no', 'yes']),
    date: z.string(),
});

const CreateNews = FormSchema.omit({id: true, date: true});
const UpdateNews = FormSchema.omit({ id: true, date: true });

export async function createNews(formData: FormData) {
    const {channelId, headline, published_on_blockchain} = CreateNews.parse({
        channelId: formData.get('channelId'),
        headline: formData.get('headline'),
        published_on_blockchain: formData.get('published_on_blockchain'),
    });
    const date = new Date().toISOString().split('T')[0];
    const content_sample_data = "this is content sample data";

    console.log("channel id is ", channelId);
    console.log("headline is ", headline);
    console.log("published on blockhain is", published_on_blockchain);

    try {
        await sql`
            INSERT INTO all_news (channel_id, headline, content,  published_on_blockchain, date)
            VALUES (${channelId}, ${headline}, ${content_sample_data}, ${published_on_blockchain}, ${date})
            `;
        console.log("one row inserted");
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create News.',
        };
    }


    revalidatePath('dashboard/all-news');
    redirect('/dashboard/all-news');
}

export async function updateNews(id: string, formData: FormData) {
    const { channelId, headline, published_on_blockchain } = UpdateNews.parse({
        channelId: formData.get('channelId'),
        headline: formData.get('headline'),
        published_on_blockchain: formData.get('published_on_blockchain'),
    });

    try {
        await sql`
        UPDATE all_news
        SET channel_id = ${channelId}, headline = ${headline}, published_on_blockchain = ${published_on_blockchain}
        WHERE id = ${id}
        `;
    } catch(error) {
       return { message: 'Database Error: Failed to Update News.' };
    }


    revalidatePath('/dashboard/all-news');
    redirect('/dashboard/all-news');
}

export async function deleteNews(id: string) {
    // uncomment the below line to test error page
    // throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM all_news WHERE id = ${id}`;
        revalidatePath('/dashboard/all-news');
        return {message: 'deleted news'};
    } catch(error) {
        return { message: 'Database Error: Failed to Delete News.' };
    }
}

