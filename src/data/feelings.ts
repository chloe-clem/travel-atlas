export interface Feeling {
  slug: string;
  title: string;
  cardCopy: string;
  intro: string;
  note: string;
  image: string;
  imageAlt?: string;
  action: string;
}

export const feelings: Feeling[] = [
  {slug:'immersed',title:'Immersed',cardCopy:'Charming streets, local cafés, slower days, and places that feel lived in.',intro:"Some of the best places aren't the busiest or the most famous. They're the ones that invite you to slow down and settle in. Wander neighborhood streets, become a regular at a local café, and experience the rhythm of everyday life.",note:'For trips built around wandering, lingering, and noticing ordinary details.',image:'photos/feelings/IMG_5519.jpeg',imageAlt:'Quiet residential street lined with colorful buildings and balconies in southern Italy.',action:'Explore immersed places'},
  {slug:'wild',title:'Wild',cardCopy:'Mountains, coastlines, trails, and landscapes that make you feel small.',intro:'Mountains, coastlines, trails, and landscapes that refuse to stay in the background. These places make the world feel larger and daily concerns feel smaller.',note:'For the days when a landscape matters more than an itinerary.',image:'photos/feelings/IMG_8726.JPG',imageAlt:'Panoramic view of a Norwegian fjord surrounded by mountains and dramatic skies.',action:'Explore wild places'},
  {slug:'inspired',title:'Inspired',cardCopy:'Art, architecture, history, and places that change the way you notice things.',intro:'Art, architecture, history, and cities that change the way you notice your surroundings. These are places that sent me home looking more closely.',note:'For travelers who find inspiration in art, architecture, history, and culture.',image:'photos/feelings/IMG_8393.JPG',imageAlt:'Historic alley filled with colorful street art and murals in Naples.',action:'Explore inspiring places'},
  {slug:'energized',title:'Energized',cardCopy:'Busy streets, markets, nightlife, and cities that pull you into their rhythm.',intro:'Busy streets, markets, nightlife, and cities buzzing with life from morning to night. These places pull you into their rhythm.',note:'For trips that feel vivid, social, and difficult to end early.',image:'photos/feelings/IMG_9143.jpeg',imageAlt:'The Eiffel Tower glowing at night in Paris beneath low clouds.',action:'Explore energetic places'},
  {slug:'relaxed',title:'Relaxed',cardCopy:'Warm weather, slower pace, beaches, vacation mode.',intro:"Sunny days, slower mornings, long lunches, and places where time seems to move a little differently.",note:"For travelers who believe the best days don't need much of a plan.",image:'photos/feelings/IMG_8437.JPG',imageAlt:'Calm turquoise water and anchored boats along the coast of Sicily.',action:'Explore relaxed places'},
  {slug:'home',title:'At home somewhere new',cardCopy:'Places where routines formed, friendships deepened, and travel became daily life.',intro:'Places where routines formed, friendships deepened, and travel stopped feeling temporary. These destinations became part of ordinary life.',note:'The most personal collection in the atlas: places I did not only visit.',image:'/photos/leiden/img_7295.jpg',action:'Explore places that felt like home'}
];
