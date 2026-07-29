export interface Feeling {
  slug: string;
  title: string;
  cardCopy: string;
  intro: string;
  note: string;
  image: string;
  action: string;
}

export const feelings: Feeling[] = [
  {slug:'peaceful',title:'Peaceful',cardCopy:'Quiet streets, water, cafés, and mornings with nowhere you need to be.',intro:'Quiet streets, water, cafés, and mornings with nowhere you need to be. These are places that made slowing down feel natural rather than scheduled.',note:'For trips built around wandering, lingering, and noticing ordinary details.',image:'/photos/leiden/img_7288.jpg',action:'Explore peaceful places'},
  {slug:'wild',title:'Wild',cardCopy:'Mountains, coastlines, trails, and landscapes that make you feel small.',intro:'Mountains, coastlines, trails, and weather that refuses to stay in the background. These places make the world feel larger and daily concerns feel smaller.',note:'For the days when a landscape matters more than an itinerary.',image:'/photos/leiden/img_3412.jpg',action:'Explore wild places'},
  {slug:'inspired',title:'Inspired',cardCopy:'Art, architecture, history, and places that change the way you notice things.',intro:'Art, architecture, history, and cities that change the way you notice your surroundings. These are places that sent me home looking more closely.',note:'For travelers who want beauty, ideas, and a stronger sense of place.',image:'/photos/leiden/img_8220.jpg',action:'Explore inspiring places'},
  {slug:'energized',title:'Energized',cardCopy:'Busy streets, markets, nightlife, and cities that pull you into their rhythm.',intro:'Busy streets, markets, nightlife, and cities that keep offering one more turn to take. These places pull you into their rhythm.',note:'For trips that feel vivid, social, and difficult to end early.',image:'/photos/leiden/img_7455.jpg',action:'Explore energetic places'},
  {slug:'connected',title:'Connected',cardCopy:'Student cities, shared tables, and places where meeting people felt easy.',intro:'Student cities, shared tables, familiar cafés, and places where meeting people felt easier than expected.',note:'For travel shaped as much by people as by landmarks.',image:'/photos/leiden/img_8118.jpg',action:'Explore connected places'},
  {slug:'home',title:'At home somewhere new',cardCopy:'Places where routines formed, friendships deepened, and travel became daily life.',intro:'Places where routines formed, friendships deepened, and travel stopped feeling temporary. These destinations became part of ordinary life.',note:'The most personal collection in the atlas: places I did not only visit.',image:'/photos/leiden/img_7295.jpg',action:'Explore places that felt like home'}
];
