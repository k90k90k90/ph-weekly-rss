const { Feed } = require('feed');
const dayjs = require('dayjs');
const fs = require('fs');
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)


const feed = new Feed({
  title: 'Product Hunt weekly RSS feed',
  description: 'The missing RSS feed for ProductHunt weekly top posts',
  link: 'https://github.com/k90k90k90/ph-weekly-rss',
});

const items = Array(7).fill()
  .map((_, i) => dayjs().subtract(i, 'week'))
  .map(day => ({
    title: `Product Hunt weekly top posts @${day.year()}/${day.week()}`,
    date: day.toDate(),
    link: `https://www.producthunt.com/leaderboard/weekly/${day.year()}/${day.week()}`,
  }))
  .forEach(item => feed.addItem(item));

const RSSXML = feed.rss2();
fs.writeFileSync('./rss.xml', RSSXML);
