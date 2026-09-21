const body=document.body;
const openBtn=document.getElementById("openBtn");
const restartBtn=document.getElementById("restartBtn");
const musicBtn=document.getElementById("musicBtn");
const musicIcon=document.getElementById("musicIcon");
const audio=document.getElementById("audio");
const stars=document.getElementById("stars");
const floating=document.getElementById("floatingFlowers");

function makeStars(){
  stars.innerHTML="";
  const n=Math.min(42,Math.max(22,Math.floor(innerWidth/15)));
  for(let i=0;i<n;i++){
    const s=document.createElement("span");
    s.className="star";
    s.style.left=Math.random()*100+"%";
    s.style.top=(75+Math.random()*35)+"%";
    s.style.setProperty("--d",(7+Math.random()*12)+"s");
    s.style.setProperty("--delay",(-Math.random()*15)+"s");
    s.style.setProperty("--x",(-70+Math.random()*140)+"px");
    stars.appendChild(s);
  }
}
function flowerSvg(){
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <g fill="#ffc72c">
      <ellipse cx="50" cy="23" rx="10" ry="24"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(45 50 50)"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(90 50 50)"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(135 50 50)"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(180 50 50)"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(225 50 50)"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(270 50 50)"/>
      <ellipse cx="50" cy="23" rx="10" ry="24" transform="rotate(315 50 50)"/>
    </g><circle cx="50" cy="50" r="12" fill="#7b4a0b"/>
  </svg>`;
}
function makeFlowers(){
  floating.innerHTML="";
  const n=innerWidth<600?7:11;
  for(let i=0;i<n;i++){
    const f=document.createElement("div");
    f.className="float-flower";
    f.innerHTML=flowerSvg();
    f.style.setProperty("--s",(16+Math.random()*30)+"px");
    f.style.setProperty("--l",(-5+Math.random()*110)+"%");
    f.style.setProperty("--d",(11+Math.random()*12)+"s");
    f.style.setProperty("--delay",(-Math.random()*20)+"s");
    f.style.setProperty("--x",(-100+Math.random()*200)+"px");
    floating.appendChild(f);
  }
}
makeStars(); makeFlowers();
addEventListener("resize",()=>{makeStars();makeFlowers()});

function start(){
  body.classList.add("opened");
  document.getElementById("surprise").setAttribute("aria-hidden","false");
  audio.volume=.13;
  audio.play().then(()=>{
    musicIcon.textContent="♫";
  }).catch(()=>{
    musicIcon.textContent="♪";
  });
}
openBtn.addEventListener("click",start);

musicBtn.addEventListener("click",()=>{
  if(audio.paused){
    audio.play().then(()=>musicIcon.textContent="♫").catch(()=>{});
  }else{
    audio.pause(); musicIcon.textContent="♪";
  }
});

restartBtn.addEventListener("click",()=>{
  audio.currentTime=0;
  body.classList.remove("opened");
  document.getElementById("surprise").setAttribute("aria-hidden","true");
  window.scrollTo({top:0,behavior:"instant"});
  // Restart the CSS animations by forcing a reflow.
  setTimeout(()=>{
    void document.body.offsetWidth;
    body.classList.add("opened");
    audio.play().catch(()=>{});
  },80);
});
