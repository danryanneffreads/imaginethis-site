export type GalleryItem = {
  src: string;
  alt: string;
  spaces: string[];
  materials: string[];
};

export type Project = {
  slug: string;
  title: string;
  location: string; // "City, ST"
  type:
    | 'Residential'
    | 'Mixed-Use Residential'
    | 'Library'
    | 'Workplace'
    | 'Hospitality'
    | 'Community';
  summary: string;
  spaces: string[];
  materials: string[];
  hero: string;
  gallery: GalleryItem[];
};

export const enums = {
  types: [
    'Residential',
    'Mixed-Use Residential',
    'Library',
    'Workplace',
    'Hospitality',
    'Community',
  ],
  spaces: [
    'Porch',
    'Courtyard',
    'Garden',
    'Cafe',
    'Office',
    'Library',
    'Entryway',
    'Balcony',
    'Stair',
    'Streetfront',
  ],
  materials: ['Brick', 'Wood', 'Stone', 'Glass', 'Tile', 'Plaster', 'Ironwork'],
};

// Helper: detect projects not in IL/WI
export function isElsewhere(location: string) {
  return !(location.includes(', IL') || location.includes(', WI'));
}

export const projects: Project[] = [
  {
    slug: 'oak-terrace-porch-renewal',
    title: 'Oak Terrace Porch Renewal',
    location: 'University Heights, Madison, WI',
    type: 'Residential',
    summary:
      'Timber porch additions and repairs reconnect an early 1900s home to its front garden and street life.',
    spaces: ['Porch', 'Entryway', 'Garden', 'Stair'],
    materials: ['Wood', 'Stone', 'Brick', 'Ironwork', 'Glass'],
    hero: '/images/architecture/residence-porch.webp',
    gallery: [
      {
        src: '/images/architecture/residence-porch2.webp',
        alt: 'Deep porch with wood columns and garden edge',
        spaces: ['Porch', 'Garden'],
        materials: ['Wood', 'Stone'],
      },
      {
        src: '/images/architecture/front-porch.webp',
        alt: 'Front porch with tapered piers and stone base',
        spaces: ['Porch', 'Entryway'],
        materials: ['Wood', 'Stone', 'Brick'],
      },
      {
        src: '/images/architecture/homes-large-porches.webp',
        alt: 'Street of generous porches beneath mature trees',
        spaces: ['Porch', 'Streetfront'],
        materials: ['Wood', 'Brick'],
      },
      {
        src: '/images/architecture/homes-large-porches2.webp',
        alt: 'Porch rhythm along a leafy block',
        spaces: ['Porch', 'Streetfront'],
        materials: ['Wood', 'Brick'],
      },
      {
        src: '/images/architecture/homes-large-porches3.webp',
        alt: 'Winter view of homes with deep porches',
        spaces: ['Porch', 'Streetfront'],
        materials: ['Wood', 'Brick'],
      },
      {
        src: '/images/architecture/residence-arts-crafts2.webp',
        alt: 'Arts and Crafts façade with timber detailing',
        spaces: ['Porch', 'Entryway'],
        materials: ['Wood', 'Stone', 'Brick'],
      },
      {
        src: '/images/architecture/residence-arts-crafts.webp',
        alt: 'Arts & Crafts residence with broad porch and brick base',
        spaces: ['Porch', 'Entryway', 'Streetfront'],
        materials: ['Wood', 'Brick', 'Stone'],
      },
      {
        src: '/images/architecture/residence-arts-crafts3.webp',
        alt: 'Deep front porch with timber posts and garden edge',
        spaces: ['Porch', 'Garden', 'Entryway'],
        materials: ['Wood', 'Stone'],
      },
    ],
  },
  {
    slug: 'daily-grind-corner',
    title: 'Daily Grind Corner',
    location: 'Lincoln Square, Chicago, IL',
    type: 'Hospitality',
    summary:
      'A neighborhood café on a historic corner—brick storefront, warm wood, and a sidewalk presence that anchors daily routines.',
    spaces: ['Cafe', 'Entryway', 'Streetfront'],
    materials: ['Brick', 'Wood', 'Glass', 'Ironwork', 'Tile'],
    hero: '/images/architecture/coffeeshop-daily-grind.webp',
    gallery: [
      {
        src: '/images/architecture/coffeeshop-daily-grind2.webp',
        alt: 'Corner café with outdoor tables under trees',
        spaces: ['Cafe', 'Streetfront'],
        materials: ['Brick', 'Wood', 'Glass'],
      },
      {
        src: '/images/architecture/corner-mixed-use.webp',
        alt: 'Mixed-use corner with masonry and tall storefront windows',
        spaces: ['Streetfront', 'Entryway'],
        materials: ['Brick', 'Ironwork', 'Glass'],
      },
      {
        src: '/images/architecture/corner-mixed-use2.webp',
        alt: 'Brick corner building with upper residences',
        spaces: ['Streetfront'],
        materials: ['Brick', 'Glass', 'Ironwork'],
      },
    ],
  },
  {
    slug: 'prairie-leaf-library',
    title: 'Prairie Leaf Branch Library',
    location: 'Near East Side, Madison, WI',
    type: 'Library',
    summary:
      'A compact branch library organized around light, timber, and a garden court for reading outdoors.',
    spaces: ['Library', 'Garden', 'Courtyard', 'Entryway'],
    materials: ['Wood', 'Glass', 'Brick', 'Stone'],
    hero: '/images/architecture/library-garden.webp',
    gallery: [
      {
        src: '/images/architecture/library-interior.webp',
        alt: 'Timber trusses over a bright reading room',
        spaces: ['Library'],
        materials: ['Wood', 'Glass'],
      },
      {
        src: '/images/architecture/library-interior2.webp',
        alt: 'Circular reading area with wood structure',
        spaces: ['Library'],
        materials: ['Wood', 'Glass'],
      },
      {
        src: '/images/architecture/library-garden2.webp',
        alt: 'Library opening to a shaded garden terrace',
        spaces: ['Library', 'Garden'],
        materials: ['Wood', 'Glass', 'Stone'],
      },
      {
        src: '/images/architecture/library-garden3.webp',
        alt: 'Garden seating among plantings',
        spaces: ['Garden', 'Courtyard'],
        materials: ['Wood', 'Stone'],
      },
    ],
  },
  {
    slug: 'linden-court-residences',
    title: 'Linden Court Residences',
    location: 'Kerns, Portland, OR',
    type: 'Mixed-Use Residential',
    summary:
      'A mid-rise infill with crafted balconies and a masonry base, tuned to the rhythm of a walkable Northwest block.',
    spaces: ['Balcony', 'Entryway', 'Stair', 'Streetfront', 'Courtyard'],
    materials: ['Brick', 'Wood', 'Glass', 'Ironwork', 'Plaster'],
    hero: '/images/architecture/urban-organic-building2.webp',
    gallery: [
      {
        src: '/images/architecture/urban-organic-building.webp',
        alt: 'Curved balconies with planters over a masonry base',
        spaces: ['Balcony', 'Streetfront'],
        materials: ['Brick', 'Wood', 'Glass', 'Ironwork'],
      },
      {
        src: '/images/architecture/urban-organic-building3.webp',
        alt: 'Street view of residential building with layered terraces',
        spaces: ['Balcony', 'Streetfront'],
        materials: ['Brick', 'Wood', 'Glass'],
      },
      {
        src: '/images/architecture/urban-residential.webp',
        alt: 'Mixed residential façade engaging the sidewalk',
        spaces: ['Streetfront', 'Entryway'],
        materials: ['Brick', 'Glass', 'Ironwork'],
      },
      {
        src: '/images/architecture/urban-residential3.webp',
        alt: 'Contemporary residential over historic context',
        spaces: ['Streetfront', 'Balcony'],
        materials: ['Brick', 'Wood', 'Glass'],
      },
      {
        src: '/images/architecture/staircase.webp',
        alt: 'Daylit stair with wood treads and curved rail',
        spaces: ['Stair', 'Entryway'],
        materials: ['Wood', 'Glass', 'Ironwork'],
      },
    ],
  },
  {
    slug: 'wicker-row-towns',
    title: 'Wicker Row Towns',
    location: 'Wicker Park, Chicago, IL',
    type: 'Residential',
    summary:
      'A courtyard-oriented row of townhomes—brick, wood, and generous stoops that keep eyes on the street.',
    spaces: ['Porch', 'Streetfront', 'Garden', 'Courtyard', 'Entryway'],
    materials: ['Brick', 'Wood', 'Stone', 'Ironwork'],
    hero: '/images/architecture/townhouse-development.webp',
    gallery: [
      {
        src: '/images/architecture/townhouse-development2.webp',
        alt: 'Townhouse mews with planting and porches',
        spaces: ['Courtyard', 'Garden', 'Porch'],
        materials: ['Brick', 'Wood', 'Stone'],
      },
      {
        src: '/images/architecture/street-chicago-style.webp',
        alt: 'Chicago-style row with stoops and trees',
        spaces: ['Streetfront', 'Porch'],
        materials: ['Brick', 'Wood', 'Ironwork'],
      },
      {
        src: '/images/architecture/street-chicago-style2.webp',
        alt: 'Mixed-height residential street, walkable and green',
        spaces: ['Streetfront', 'Garden'],
        materials: ['Brick', 'Wood'],
      },
      {
        src: '/images/architecture/street-chicago-style3.webp',
        alt: 'Cyclists and walkers along a leafy block',
        spaces: ['Streetfront'],
        materials: ['Brick', 'Wood'],
      },
      {
        src: '/images/architecture/walkable-neighborhood.webp',
        alt: 'Public square framed by mixed-use buildings',
        spaces: ['Streetfront', 'Courtyard'],
        materials: ['Brick', 'Wood', 'Stone'],
      },
      {
        src: '/images/architecture/walkable-neighborhood2.webp',
        alt: 'Market street with bikes and storefronts',
        spaces: ['Streetfront'],
        materials: ['Brick', 'Ironwork', 'Glass'],
      },
    ],
  },
  {
    slug: 'sunwell-courtyard-apartments',
    title: 'Sunwell Courtyard Apartments',
    location: 'Near West Side, Chicago, IL',
    type: 'Mixed-Use Residential',
    summary:
      'A mid-block courtyard building with balconies, planted edges, and a calm entry sequence.',
    spaces: ['Courtyard', 'Balcony', 'Entryway', 'Garden', 'Streetfront'],
    materials: ['Plaster', 'Wood', 'Tile', 'Glass', 'Ironwork'],
    hero: '/images/architecture/urban-courtyard.webp',
    gallery: [
      {
        src: '/images/architecture/urban-courtyard2.webp',
        alt: 'Central courtyard with planted edges',
        spaces: ['Courtyard', 'Garden'],
        materials: ['Plaster', 'Wood', 'Glass'],
      },
      {
        src: '/images/architecture/courtyard-entry.webp',
        alt: 'Arched entry from the street into the court',
        spaces: ['Entryway', 'Streetfront'],
        materials: ['Stone', 'Plaster', 'Ironwork'],
      },
      {
        src: '/images/architecture/courtyard-entry2.webp',
        alt: 'Paired arches leading to a shaded court',
        spaces: ['Entryway', 'Courtyard'],
        materials: ['Stone', 'Plaster', 'Ironwork'],
      },
      {
        src: '/images/architecture/courtyard-balcony.webp',
        alt: 'Balcony overlooking planted courtyard',
        spaces: ['Balcony', 'Courtyard'],
        materials: ['Wood', 'Ironwork', 'Glass'],
      },
      {
        src: '/images/architecture/courtyard-balcony2.webp',
        alt: 'Evening balcony and courtyard seating',
        spaces: ['Balcony', 'Courtyard'],
        materials: ['Wood', 'Glass', 'Ironwork'],
      },
    ],
  },
  {
    slug: 'headlands-community-house',
    title: 'Headlands Community House',
    location: 'Mendocino, CA',
    type: 'Community',
    summary:
      'A civic porch on the Pacific—stone, wood, and sheltered outdoor rooms for events and daily gathering.',
    spaces: ['Porch', 'Entryway', 'Courtyard'],
    materials: ['Stone', 'Wood', 'Glass'],
    hero: '/images/architecture/building-coastline.webp',
    gallery: [
      {
        src: '/images/architecture/building-coastline2.webp',
        alt: 'Waterside terrace with long roof and stone base',
        spaces: ['Porch', 'Courtyard'],
        materials: ['Stone', 'Wood', 'Glass'],
      },
    ],
  },
  {
    slug: 'high-valley-workshop',
    title: 'High Valley Workshop',
    location: 'Bozeman, MT',
    type: 'Workplace',
    summary:
      'A small workshop and office with deep roof overhangs, wood structure, and terraces that open to mountain air.',
    spaces: ['Office', 'Porch', 'Garden', 'Balcony'],
    materials: ['Wood', 'Stone', 'Glass', 'Ironwork'],
    hero: '/images/architecture/workplace-mountain.webp',
    gallery: [
      {
        src: '/images/architecture/workplace-mountain2.webp',
        alt: 'Timber workshop with outdoor meeting terrace',
        spaces: ['Office', 'Porch', 'Garden'],
        materials: ['Wood', 'Stone', 'Glass'],
      },
    ],
  },
];

export function getAllTags() {
  const set = {
    types: new Set<string>(),
    spaces: new Set<string>(),
    materials: new Set<string>(),
  };
  projects.forEach((p) => {
    set.types.add(p.type);
    p.spaces.forEach((s) => set.spaces.add(s));
    p.materials.forEach((m) => set.materials.add(m));
  });
  return {
    types: Array.from(set.types).sort(),
    spaces: Array.from(set.spaces).sort(),
    materials: Array.from(set.materials).sort(),
  };
}
