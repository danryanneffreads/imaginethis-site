/* src/data/rooms.ts */

export type Room = {
  slug: string;
  name: string;
  artist: string;
  category: string;
  oneLine: string;
  blurb: string;
  description: string[];
  highlights: string[];
  photoLabel: string;
  priceFrom: number;
};

export const rooms: Room[] = [
  {
    slug: 'bridge-over-troubled-water',
    name: 'Bridge Over Troubled Water',
    artist: 'Simon & Garfunkel',
    category: 'Ground-floor room',
    oneLine:
      'A quiet ground-floor room with garden access and a deep soaking tub.',
    blurb:
      'A peaceful ground-floor room with soft light, garden access, a king bed, and the deepest soaking tub in the house.',
    description: [
      'Bridge Over Troubled Water is on the ground floor at the back of the house. It is one of our quietest rooms, with soft light, simple finishes, and a private door that opens toward the garden.',
      'The room has a king bed, comfortable seating, and a calm, uncluttered feel. The bathroom includes the deepest soaking tub in the house, making this a good choice after a long walk by the lake or through the dunes.',
      'Guests often choose this room when they want easy access, privacy, and a little more quiet at the end of the day.',
    ],
    highlights: [
      'King bed',
      'Ground-floor room',
      'Private garden entrance',
      'Deep soaking tub',
      'Quiet location at the back of the house',
    ],
    photoLabel:
      'Bridge Over Troubled Water — quiet ground-floor room with garden access',
    priceFrom: 215,
  },
  {
    slug: 'here-comes-the-sun',
    name: 'Here Comes the Sun',
    artist: 'The Beatles',
    category: 'Bright room',
    oneLine:
      'A bright second-floor room with large windows and views toward the garden and lake.',
    blurb:
      'Our brightest room, with pale walls, generous windows, a queen bed, and views toward the garden and Lake Michigan.',
    description: [
      'Here Comes the Sun is one of the brightest rooms in the inn. Large windows bring in morning light, and the pale walls give the room an open, easy feeling throughout the day.',
      'The room has a queen bed, a comfortable place to sit, and views toward the garden and lake. It is a good fit for guests who like waking up with the light and want a room that feels airy and relaxed.',
      'The bathroom is compact and bright, with everything needed for a comfortable stay.',
    ],
    highlights: [
      'Queen bed',
      'Bright second-floor room',
      'Large windows',
      'Garden and lake views',
      'Comfortable reading area',
    ],
    photoLabel: 'Here Comes the Sun — bright room with garden and lake views',
    priceFrom: 195,
  },
  {
    slug: 'harvest-moon',
    name: 'Harvest Moon',
    artist: 'Neil Young',
    category: 'Fireplace room',
    oneLine:
      'A warm room with wood-paneled walls, a fireplace, and views toward the lake.',
    blurb:
      'A warm, wood-paneled room with a king bed, fireplace, comfortable seating, and views toward the Lake Michigan shoreline.',
    description: [
      'Harvest Moon is one of the warmest rooms in the house, both in color and atmosphere. Wood-paneled walls, a fireplace, and soft evening light give the room a settled, comfortable feel.',
      'The room has a king bed, seating near the fireplace, and views toward the lake. It is especially appealing in the colder months, when the room feels quiet and tucked away from the rest of the house.',
      'Guests often choose Harvest Moon for a slower weekend, an anniversary, or a stay centered around rest, reading, and time indoors.',
    ],
    highlights: [
      'King bed',
      'Fireplace',
      'Wood-paneled walls',
      'Lake views',
      'Comfortable sitting area',
    ],
    photoLabel:
      'Harvest Moon — warm wood-paneled room with fireplace and lake views',
    priceFrom: 235,
  },
  {
    slug: 'come-on-up-to-the-house',
    name: 'Come On Up to the House',
    artist: 'Tom Waits',
    category: 'Large suite',
    oneLine:
      'The largest room in the inn, with a fireplace, sitting area, and room to spread out.',
    blurb:
      'Our largest room, with a king bed, fireplace, generous sitting area, record player, and west-facing windows.',
    description: [
      'Come On Up to the House is the largest room at Sandy City Inn. It has a king bed, a generous sitting area, and enough space to settle in for more than a night or two.',
      'The room includes a fireplace, two lounge chairs, a record player, and west-facing windows that bring in warm light later in the day. It feels less like a hotel room and more like a private upstairs retreat.',
      'This room is a good choice for longer stays, special occasions, or guests who want a little more space while still being close to the rest of the house.',
    ],
    highlights: [
      'King bed',
      'Largest room in the inn',
      'Fireplace',
      'Separate sitting area',
      'Record player',
      'West-facing windows',
    ],
    photoLabel:
      'Come On Up to the House — large suite with fireplace and sitting area',
    priceFrom: 285,
  },
  {
    slug: 'river',
    name: 'River',
    artist: 'Joni Mitchell',
    category: 'Cozy room',
    oneLine:
      'A smaller, quieter room with a fireplace, darker wood, and a view toward the trees.',
    blurb:
      'A cozy corner room with a double bed, fireplace, darker wood, and a quiet view toward the trees.',
    description: [
      'River is the smallest room in the inn, and its size is part of its appeal. It is tucked into a quiet corner of the house, with darker wood, a fireplace, and a single window looking toward the trees.',
      'The room has a double bed, a reading chair, and a simple, comfortable layout. It is best for one guest or two people who do not need a large room.',
      'River is especially good in colder weather, when the fireplace and darker finishes make the room feel sheltered and quiet.',
    ],
    highlights: [
      'Double bed',
      'Cozy corner room',
      'Fireplace',
      'View toward the trees',
      'Reading chair',
      'Compact bathroom with shower',
    ],
    photoLabel:
      'River — cozy corner room with fireplace and view toward the trees',
    priceFrom: 175,
  },
];

export const getRoomBySlug = (slug: string): Room | undefined =>
  rooms.find((r) => r.slug === slug);
