export interface DestinationNavigationAvailability {
  feelings: boolean;
  take: boolean;
  map: boolean;
  recommendations: boolean;
  stories: boolean;
}

export interface DestinationSectionAvailability {
  take: boolean;
  recommendations: boolean;
  map: boolean;
  stories: boolean;
}

export interface DestinationStory {
  image: string;
  imageAlt: string;
  title: string;
  story: string;
  statusLabel: string;
}

export interface DestinationExperience {
  slug: string;
  navigation: DestinationNavigationAvailability;
  sections: DestinationSectionAvailability;
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    description: string;
    characteristics: string[];
  };
  editorialTake: {
    label: string;
    heading: string;
    quote: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  recommendations: {
    eyebrow: string;
    heading: string;
  };
  map: {
    eyebrow: string;
    heading: string;
    description: string;
    style: string;
    center: [longitude: number, latitude: number];
    zoom: number;
    selectionZoom: number;
    minZoom: number;
    maxZoom: number;
    setupEyebrow: string;
    setupHeading: string;
    setupDescription: string;
  };
  stories: {
    eyebrow: string;
    heading: string;
    description: string;
    modalLabel: string;
    items: DestinationStory[];
  };
}

export const destinationExperiences: Record<string, DestinationExperience> = {
  leiden: {
    slug: 'leiden',
    navigation: {
      feelings: true,
      take: true,
      map: true,
      recommendations: true,
      stories: true,
    },
    sections: {
      take: true,
      recommendations: true,
      map: true,
      stories: true,
    },
    hero: {
      image: 'photos/leiden/img_0541.jpg',
      imageAlt: 'Sunset reflected in a Leiden canal',
      eyebrow: 'The Netherlands',
      description: 'A smaller, calmer version of Amsterdam, with canals around every corner and a pace that made the city feel easy to live in.',
      characteristics: ['Walkable', 'Bike-friendly', 'Student City', 'Historic Canals'],
    },
    editorialTake: {
      label: "Chloe's take",
      heading: 'Why I’d Choose Leiden Over Amsterdam',
      quote: '“Everything I loved about Amsterdam, without feeling like a tourist.”',
      paragraphs: [
        'I spent five months living in Leiden while studying abroad, and it became one of my favorite places I’ve ever lived.',
        'If you’re looking for world-famous museums and nonstop energy, Amsterdam is hard to beat. But if your favorite travel memories come from wandering quiet streets, becoming a regular at a neighborhood café, biking along peaceful canals, and feeling like you’ve settled into everyday life somewhere new, I’d choose Leiden every time.',
        'One of the things I loved most was that it still felt unmistakably Dutch. You hear Dutch being spoken all around you, watch student associations fill the streets, and get a glimpse of everyday life in a way that’s harder to find in larger tourist cities. It’s the kind of place that quietly grows on you until, before you know it, you’re already planning your next visit.',
      ],
      image: 'photos/leiden/img_3412.jpg',
      imageAlt: 'Canal, bicycles, flowers, and historic buildings viewed from a green bridge in Leiden.',
    },
    recommendations: {
      eyebrow: 'Recommendations',
      heading: 'Choose what matters to you.',
    },
    map: {
      eyebrow: 'Every place, on one map',
      heading: 'Browse my handpicked recommendations.',
      description: 'Verified recommendations are pinned on the map, so you can see how the city fits together. Explore cafés, museums, hidden gems, and favorite spots in context, not just as a list.',
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [4.497, 52.1601],
      zoom: 14.1,
      selectionZoom: 15.6,
      minZoom: 11,
      maxZoom: 18,
      setupEyebrow: 'Map locations coming soon',
      setupHeading: 'Verified Leiden pins are on the way.',
      setupDescription: 'Recommendations will appear here after their exact coordinates are confirmed.',
    },
    stories: {
      eyebrow: 'Stories left untold',
      heading: 'Notes from my time here.',
      description: 'Select a photograph to see the story, recommendation, or context behind it.',
      modalLabel: 'Stories left untold',
      items: [
        {
          image: 'photos/leiden/img_0541.jpg',
          imageAlt: 'Sunset over a canal reflecting into the water.',
          title: 'Sunset Canal',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/img_3412.jpg',
          imageAlt: 'Bridge over a canal with bike in front.',
          title: 'Green Bridge Canal',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/IMG_3446.JPG',
          imageAlt: 'sunset over a bridge.',
          title: 'Bridge at Sunset',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/img_7271.jpg',
          imageAlt: '4 person yellow bike.',
          title: 'Yellow Group Bike',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/img_7288.jpg',
          imageAlt: 'Corner of a building with physics property written on it.',
          title: 'Physics Building Detail',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/img_7289.jpg',
          imageAlt: 'Canal with boats filled with people and lined with houses.',
          title: 'Canal Activity',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/img_7463.jpg',
          imageAlt: 'Filled bike parking.',
          title: 'Bicycle Parking',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
        {
          image: 'photos/leiden/img_8660.jpg',
          imageAlt: 'Buildings on water.',
          title: 'Canal Reflections',
          story: 'The full story behind this photograph will be added later.',
          statusLabel: 'Story available',
        },
      ],
    },
  },
};

export const getDestinationExperience = (slug: string) => destinationExperiences[slug];
