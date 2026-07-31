import 'mapbox-gl/dist/mapbox-gl.css';

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('visible');
}),{threshold:.1});
document.querySelectorAll('.fade').forEach(element=>revealObserver.observe(element));

const cards=[...document.querySelectorAll('.place-card[data-place-id]')];
const sharedFilters=[...document.querySelectorAll('.shared-filter')];
const mapContainer=document.getElementById('cityMap');
const mapCanvas=document.getElementById('mapCanvas');
const mapSetup=document.getElementById('mapSetup');
const mapCard=document.getElementById('mapCard');
const filterStatus=document.getElementById('filterStatus');
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const places=cards.map(card=>({
  id:card.dataset.placeId,
  coordinates:[Number(card.dataset.lng),Number(card.dataset.lat)],
  tags:(card.dataset.tags||'').split(' ').filter(Boolean),
  title:card.querySelector('h3')?.textContent?.trim()||'',
  description:card.querySelector('.place-copy>p')?.textContent?.trim()||'',
  image:card.querySelector('img')?.src||'',
  imageAlt:card.querySelector('img')?.alt||'',
  card,
}));
const markers=new Map();
let map;
let mapboxgl;
let selectedPlaceId;

function updateMapCard(place){
  const image=mapCard?.querySelector('img');
  if(!mapCard||!image) return;
  image.src=place.image;
  image.alt=place.imageAlt;
  mapCard.querySelector('h3').textContent=place.title;
  mapCard.querySelector('p').textContent=place.description;
  mapCard.classList.remove('is-cleared');
}

function clearSelection(){
  selectedPlaceId=undefined;
  cards.forEach(card=>card.classList.remove('selected'));
  markers.forEach(({element})=>element.classList.remove('selected'));
  mapCard?.classList.add('is-cleared');
}

function selectPlace(place,{moveMap=true}={}){
  selectedPlaceId=place.id;
  cards.forEach(card=>card.classList.toggle('selected',card===place.card));
  markers.forEach(({element},id)=>element.classList.toggle('selected',id===place.id));
  updateMapCard(place);
  if(moveMap&&map){
    map.easeTo({center:place.coordinates,zoom:15.6,duration:prefersReducedMotion?0:700,padding:{bottom:110}});
  }
}

function applyFilter(filter){
  places.forEach(place=>{
    const visible=filter==='all'||place.tags.includes(filter);
    place.card.hidden=!visible;
    markers.get(place.id)?.element.toggleAttribute('hidden',!visible);
  });
  sharedFilters.forEach(button=>button.classList.toggle('active',button.dataset.filter===filter));
  clearSelection();
  const visiblePlaces=places.filter(place=>!place.card.hidden).length;
  const activeLabel=sharedFilters.find(button=>button.dataset.filter===filter)?.textContent||filter;
  if(filterStatus) filterStatus.textContent=filter==='all'?'Showing every recommendation and map location.':`Showing ${visiblePlaces} recommendation${visiblePlaces===1?'':'s'} and ${visiblePlaces} map location${visiblePlaces===1?'':'s'} for ${activeLabel}.`;
}

function restyleMap(){
  const style=map?.getStyle();
  if(!style?.layers) return;
  style.layers.forEach(layer=>{
    try{
      if(layer.type==='background') map.setPaintProperty(layer.id,'background-color','#e7e9e1');
      if(layer.type==='water') map.setPaintProperty(layer.id,'fill-color','#9db8b4');
      if(layer.type==='building') map.setPaintProperty(layer.id,'fill-color','#d7d7cc');
      if(layer.type==='symbol'&&layer.paint?.['text-color']!==undefined) map.setPaintProperty(layer.id,'text-color','#40574f');
    }catch{}
  });
}

async function initializeMap(){
  if(!mapContainer||!mapCanvas) return;
  const accessToken=mapContainer.dataset.mapboxToken;
  if(!accessToken){
    mapSetup.hidden=false;
    mapCanvas.hidden=true;
    return;
  }
  ({default:mapboxgl}=await import('mapbox-gl'));
  mapboxgl.accessToken=accessToken;
  map=new mapboxgl.Map({
    container:mapCanvas,
    style:mapContainer.dataset.mapboxStyle,
    center:[4.497,52.1601],
    zoom:14.1,
    minZoom:11,
    maxZoom:18,
    attributionControl:false,
  });
  map.addControl(new mapboxgl.NavigationControl({showCompass:false}),'top-right');
  map.addControl(new mapboxgl.AttributionControl({compact:true}),'bottom-right');
  map.on('style.load',restyleMap);
  map.on('load',()=>{
    places.forEach((place,index)=>{
      const element=document.createElement('button');
      element.type='button';
      element.className='map-pin';
      element.textContent=String(index+1);
      element.setAttribute('aria-label',`Open ${place.title}`);
      element.addEventListener('click',()=>selectPlace(place,{moveMap:false}));
      element.toggleAttribute('hidden',place.card.hidden);
      const marker=new mapboxgl.Marker({element,anchor:'bottom'}).setLngLat(place.coordinates).addTo(map);
      markers.set(place.id,{marker,element});
    });
  });
  new ResizeObserver(()=>map?.resize()).observe(mapContainer);
}

sharedFilters.forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter)));
cards.forEach(card=>{
  const place=places.find(candidate=>candidate.card===card);
  const activate=()=>selectPlace(place);
  card.addEventListener('click',activate);
  card.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();activate();}
  });
});
mapCard?.querySelector('button')?.addEventListener('click',()=>{
  const place=places.find(candidate=>candidate.id===selectedPlaceId);
  place?.card.scrollIntoView({behavior:prefersReducedMotion?'auto':'smooth',block:'center'});
  place?.card.focus({preventScroll:true});
});

if(mapContainer){
  const mapObserver=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      mapObserver.disconnect();
      initializeMap();
    }
  },{rootMargin:'300px'});
  mapObserver.observe(mapContainer);
}
clearSelection();

const modal=document.getElementById('storyModal');
document.querySelectorAll('#storyGallery button').forEach(button=>button.addEventListener('click',()=>{modal.querySelector('img').src=button.dataset.img;modal.querySelector('h2').textContent=button.dataset.title;modal.querySelector('p').textContent=button.dataset.story;modal.hidden=false;document.body.style.overflow='hidden';}));
modal.querySelector('.modal-close').addEventListener('click',()=>{modal.hidden=true;document.body.style.overflow=''});
modal.addEventListener('click',event=>{if(event.target===modal){modal.hidden=true;document.body.style.overflow='';}});
