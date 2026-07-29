const mapPins=[...document.querySelectorAll('.map-pin')];
const cards=[...document.querySelectorAll('.place-card')];
const sharedFilters=[...document.querySelectorAll('.shared-filter')];
const mapCard=document.getElementById('mapCard');
const filterStatus=document.getElementById('filterStatus');
function clearMapSelection(){
  mapPins.forEach(p=>p.classList.remove('selected'));
  mapCard.classList.add('is-cleared');
}
function applyFilter(filter){
  mapPins.forEach(pin=>pin.classList.toggle('hidden',filter!=='all' && pin.dataset.type!==filter));
  cards.forEach(card=>{const tags=(card.dataset.tags||'').split(' ');card.style.display=filter==='all'||tags.includes(filter)?'':'none';});
  sharedFilters.forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  clearMapSelection();
  const visibleCards=cards.filter(c=>c.style.display!=='none').length;
  const visiblePins=mapPins.filter(p=>!p.classList.contains('hidden')).length;
  if(filterStatus) filterStatus.textContent=filter==='all'?'Showing every recommendation and map location.':`Showing ${visibleCards} recommendation${visibleCards===1?'':'s'} and ${visiblePins} map location${visiblePins===1?'':'s'} for ${filter}.`;
}
sharedFilters.forEach(btn=>btn.addEventListener('click',()=>applyFilter(btn.dataset.filter)));
mapPins.forEach(pin=>pin.addEventListener('click',()=>{
  mapPins.forEach(p=>p.classList.remove('selected'));pin.classList.add('selected');
  mapCard.classList.remove('is-cleared');
  mapCard.querySelector('img').src=pin.dataset.image;
  mapCard.querySelector('h3').textContent=pin.dataset.title;
  mapCard.querySelector('p').textContent=pin.dataset.text;
}));
clearMapSelection();
const modal=document.getElementById('storyModal');
document.querySelectorAll('#storyGallery button').forEach(btn=>btn.addEventListener('click',()=>{modal.querySelector('img').src=btn.dataset.img;modal.querySelector('h2').textContent=btn.dataset.title;modal.querySelector('p').textContent=btn.dataset.story;modal.hidden=false;document.body.style.overflow='hidden';}));
modal.querySelector('.modal-close').addEventListener('click',()=>{modal.hidden=true;document.body.style.overflow=''});
modal.addEventListener('click',e=>{if(e.target===modal){modal.hidden=true;document.body.style.overflow=''}});
