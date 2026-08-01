export type DestinationStatus = 'documented' | 'coming-soon';

export interface Destination {
  name: string;
  slug: string;
  country: string;
  continent: string;
  latitude: number;
  longitude: number;
  note: string;
  status: DestinationStatus;
  feelings: string[];
  featuredImage: string;
  visitLabel: string;
  characteristics?: string[];
  story: string[];
}

export const destinations: Destination[] = [
  {name:'Leiden',slug:'leiden',country:'Netherlands',continent:'Europe',latitude:52.1601,longitude:4.4970,note:'A quaint, walkable student city that felt like a calmer Amsterdam.',status:'documented',feelings:['immersed','relaxed','inspired'],featuredImage:'photos/leiden/img_0541.jpg',visitLabel:'Study abroad',characteristics:['Walkable','Bike-friendly','Student City','Historic Canals'],story:[
    'I spent five months living in Leiden while studying abroad, and it became one of my favorite places I’ve ever lived.',
    'Beautiful canals are everywhere you turn. People park their boats on the canals and ride them around on sunny days to relax with their families.',
    'The Wednesday and Saturday market brings fresh meat, cheese, bread, stroopwafels, flowers, and plenty of reasons to linger in the center of town.'
  ]},
  {name:'The Hague',slug:'the-hague',country:'Netherlands',continent:'Europe',latitude:52.0705,longitude:4.3007,note:'A modern city balanced by beaches, parks, and forest.',status:'documented',feelings:['immersed','energized','inspired'],featuredImage:'',visitLabel:'Study abroad',story:[
    'The Hague is a bit bigger and just south of Leiden. It still does not feel as big as Amsterdam, but it has more of a modern feel to the buildings.',
    'One of my favorite parts is the beach. It is huge and sandy, and I loved coming here to watch the sunset or play beach volleyball with friends.',
    'What I love most is how one second you feel like you are in a city and the next you can be in beautiful parks or forest areas.'
  ]},
  {name:'Amsterdam',slug:'amsterdam',country:'Netherlands',continent:'Europe',latitude:52.3676,longitude:4.9041,note:'A busy but charming city full of museums, food, canals, and easy movement.',status:'documented',feelings:['energized','inspired','relaxed'],featuredImage:'',visitLabel:'Study abroad',story:[
    'At first I would have said Amsterdam was not my favorite because it can feel touristy and busy, but my opinion changed after visiting other big cities.',
    'It is clean and charming, with beautiful buildings, museums, food places, thrift stores, and activities. It also feels safe and is easy to navigate by foot, bike, or bus.',
    'A sunset dinner river cruise and the Van Gogh Museum were two of my favorite experiences.'
  ]},
  {name:'Haarlem',slug:'haarlem',country:'Netherlands',continent:'Europe',latitude:52.3874,longitude:4.6462,note:'A surprisingly quiet and relaxing city near Amsterdam.',status:'documented',feelings:['immersed','inspired'],featuredImage:'',visitLabel:'Study abroad',story:[
    'Haarlem was a super fun city to visit and only about twenty minutes from Leiden by train.',
    'It was surprisingly quiet and relaxing, with church buildings, a shopping street, and wide open canals.',
    'I missed its short Christmas market, so that is still on my list for another year.'
  ]},
  {name:'Saint-Tropez',slug:'saint-tropez',country:'France',continent:'Europe',latitude:43.2677,longitude:6.6407,note:'A lively but relaxing coastal town of yachts, beaches, and sunset swims.',status:'documented',feelings:['immersed','energized','relaxed'],featuredImage:'',visitLabel:'Study abroad',story:[
    'Saint-Tropez was expensive, but it was so fun to walk along the dock and admire the yachts. We even saw one with a helicopter landing on it.',
    'The downtown area was lively, relaxing, and enjoyable at night, while the beaches and sunset dock felt especially memorable.',
    'It felt like a small, high-end local beach town and a summer holiday place for nearby families.'
  ]},
  {name:'Paris',slug:'paris',country:'France',continent:'Europe',latitude:48.8566,longitude:2.3522,note:'Nighttime magic, huge museums, underground history, and unforgettable food finds.',status:'documented',feelings:['energized','inspired','relaxed'],featuredImage:'',visitLabel:'Study abroad',story:[
    'The Eiffel Tower at night was my favorite part. That was when I really felt the magic of the city and understood why so many people love it.',
    'I loved the energy of everyone being out at night, walking by the river and over the bridges or enjoying dinner at a rooftop bar.',
    'The Catacombs were my favorite experience, and the Louvre sculptures amazed me. Too Good To Go also became a fun way to try pastries on a budget.'
  ]},
  {name:'Cologne',slug:'cologne',country:'Germany',continent:'Europe',latitude:50.9375,longitude:6.9603,note:'A monumental cathedral, chocolate, river walks, and a more distant city mood.',status:'documented',feelings:['inspired','immersed'],featuredImage:'',visitLabel:'Short visit',story:[
    'The cathedral outside the train station is incredible. We spent hours walking through it and enjoying the stillness inside.',
    'The Lindt chocolate factory was another highlight, especially the store and restaurant, and I enjoyed walking by the river.',
    'The city also felt disconnected to me, with people keeping their heads down and rarely acknowledging one another.'
  ]},
  {name:'Bonn',slug:'bonn',country:'Germany',continent:'Europe',latitude:50.7374,longitude:7.0982,note:'An uneasy arrival followed by castles, history, and a calmer neighborhood outside the center.',status:'documented',feelings:['inspired'],featuredImage:'',visitLabel:'Study abroad',story:[
    'The area by the train station felt terrifying, and I would be fine never returning to that part of Bonn.',
    'Outside the center, the neighborhood where we stayed was much better. We explored Drachenburg and Godesburg castles and learned about Beethoven, Lord Byron, and Haribo.',
    'The trip also taught me the importance of carrying cash in smaller towns.'
  ]},
  {name:'Munich',slug:'munich',country:'Germany',continent:'Europe',latitude:48.1351,longitude:11.5820,note:'Parks, winter canals, river surfers, and a thrilling New Year’s Eve.',status:'documented',feelings:['energized','relaxed','inspired'],featuredImage:'',visitLabel:'New Year’s visit',story:[
    'Nymphenburg Palace Park was a beautiful place to walk, and people were ice skating on the frozen canal.',
    'The English Garden was another highlight, especially seeing people surf the river even in winter.',
    'New Year’s Eve on the bridge was magical, thrilling, and terrifying all at once, with fireworks going off in every direction.'
  ]},
  {name:'Berchtesgaden',slug:'berchtesgaden',country:'Germany',continent:'Europe',latitude:47.6302,longitude:13.0001,note:'Dreamlike national-park hikes and some of the most beautiful views of the trip.',status:'documented',feelings:['wild','immersed','inspired'],featuredImage:'',visitLabel:'Study abroad',story:[
    'Right at the border of Germany and Austria, this area felt like a dream.',
    'I got to do some awesome hikes around the national park and saw some of the most beautiful views of my entire life.'
  ]},
  {name:'Brussels',slug:'brussels',country:'Belgium',continent:'Europe',latitude:50.8503,longitude:4.3517,note:'A pleasantly surprising city of waffles, parks, and cathedral interiors.',status:'documented',feelings:['energized','inspired'],featuredImage:'',visitLabel:'Study abroad',story:[
    'I arrived with very low expectations after several people warned me not to go, but I was pleasantly surprised by the central area during the day.',
    'The waffles alone made the trip worthwhile, especially the Brussels-style waffle.',
    'I also enjoyed the fall colors in the park and the cathedral, although next time I might spend more time in western Belgian towns such as Bruges.'
  ]},
  {name:'La Hulpe',slug:'la-hulpe',country:'Belgium',continent:'Europe',latitude:50.7309,longitude:4.4857,note:'A welcoming hidden gem of forest trails, ponds, horses, and château grounds.',status:'documented',feelings:['immersed','relaxed','wild'],featuredImage:'',visitLabel:'Study abroad',story:[
    'Our Airbnb hosts were incredibly kind, picking us up from the train station and filling the kitchen with breakfast food.',
    'The highlight was Château de La Hulpe, surrounded by ponds, open fields, horses, and kilometers of forest trails.',
    'It felt like a hidden gem, almost empty except for a few locals jogging through the trails.'
  ]},
  {name:'Bern',slug:'bern',country:'Switzerland',continent:'Europe',latitude:46.9480,longitude:7.4474,note:'An accessible green city of hills and meadows before the Alps.',status:'documented',feelings:['immersed','inspired'],featuredImage:'',visitLabel:'Study abroad',story:[
    'Switzerland was an absolute dream for someone who loves mountains and the outdoors.',
    'Bern is easy to reach from the airport. It is not out in the mountains, but it is still beautiful and worth visiting for its greenery and hilly meadows.'
  ]},
  {name:'Brig',slug:'brig',country:'Switzerland',continent:'Europe',latitude:46.3167,longitude:7.9833,note:'A quiet Alpine town discovered by taking the wrong train.',status:'documented',feelings:['immersed'],featuredImage:'',visitLabel:'Study abroad',story:[
    'I ended up in Brig by accident after taking the wrong train, but I was so glad I did.',
    'It was such a cute, quiet town.'
  ]},
  {name:'Kandersteg',slug:'kandersteg',country:'Switzerland',continent:'Europe',latitude:46.4947,longitude:7.6733,note:'Snow, green meadows, mountains, and a favorite canoeing memory.',status:'documented',feelings:['wild','immersed','inspired'],featuredImage:'',visitLabel:'September trip',story:[
    'We went in mid-September and did not expect to see snow, but it made the trip feel magical.',
    'Canoeing on the lake is still one of my favorite study-abroad memories.'
  ]},
  {name:'Pompeii',slug:'pompeii',country:'Italy',continent:'Europe',latitude:40.7462,longitude:14.4989,note:'An astonishingly advanced ancient city best explored slowly and with a guide.',status:'documented',feelings:['inspired','energized'],featuredImage:'',visitLabel:'Study abroad',story:[
    'Pompeii was one of my favorite trips. Going outside the crowded summer season made it easier to spend the entire day exploring.',
    'I highly recommend a guided tour because the guides explain how the city worked and what the buildings used to be.',
    'The gyms, bath houses, theater, fast food counters, sewage system, and preserved pipes made the city feel lively and surprisingly advanced.'
  ]},
  {name:'Sorrento',slug:'sorrento',country:'Italy',continent:'Europe',latitude:40.6263,longitude:14.3758,note:'A clean, safe coastal base with lively evening walks and easy access to Pompeii.',status:'documented',feelings:['immersed','relaxed','energized'],featuredImage:'',visitLabel:'Pompeii trip',story:[
    'We stayed in Sorrento for the Pompeii trip, and I highly recommend it as a base.',
    'It was easy to take the train to Pompeii, and the coastal setting felt safe and clean.',
    'At night it was fun to walk around and choose from many good restaurants.'
  ]},
  {name:'Salzburg',slug:'salzburg',country:'Austria',continent:'Europe',latitude:47.8095,longitude:13.0550,note:'A pretty, compact city with Christmas markets and easy access to nearby hikes.',status:'documented',feelings:['inspired','relaxed','immersed'],featuredImage:'',visitLabel:'Friend visit',story:[
    'Salzburg was prettier and more touristy than I expected because of its connection to The Sound of Music.',
    'The city felt relatively small, and I thought its best advantage was the access to hikes by bus.',
    'The Christmas markets were fun to walk through, especially with a sandwich and Glühwein.'
  ]}
];
