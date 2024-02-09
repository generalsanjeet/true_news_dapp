import { sql } from '@vercel/postgres';
import {
    ChannelField,
    ChannelsTableType,
    NewsForm,
    AllNewsTable,
    LatestNewsRaw,
    User,
    PublishedNews,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


export async function fetchPublishedNews() {
    noStore();

    try {
        const data = await sql<PublishedNews>`SELECT * FROM published_news`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch published_news data.');
    }
}

export async function fetchLatestAllNews() {
    noStore();
    try {
        const data = await sql<LatestNewsRaw>`
      SELECT all_news.headline, channels.name, channels.image_url, channels.email, all_news.id
      FROM all_news
      JOIN channels ON all_news.channel_id = channels.id
      ORDER BY all_news.date DESC
      LIMIT 5`;

        const latestAllNews = data.rows.map((news) => ({
            ...news,
        }));
        //console.log("latest all news in data.ts is ", latestAllNews);
        return latestAllNews;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest all news.');
    }
}

export async function fetchCardData() {
    noStore();
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        const allNewsCountPromise = sql`SELECT COUNT(*) FROM all_news`;
        const channelsCountPromise = sql`SELECT COUNT(*) FROM channels`;
        const newsStatusPromise = sql`SELECT
         SUM(CASE WHEN published_on_blockchain = 'yes' THEN 1 ELSE 0 END) AS "yes",
         SUM(CASE WHEN published_on_blockchain = 'no' THEN 1  ELSE 0 END) AS "no"
         FROM all_news`;

        const data = await Promise.all([
            allNewsCountPromise,
            channelsCountPromise,
            newsStatusPromise,
        ]);


        const numberOfAllNews = Number(data[0].rows[0].count ?? '0');
        const numberOfChannels = Number(data[1].rows[0].count ?? '0');
        const totalPublishedNews = Number(data[2].rows[0].yes);
        const totalUnpublishedNews = Number(data[2].rows[0].no);

        return {
            numberOfAllNews,
            numberOfChannels,
            totalPublishedNews,
            totalUnpublishedNews,
        };

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredAllNews(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const all_news = await sql<AllNewsTable>`
      SELECT
        all_news.id,
        all_news.headline,
        all_news.date,
        all_news.published_on_blockchain,
        channels.name,
        channels.email,
        channels.image_url
      FROM all_news
      JOIN channels ON all_news.channel_id = channels.id
      WHERE
        channels.name ILIKE ${`%${query}%`} OR
        channels.email ILIKE ${`%${query}%`} OR
        all_news.headline::text ILIKE ${`%${query}%`} OR
        all_news.date::text ILIKE ${`%${query}%`} OR
        all_news.published_on_blockchain ILIKE ${`%${query}%`}
      ORDER BY all_news.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

        return all_news.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch all_news.');
    }
}

export async function fetchAllNewsPages(query: string) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
    FROM all_news
    JOIN channels ON all_news.channel_id = channel_id
    WHERE
      channels.name ILIKE ${`%${query}%`} OR
      channels.email ILIKE ${`%${query}%`} OR
      all_news.headline ILIKE ${`%${query}%`} OR
      all_news.date::text ILIKE ${`%${query}%`} OR
      all_news.published_on_blockchain ILIKE ${`%${query}%`}
  `;

        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of all news.');
    }
}

export async function fetchNewsById(id: string) {
    noStore();
    try {
        const data = await sql<NewsForm>`
      SELECT
        all_news.id,
        all_news.channel_id,
        all_news.headline,
        all_news.published_on_blockchain
      FROM all_news
      WHERE all_news.id = ${id};
    `;

        const news = data.rows.map((news) => ({
            ...news,
            // Convert amount from cents to dollars
        }));

        //console.log(invoice); // Invoice is an empty array []

        return news[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch news.');
    }
}

export async function fetchChannels() {
    try {
        const data = await sql<ChannelField>`
      SELECT
        id,
        name
      FROM channels
      ORDER BY name ASC
    `;

        const channels = data.rows;
        return channels;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all channels.');
    }
}

export async function fetchFilteredChannels(query: string) {
    noStore();
    try {
        const data = await sql<ChannelsTableType>`
        SELECT
          channels.id,
          channels.name,
          channels.email,
          channels.image_url,
          COUNT(all_news.id) AS total_all_news,
          SUM(CASE WHEN all_news.published_on_blockchain = 'no' THEN 1 ELSE 0 END) AS unpublished,
          SUM(CASE WHEN all_news.published_on_blockchain = 'yes' THEN 1 ELSE 0 END) AS published
        FROM channels
        LEFT JOIN all_news ON channels.id = all_news.channel_id
        WHERE
          channels.name ILIKE ${`%${query}%`} OR
        channels.email ILIKE ${`%${query}%`}
        GROUP BY channels.id, channels.name, channels.email, channels.image_url
        ORDER BY channels.name ASC
      `;

        const channels = data.rows.map((channel) => ({
            ...channel,
            //unpublished: channel.unpublished,
            //published: channel.published,
        }));

        return channels;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch channel table.');
    }
}

export async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
