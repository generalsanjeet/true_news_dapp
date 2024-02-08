// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Channel = {
    id: string;
    name: string;
    email: string;
    website: string;
    image_url: string;
};

export type News  = {
    id: string;
    channel_id: string;
    headline: string;
    content: string;
    published_on_blockchain: 'no' | 'yes';
    date: string;
};

export type PublishedNews = {
    month: string;
    total: number;
};

export type LatestNews = {
    id: string;
    name: string;
    image_url: string;
    headline: string;
    content: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestNewsRaw = {
    headline: string;
};

export type AllNewsTable = {
    id: string;
    channel_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    headline: string;
    content: string;
    published_on_blockchain: 'no' | 'yes';
};

export type ChannelsTableType = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_news: number;
    total_nonblockchain_news: number;
    total_blockchain_news: number;
};

export type FormattedChannelsTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    total_all_news: number;
    total_published: string;
    total_unpublished: string;
};

export type ChannelField = {
    id: string;
    name: string;
};

export type NewsForm = {
    id: string;
    channel_id: string;
    headline: string;
    content: string;
    published_on_blockchain: 'no' | 'yes';
};
