const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

(() => {
  if(!document.body.classList.contains('home')) return;
  const params=new URLSearchParams(location.search);
  const requested=params.get('return');
  const id=requested==='feel'?'feel':requested==='atlas'?'atlas-list':location.hash.slice(1);
  if(!['feel','atlas-list'].includes(id)) return;
  const restore=()=>{ const target=document.getElementById(id); if(target) window.scrollTo({top:target.offsetTop,behavior:'auto'}); };
  restore(); requestAnimationFrame(restore);
  addEventListener('load',()=>{ restore(); if(requested) history.replaceState(null,'',`${location.pathname}#${id}`); },{once:true});
})();

(() => {
  if(!document.body.classList.contains('home')) return;
  const openEarth=(event)=>{
    event?.preventDefault();
    document.documentElement.classList.remove('skip-home-intro');
    history.replaceState(null,'',`${location.pathname}#top`);
    requestAnimationFrame(()=>{ window.scrollTo({top:0,behavior:'auto'}); requestAnimationFrame(()=>window.dispatchEvent(new Event('scroll'))); });
  };
  document.querySelectorAll('.earth-home-link').forEach(link=>link.addEventListener('click',openEarth));
})();
