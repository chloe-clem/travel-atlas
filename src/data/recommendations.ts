export const interestTaxonomy = [
  'food',
  'cafes',
  'activities',
  'nature',
  'museums',
  'shopping',
  'day-trips',
  'nightlife',
  'hidden-gems',
] as const;

export type Interest = (typeof interestTaxonomy)[number];
export type PriceLevel = '' | '$' | '$$' | '$$$' | '$$$$';

export const interestLabels: Record<Interest, string> = {
  food: 'Food',
  cafes: 'Cafés',
  activities: 'Activities',
  nature: 'Nature',
  museums: 'Museums',
  shopping: 'Shopping',
  'day-trips': 'Day Trips',
  nightlife: 'Nightlife',
  'hidden-gems': 'Hidden Gems',
};

export interface Recommendation {
  id: string;
  destination: string;
  name: string;
  interests: Interest[];
  shortDescription: string;
  whyIRecommendIt: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  coordinatesVerified: boolean;
  priceLevel: PriceLevel;
  bestFor: string[];
  website: string;
  instagram?: string;
  image: string;
  imageAlt: string;
  featured: boolean;
}

const leidenDefaults = {
  destination: 'leiden',
  whyIRecommendIt: '',
  address: '',
  latitude: null,
  longitude: null,
  coordinatesVerified: false,
  priceLevel: '' as PriceLevel,
  bestFor: [] as string[],
  website: '',
  image: '',
  imageAlt: '',
  featured: false,
};

export const recommendations: Recommendation[] = [
  {
    ...leidenDefaults,
    id: 'hortus-botanicus-leiden',
    name: 'Hortus botanicus Leiden',
    interests: ['nature'],
    shortDescription: 'The perfect place to spend a slow afternoon surrounded by plants from around the world. It is also one of my favorite places in Leiden to bring a book and read for a while.',
    image: 'photos/leiden/IMG_3409.JPG',
    imageAlt: 'Lily pond inside the tropical greenhouse at Hortus Botanicus Leiden.',
    address: 'Rapenburg 73, 2311 GJ Leiden, Netherlands',
    latitude: 52.1559236,
    longitude: 4.483884,
    coordinatesVerified: true,
    website: 'https://hortusleiden.nl/',
  },
  {
    ...leidenDefaults,
    id: 'van-der-werffpark',
    name: 'Van der Werffpark',
    interests: ['nature'],
    shortDescription: 'A small park across from Leiden University’s law building where you will often see people walking their dogs, students meeting up, and locals enjoying the sunshine.',
    image: 'photos/leiden/IMG_9243.jpeg',
    imageAlt: 'Sunlight filtering through the trees in Van der Werffpark.',
  },
  {
    ...leidenDefaults,
    id: 'burcht-van-leiden',
    name: 'Burcht van Leiden',
    interests: ['hidden-gems'],
    shortDescription: 'Leiden’s oldest fort sits on the city’s highest point, giving you just enough elevation to appreciate the rooftops and layout of the historic center.',
    whyIRecommendIt: 'Visit during the day. It tends to become a popular hangout for high school students in the evening.',
    image: 'photos/leiden/IMG_9725.jpg',
    imageAlt: 'Stone walls of the historic Burcht van Leiden.',
    address: 'Burgsteeg, 2312 JR Leiden, Netherlands',
    latitude: 52.1589856,
    longitude: 4.4924261,
    coordinatesVerified: true,
    website: 'https://www.visitleiden.nl/en/locations/2380897422/de-burcht',
  },
  {
    ...leidenDefaults,
    id: 'blossom-by-kp',
    name: 'Blossom by KP',
    interests: ['cafes', 'food'],
    shortDescription: 'My favorite place in Leiden for matcha, with creative flavors that go far beyond a traditional matcha menu.',
    whyIRecommendIt: 'Try the strawberry matcha, and check the opening hours since they open later than many cafés.',
    image: 'photos/leiden/IMG_9717.jpeg',
    imageAlt: 'Brunch spread with colorful drinks at Blossom by KP in Leiden.',
    address: 'Botermarkt 26, 2311 EN Leiden, Netherlands',
    latitude: 52.156714,
    longitude: 4.4931339,
    coordinatesVerified: true,
    website: 'https://blossomleiden.nl/',
  },
  {
    ...leidenDefaults,
    id: 'botermarkt',
    name: 'Botermarkt',
    interests: ['hidden-gems', 'food', 'shopping'],
    shortDescription: 'Leiden’s Wednesday and Saturday market fills Botermarkt with local vendors selling fresh bread, baked goods, cheese, flowers, stroopwafels, and even souvenirs. During the winter, the area also hosts Christmas markets and a small ice skating rink.',
    whyIRecommendIt: 'Saturday has more vendors, but Wednesday is also worth visiting if you are in town.',
    image: 'photos/leiden/img_0113.jpg',
    imageAlt: "Fresh flowers for sale at Leiden's Botermarkt market.",
  },
  {
    ...leidenDefaults,
    id: 'roos',
    name: 'ROOS Taste & Smile',
    interests: ['cafes', 'food'],
    shortDescription: 'A reliable café for a relaxed meal or coffee stop.',
    image: 'photos/leiden/IMG_8198.jpeg',
    imageAlt: 'Breakfast dishes served at ROOS in Leiden.',
    address: 'Botermarkt 12, 2311 EM Leiden, Netherlands',
    latitude: 52.1573619,
    longitude: 4.4923128,
    coordinatesVerified: true,
    website: 'https://www.roosleiden.nl/',
  },
  {
    ...leidenDefaults,
    id: 'waag',
    name: 'Restaurant Waag',
    interests: ['food'],
    shortDescription: 'Enjoy a meal inside one of Leiden’s most historic landmark buildings.',
    address: 'Aalmarkt 21, 2311 EC Leiden, Netherlands',
    latitude: 52.1593318,
    longitude: 4.4904674,
    coordinatesVerified: true,
    website: 'https://waagleiden.nl/',
  },
  {
    ...leidenDefaults,
    id: 'hooglandse-kerk',
    name: 'Hooglandse Kerk',
    interests: ['hidden-gems'],
    shortDescription: 'One of the city’s most beautiful churches and well worth walking past while exploring the historic center.',
    image: 'photos/leiden/IMG_9300.jpeg',
    imageAlt: 'The Gothic exterior of Hooglandse Kerk in Leiden.',
    address: 'Nieuwstraat 20, 2312 KC Leiden, Netherlands',
    latitude: 52.1579707,
    longitude: 4.4942105,
    coordinatesVerified: true,
    website: 'https://hooglandsekerk.com/',
  },
  {
    ...leidenDefaults,
    id: 'museum-de-valk',
    name: 'Molenmuseum De Valk',
    interests: ['hidden-gems'],
    shortDescription: 'One of Leiden’s most recognizable landmarks and an iconic Dutch windmill in the middle of the city.',
    image: 'photos/leiden/IMG_3436.JPG',
    imageAlt: 'Historic Molen De Valk windmill in central Leiden.',
    address: 'Molenwerf 1, 2312 CH Leiden, Netherlands',
    latitude: 52.16451,
    longitude: 4.48627,
    coordinatesVerified: true,
    website: 'https://molenmuseumdevalk.nl/',
  },
  {
    ...leidenDefaults,
    id: 'speeltuinvereniging-de-doorbraak',
    name: 'Speeltuinvereniging De Doorbraak',
    interests: ['activities'],
    shortDescription: 'A wonderful playground with interactive, nature-focused play areas that make it much more than a typical neighborhood park.',
    address: 'Katoenpark 1, 2312 MN Leiden, Netherlands',
    latitude: 52.1578879,
    longitude: 4.5033957,
    coordinatesVerified: true,
    website: 'https://www.svdedoorbraak.nl/',
  },
  {
    ...leidenDefaults,
    id: 'landgoed-de-olmenhorst',
    name: 'Landgoed de Olmenhorst',
    interests: ['day-trips', 'nature', 'activities'],
    shortDescription: 'A fall day trip for apple and pear picking.',
    image: 'photos/leiden/82562e9d-779a-4843-95ba-fad5ef0ef9f9.jpg',
    imageAlt: 'Apple trees at Landgoed de Olmenhorst during the harvest season.',
    address: 'Lisserweg 481, 2165 AS Lisserbroek, Netherlands',
    latitude: 52.2543013,
    longitude: 4.5898861,
    coordinatesVerified: true,
    website: 'https://olmenhorst.nl/',
  },
  {
    ...leidenDefaults,
    id: 'huigpark',
    name: 'Huigpark',
    interests: ['nature'],
    shortDescription: 'One of my favorite places to spread out a blanket, relax by the canal, and enjoy a warm sunny afternoon.',
    image: 'photos/leiden/IMG_8139.jpeg',
    imageAlt: 'Bridge crossing the canal beside Huigpark in Leiden.',
  },
  {
    ...leidenDefaults,
    id: 'de-twee-spieghels',
    name: 'De Twee Spieghels',
    interests: ['nightlife', 'hidden-gems'],
    shortDescription: 'An intimate jazz bar for live music and evening drinks.',
    whyIRecommendIt: 'Check the live music schedule before you go.',
    address: 'Nieuwstraat 11, 2312 KA Leiden, Netherlands',
    latitude: 52.1580469,
    longitude: 4.4932715,
    coordinatesVerified: true,
    website: 'https://www.detweespieghels.nl/',
  },
  {
    ...leidenDefaults,
    id: 'hema',
    name: 'HEMA',
    interests: ['shopping'],
    shortDescription: 'A Dutch department store that feels like a mix of Target and IKEA, with everything from home goods to snacks.',
    whyIRecommendIt: 'Do not skip the café. It is a great place to try a traditional Dutch tompouce or warm up with a hot chocolate during the winter.',
    address: 'Haarlemmerstraat 130-136, 2312 GE Leiden, Netherlands',
    latitude: 52.1603302,
    longitude: 4.4921812,
    coordinatesVerified: true,
    website: 'https://winkels.hema.nl/nl/leiden/hema-leiden',
  },
  {
    ...leidenDefaults,
    id: 'rb-stroopwafels',
    name: 'RB Stroopwafels',
    interests: ['food', 'hidden-gems'],
    shortDescription: 'Fresh, warm stroopwafels that were some of the best I had anywhere in the Netherlands, and much cheaper than the tourist versions in Amsterdam.',
    whyIRecommendIt: 'Order one while it is still warm. It is one of those simple experiences you will remember.',
    image: 'photos/leiden/img_6610.jpg',
    imageAlt: 'Freshly made stroopwafel from the RB Stroopwafels stand in Leiden.',
    address: 'Haarlemmerstraat 110, 2312 GD Leiden, Netherlands',
    latitude: 52.1603707,
    longitude: 4.4908364,
    coordinatesVerified: true,
  },
  {
    ...leidenDefaults,
    id: 'bar-lokaal',
    name: 'Bar Lokaal',
    interests: ['food', 'nightlife'],
    shortDescription: 'A casual local spot for food and drinks.',
    address: 'Hartesteeg 13, 2312 JW Leiden, Netherlands',
    latitude: 52.1572172,
    longitude: 4.494271,
    coordinatesVerified: true,
    website: 'https://www.barlokaal.nl/',
  },
  {
    ...leidenDefaults,
    id: 'water-and-bloem',
    name: 'Water & Bloem',
    interests: ['cafes', 'food'],
    shortDescription: 'One of my favorite bakeries in Leiden.',
    whyIRecommendIt: 'Get the pistachio croissant.',
    image: 'photos/leiden/IMG_9425.jpeg',
    imageAlt: 'Fresh pastries from Water & Bloem in Leiden.',
    address: 'Pieterskerk-Choorsteeg 26, 2311 TR Leiden, Netherlands',
    latitude: 52.1579633,
    longitude: 4.4888423,
    coordinatesVerified: true,
    website: 'https://www.waterenbloem.nl/',
  },
  {
    ...leidenDefaults,
    id: 'cafe-de-bonte-koe',
    name: 'Café de Bonte Koe',
    interests: ['nightlife'],
    shortDescription: 'A cozy choice for drinks.',
    address: 'Hooglandsekerk-Choorsteeg 13, 2312 KK Leiden, Netherlands',
    latitude: 52.1576747,
    longitude: 4.4951534,
    coordinatesVerified: true,
    website: 'http://www.cafedebontekoe.net/',
  },
  {
    ...leidenDefaults,
    id: 'paco-ciao',
    name: 'Paco Ciao',
    interests: ['food', 'hidden-gems'],
    shortDescription: 'Enter through a hidden bookcase to discover one of Leiden’s most unique restaurants, with creative dishes and a memorable atmosphere.',
    whyIRecommendIt: 'If you visit for weekday breakfast, ask your waiter about the €12.40 deal that includes coffee, juice, and your breakfast dish.',
    image: 'photos/leiden/img_8118.jpg',
    imageAlt: 'Creative breakfast dishes served at Paco Ciao in Leiden.',
    address: 'Stationsweg 25, 2312 AS Leiden, Netherlands',
    latitude: 52.1649605,
    longitude: 4.4842083,
    coordinatesVerified: true,
    website: 'https://www.pacociao.nl/',
  },
  {
    ...leidenDefaults,
    id: 'eternite-vintage',
    name: 'Éternité Vintage',
    interests: ['shopping', 'hidden-gems'],
    shortDescription: 'A small shop filled with unique pieces, including handmade and crocheted bags.',
    whyIRecommendIt: 'I have bought several crocheted bags here and even custom ordered them. The shop is run by a mother and daughter who are incredibly kind, and they also offer creative workshops for parties.',
    address: 'Nieuwstraat 15, 2312 KA Leiden, Netherlands',
    latitude: 52.1579426,
    longitude: 4.4933515,
    coordinatesVerified: true,
    instagram: '@by.lauritsa',
  },
  {
    ...leidenDefaults,
    id: 'madame-marie',
    name: 'Madame Marie',
    interests: ['food', 'cafes'],
    shortDescription: 'A beautiful café serving one of the most aesthetically presented Dutch apple pies I found in Leiden.',
    whyIRecommendIt: 'Come for the apple pie. It is a classic Dutch treat and almost too pretty to eat.',
    image: 'photos/leiden/img_0078.jpg',
    imageAlt: 'Dutch apple pie and coffee at Madame Marie in Leiden.',
    address: 'Kloksteeg 2, 2311 SL Leiden, Netherlands',
    latitude: 52.1570835,
    longitude: 4.4862667,
    coordinatesVerified: true,
  },
];

export const getRecommendationsByDestination = (destination: string) =>
  recommendations.filter((recommendation) => recommendation.destination === destination);

export const getAvailableInterests = (destinationRecommendations: Recommendation[]) =>
  interestTaxonomy.filter((interest) =>
    destinationRecommendations.some((recommendation) => recommendation.interests.includes(interest)),
  );

export const hasVerifiedCoordinates = (
  recommendation: Recommendation,
): recommendation is Recommendation & { latitude: number; longitude: number } =>
  recommendation.coordinatesVerified &&
  typeof recommendation.latitude === 'number' &&
  Number.isFinite(recommendation.latitude) &&
  recommendation.latitude >= -90 &&
  recommendation.latitude <= 90 &&
  typeof recommendation.longitude === 'number' &&
  Number.isFinite(recommendation.longitude) &&
  recommendation.longitude >= -180 &&
  recommendation.longitude <= 180;

export const getExternalMapLinks = (recommendation: Recommendation) => {
  if (!hasVerifiedCoordinates(recommendation)) return null;

  const label = recommendation.name;
  const coordinates = `${recommendation.latitude},${recommendation.longitude}`;

  return {
    google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${label} ${coordinates}`)}`,
    apple: `https://maps.apple.com/?ll=${encodeURIComponent(coordinates)}&q=${encodeURIComponent(label)}`,
  };
};
