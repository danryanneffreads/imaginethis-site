/* src/data/town-picks.ts */
// "Our Town" — local recommendations for guests.

export type TownPick = {
  number: number;
  category: string;
  title: string;
  body: string;
};

export const townPicks: TownPick[] = [
  {
    number: 1,
    category: 'Coffee',
    title: 'The bookshop café on Mill Street',
    body: 'A good first stop in town, with coffee, books, and a few tables by the front windows. It is an easy walk from the inn and a comfortable place to spend a slower morning.',
  },
  {
    number: 2,
    category: 'Outdoors',
    title: 'The dunes at the state park',
    body: 'Fifteen minutes north of town, the dunes are one of the best ways to experience the Lake Michigan shoreline. Go early if you want quieter trails and softer light.',
  },
  {
    number: 3,
    category: 'Market',
    title: 'The farmers market',
    body: 'Held on the square from May through October, the farmers market is worth visiting for produce, flowers, bread, cheese, and a good sense of the town on a weekend morning.',
  },
  {
    number: 4,
    category: 'View',
    title: 'The bell tower',
    body: 'The bell tower sits above campus and offers one of the best views in Sandy City, with the lake, downtown, and the dunes all visible on a clear day.',
  },
  {
    number: 5,
    category: 'Evening',
    title: 'Riverside Tavern',
    body: 'A relaxed place near the water for a drink, a simple dinner, or an easy evening after a day outside. Sit outdoors when the weather allows.',
  },
  {
    number: 6,
    category: 'On the water',
    title: 'The community rowing club',
    body: 'The rowing club offers a quiet way to see the bay in the early morning. Visitors can check the schedule for open rows and seasonal events.',
  },
  {
    number: 7,
    category: 'Lunch',
    title: 'The lunch counter at the hardware store',
    body: 'A small downtown lunch counter serving soup, sandwiches, and pie. It is casual, local, and a good stop if you are spending the afternoon in town.',
  },
  {
    number: 8,
    category: 'Quiet',
    title: 'The public library reading room',
    body: 'The second-floor reading room is a calm place to sit for an hour, especially on cold or rainy days. Tall windows, long tables, and plenty of quiet.',
  },
];
