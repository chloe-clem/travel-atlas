(function(){
  const canvas=document.getElementById('earthGlobe');
  if(!canvas||!window.d3||!window.COUNTRIES_GEOJSON)return;
  const hero=document.querySelector('.earth-hero'),story=document.querySelector('.earth-story'),nav=document.querySelector('.nav'),ctx=canvas.getContext('2d');
  const features=window.COUNTRIES_GEOJSON.features||[];
  let rotation=[-12,-18,0],dragging=false,last=[0,0],dpr=Math.min(devicePixelRatio||1,1.5),projection,path,width=0,height=0;
  let lastInteraction=0,lastFrame=performance.now(),baseScale=1;

  function solar(){const now=new Date(),day=(now-Date.UTC(now.getUTCFullYear(),0,0))/86400000;return{lat:-23.44*Math.cos((2*Math.PI/365)*(day+10)),lon:-(now.getUTCHours()+now.getUTCMinutes()/60+now.getUTCSeconds()/3600-12)*15}}
  function setup(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);baseScale=Math.min(width,height)*.40;projection=d3.geo.orthographic().translate([width*.5,height*.56]).scale(baseScale).clipAngle(90).precision(.5).rotate(rotation);path=d3.geo.path().projection(projection).context(ctx)}
  function drawOcean(){const x=width*.5,y=height*.56,r=baseScale,g=ctx.createRadialGradient(x-r*.34,y-r*.43,8,x,y,r*1.08);g.addColorStop(0,'#91d2df');g.addColorStop(.18,'#3b87a1');g.addColorStop(.6,'#123f59');g.addColorStop(1,'#01070d');ctx.beginPath();path({type:'Sphere'});ctx.fillStyle=g;ctx.shadowColor='rgba(105,213,240,.32)';ctx.shadowBlur=42;ctx.fill();ctx.shadowBlur=0}
  function drawLand(){features.forEach(f=>{ctx.beginPath();path(f);ctx.fillStyle='#718e70';ctx.fill()});const shade=ctx.createLinearGradient(width*.28,height*.18,width*.75,height*.82);shade.addColorStop(0,'rgba(236,244,200,.30)');shade.addColorStop(.5,'rgba(61,104,72,.05)');shade.addColorStop(1,'rgba(3,15,14,.58)');ctx.beginPath();path(COUNTRIES_GEOJSON);ctx.fillStyle=shade;ctx.fill();ctx.beginPath();path(COUNTRIES_GEOJSON);ctx.strokeStyle='rgba(248,248,225,.48)';ctx.lineWidth=.45;ctx.stroke()}
  function drawNight(){const sun=solar(),night=d3.geo.circle().origin([sun.lon+180,-sun.lat]).angle(90)();ctx.beginPath();path(night);ctx.fillStyle='rgba(0,3,10,.64)';ctx.fill()}
  function drawAtmosphere(){ctx.beginPath();path({type:'Sphere'});ctx.strokeStyle='rgba(183,233,244,.76)';ctx.lineWidth=1.2;ctx.shadowColor='rgba(80,202,234,.45)';ctx.shadowBlur=16;ctx.stroke();ctx.shadowBlur=0}
  function draw(t){const dt=Math.min(34,t-lastFrame);lastFrame=t;if(!dragging&&performance.now()-lastInteraction>1700)rotation[0]=(rotation[0]-.0038*dt)%360;projection.rotate(rotation);ctx.clearRect(0,0,width,height);drawOcean();drawLand();drawNight();drawAtmosphere();requestAnimationFrame(draw)}
  function clamp(v){return Math.max(0,Math.min(1,v))}
  function smoothstep(a,b,x){x=clamp((x-a)/(b-a));return x*x*(3-2*x)}
  function updateStory(){const rect=story.getBoundingClientRect(),max=Math.max(1,story.offsetHeight-innerHeight),p=clamp(-rect.top/max);const title=1-smoothstep(.08,.34,p);const earth=1-smoothstep(.25,.55,p);const reveal=smoothstep(.61,.76,p);const revealY=(1-reveal)*28;const blur=smoothstep(.30,.61,p)*5;hero.style.setProperty('--story',p.toFixed(3));hero.style.setProperty('--title-opacity',title.toFixed(3));hero.style.setProperty('--earth-opacity',earth.toFixed(3));hero.style.setProperty('--reveal-opacity',reveal.toFixed(3));hero.style.setProperty('--reveal-y',revealY.toFixed(1)+'px');hero.style.setProperty('--earth-blur',blur.toFixed(2)+'px');nav&&nav.classList.toggle('scrolled',scrollY>80)}
  canvas.addEventListener('pointerdown',e=>{dragging=true;last=[e.clientX,e.clientY];lastInteraction=performance.now();canvas.setPointerCapture(e.pointerId)});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;rotation[0]+=(e.clientX-last[0])*.24;rotation[1]-=(e.clientY-last[1])*.18;rotation[1]=Math.max(-82,Math.min(82,rotation[1]));last=[e.clientX,e.clientY];lastInteraction=performance.now()});
  canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);
  canvas.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)*.65||e.shiftKey){e.preventDefault();rotation[0]-=(Math.abs(e.deltaX)>1?e.deltaX:e.deltaY)*.09;lastInteraction=performance.now()}},{passive:false});
  addEventListener('scroll',updateStory,{passive:true});addEventListener('resize',()=>{setup();updateStory()});
  setup();updateStory();requestAnimationFrame(draw);
})();
