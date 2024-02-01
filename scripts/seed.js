const { db } = require('@vercel/postgres');
const {
  all_news,
  channels,
  published_news,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedAllNews(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS all_news (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        channel_id UUID NOT NULL,
        headline VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL,
        published_on_blockchain VARCHAR(255) NOT NULL,
        date DATE NOT NULL
  );
`;


    console.log(`Created "all_news" table`);

    // Insert data into the "all_news" table
    const insertedAllNews = await Promise.all(
        all_news.map(
            (news) => client.sql`
        INSERT INTO all_news (channel_id,  headline, content, published_on_blockchain, date) VALUES (${news.channel_id},  ${news.headline}, ${news.content}, ${news.published_on_blockchain}, ${news.date}) ON CONFLICT (id) DO NOTHING;
            `,
        ), 
    );

    console.log(`Seeded ${insertedAllNews.length} all_news`);

    return {
      createTable,
      all_news: insertedAllNews,
    };
  } catch (error) {
    console.error('Error seeding all_news:', error);
    throw error;
  }
}

async function seedChannels(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "channels" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS channels (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "channels" table`);

    // Insert data into the "channels" table
    const insertedChannels = await Promise.all(
      channels.map(
        (channel) => client.sql`
        INSERT INTO channels (id, name, email, website, image_url)
        VALUES (${channel.id}, ${channel.name}, ${channel.email}, ${channel.website}, ${channel.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedChannels.length} channels`);

    return {
      createTable,
      channels: insertedChannels,
    };
  } catch (error) {
    console.error('Error seeding channels:', error);
    throw error;
  }
}

async function seedPublishedNews(client) {
  try {
    // Create the "published_news" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS published_news (
        month VARCHAR(4) NOT NULL UNIQUE,
        total INT NOT NULL
      );
    `;

    console.log(`Created "published_news" table`);

    // Insert data into the "published_news" table
    const insertedPublishedNews = await Promise.all(
      published_news.map(
        (pnews) => client.sql`
        INSERT INTO published_news (month, total)
        VALUES (${pnews.month}, ${pnews.total})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedPublishedNews.length} published_news`);

    return {
      createTable,
      published_news: insertedPublishedNews,
    };
  } catch (error) {
    console.error('Error seeding published_news:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedChannels(client);
  await seedAllNews(client);
  await seedPublishedNews(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
