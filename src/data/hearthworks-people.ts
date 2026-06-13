export type Person = {
  slug: string;
  name: string;
  role: string;
  location: string; // "City, ST"
  bio: string;
  photo: string; // /images/people/filename.webp
  email?: string;
  links?: { label: string; href: string }[];
};

export const people: Person[] = [
  {
    slug: 'robert-hart',
    name: 'Robert Hart',
    role: 'Principal Architect',
    location: 'Madison, WI',
    bio: 'Leads residential and community projects with a focus on neighborhood context, craftsmanship, and everyday life.',
    photo: '/images/people/robert-hart.webp',
    email: 'robert@hearthworks.example',
  },
  {
    slug: 'maya-lindstrom',
    name: 'Maya Lindstrom',
    role: 'Landscape & Urban Design',
    location: 'Madison, WI',
    bio: 'Connects buildings to gardens, courtyards, and walkable streets—treating outdoor rooms as everyday spaces.',
    photo: '/images/people/maya-lindstrom.webp',
  },
  {
    slug: 'tessa-thompson',
    name: 'Tessa Thompson',
    role: 'Project Coordinator',
    location: 'Chicago, IL',
    bio: 'Keeps projects organized and connected—neighbors, partners, schedules, and the details that make places work.',
    photo: '/images/people/tessa-thompson.webp',
  },
  {
    slug: 'sam-peters',
    name: 'Sam Peters',
    role: 'Community & Partnerships',
    location: 'Chicago, IL',
    bio: 'Works with local groups, libraries, and small businesses to align projects with neighborhood needs.',
    photo: '/images/people/sam-peters.webp',
  },
];
