// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
    },
];

const channels = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'abc news',
        email: 'delba@oliveira.com',
        website: 'abc.com',
        image_url: '/channels/delba-de-oliveira.png',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'xyz news',
        email: 'lee@robinson.com',
        website: 'xyz.com',
        image_url: '/channels/lee-robinson.png',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'dd10 news',
        email: 'hector@simpson.com',
        website: 'dd10.com',
        image_url: '/channels/hector-simpson.png',
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        name: 'tt news',
        email: 'steven@tey.com',
        website: 'tt.com',
        image_url: '/channels/steven-tey.png',
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        name: 'hh news',
        email: 'steph@dietz.com',
        website: 'hh.com',
        image_url: '/channels/steph-dietz.png',
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        name: 'qq news',
        email: 'michael@novotny.com',
        website: 'qq.com',
        image_url: '/channels/michael-novotny.png',
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        name: 'rr news',
        email: 'evil@rabbit.com',
        website: 'rr.com',
        image_url: '/channels/evil-rabbit.png',
    },
    {
        id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
        name: 'ss news',
        email: 'emil@kowalski.com',
        website: 'ss.com',
        image_url: '/channels/emil-kowalski.png',
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        name: 'pp news',
        email: 'amy@burns.com',
        website: 'pp.com',
        image_url: '/channels/amy-burns.png',
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        name: 'kk news',
        email: 'balazs@orban.com',
        website: 'kk.com',
        image_url: '/channels/balazs-orban.png',
    },
];

const all_news = [
    {
        channel_id: channels[0].id,
        headline: "choopra won gold",
        content: "niraj chopra won gold",
        published_on_blockchain: 'no',
        date: '2022-12-06',
    },
    {
        channel_id: channels[1].id,
        headline: "kohli centrury",
        content: "virat kohli scored 110",
        published_on_blockchain: 'no',
        date: '2023-11-23',
    },
    {
        channel_id: channels[4].id,
        headline: "gpt4 launched",
        content: "openai launched chatgpt 4",
        published_on_blockchain: 'no',
        date: '2023-10-29',
    },
    {
        channel_id: channels[3].id,
        headline: "bard came out",
        content: "google bard answer to gpt",
        published_on_blockchain: 'no',
        date: '2023-10-10',
    },
    {
        channel_id: channels[5].id,
        headline: "sachin retired",
        content: "sachin got retired from cricket",
        published_on_blockchain: 'yes',
        date: '2010-08-05',
    },
    {
        channel_id: channels[7].id,
        headline: "tesla new model",
        content: "elon musk launched new car",
        published_on_blockchain: 'yes',
        date: '2022-05-16',
    },
    {
        channel_id: channels[6].id,
        headline: "lata mangeskar",
        content: "lata mangeskar passed away",
        published_on_blockchain: 'no',
        date: '2022-06-27',
    },
    {
        channel_id: channels[3].id,
        headline: "microsoft ceo",
        content: "satya nadela new ceo",
        published_on_blockchain: 'yes',
        date: '2012-06-09',
    },
    {
        channel_id: channels[4].id,
        headline: "sergy bin retired",
        content: "sundar pichai new google ceo",
        published_on_blockchain: 'yes',
        date: '2005-06-17',
    },
    {
        channel_id: channels[5].id,
        headline: "bolt world record",
        content: "ussain bolt 9.5 seconds world record",
        published_on_blockchain: 'yes',
        date: '2015-06-07',
    },
    {
        channel_id: channels[1].id,
        headline: "marry com won gold",
        content: "very famouse boxer marry com won olympic gold",
        published_on_blockchain: 'no',
        date: '2023-08-19',
    },
    {
        channel_id: channels[5].id,
        headline: "sam altman fired",
        content: "openai ceo got fired",
        published_on_blockchain: 'no',
        date: '2023-06-03',
    },
    {
        channel_id: channels[2].id,
        headline: "new cancer research",
        content: "new nano bot has been laucnched to battle cancer",
        published_on_blockchain: 'no',
        date: '2023-06-18',
    },
    {
        channel_id: channels[0].id,
        headline: "ai will kill jobs",
        content: "gpt will take 80% jobs till 2025",
        published_on_blockchain: 'yes',
        date: '2023-10-04',
    },
    {
        channel_id: channels[2].id,
        headline: "covid spread",
        content: "covid spreaded all over in india",
        published_on_blockchain: 'no',
        date: '2022-06-05',
    },
];

const published_news = [
    { month: 'Jan', total: 2000 },
    { month: 'Feb', total: 1800 },
    { month: 'Mar', total: 2200 },
    { month: 'Apr', total: 2500 },
    { month: 'May', total: 2300 },
    { month: 'Jun', total: 3200 },
    { month: 'Jul', total: 3500 },
    { month: 'Aug', total: 3700 },
    { month: 'Sep', total: 2500 },
    { month: 'Oct', total: 2800 },
    { month: 'Nov', total: 3000 },
    { month: 'Dec', total: 4800 },
];

module.exports = {
    users,
    channels,
    all_news,
    published_news,
};
