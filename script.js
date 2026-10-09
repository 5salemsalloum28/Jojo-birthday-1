const eventDate=new Date(2026,9,10,17,0,0),timer=document.getElementById('timer');
function updateCountdown(){let d=eventDate.getTime()-Date.now();if(d<=0){timer.innerHTML='<div class="timebox"><strong>🎂</strong><span>Party time! · حان وقت الاحتفال</span></div>';return}let v=[Math.floor(d/86400000),Math.floor(d%86400000/3600000),Math.floor(d%3600000/60000),Math.floor(d%60000/1000)],en=['Days','Hours','Minutes','Seconds'],ar=['أيام','ساعات','دقائق','ثوانٍ'];timer.innerHTML=v.map((n,i)=>`<div class="timebox"><strong>${String(n).padStart(2,'0')}</strong><span>${en[i]} · ${ar[i]}</span></div>`).join('')}
updateCountdown();setInterval(updateCountdown,1000);
const bookBtn=document.getElementById('bookBtn'),message=document.getElementById('message');bookBtn.addEventListener('click',()=>{message.classList.toggle('open');bookBtn.setAttribute('aria-expanded',message.classList.contains('open'));bookBtn.querySelector('.book-hint').textContent=message.classList.contains('open')?'الكتاب مفتوح! · Book opened!':'اضغط لفتح الكتاب · Tap to open the book'});
const canvas=document.getElementById('scratchCanvas'),ctx=canvas.getContext('2d');let drawing=false,scratched=0;
function paintGold(){const r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(r.width*dpr));canvas.height=Math.max(1,Math.round(r.height*dpr));ctx.setTransform(dpr,0,0,dpr,0,0);let g=ctx.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,'#c99a3d');g.addColorStop(.22,'#ffeab0');g.addColorStop(.45,'#d9aa45');g.addColorStop(.62,'#fff0b8');g.addColorStop(1,'#b9842e');ctx.globalCompositeOperation='source-over';ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);ctx.strokeStyle='#fff0bd';ctx.lineWidth=2;ctx.strokeRect(9,9,r.width-18,r.height-18);ctx.fillStyle='#fff6d7';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 20px Georgia';ctx.fillText('✧ GOLDEN SURPRISE ✧',r.width/2,r.height/2-12);ctx.font='16px Georgia';ctx.fillText('المسح لاكتشاف المفاجأة',r.width/2,r.height/2+18);for(let i=0;i<40;i++){ctx.beginPath();ctx.arc(Math.random()*r.width,Math.random()*r.height,Math.random()*1.8+.3,0,Math.PI*2);ctx.fillStyle='#fff8d7';ctx.fill()}scratched=0;canvas.style.pointerEvents='auto'}
function pos(e){let r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
function erase(e){if(!drawing)return;e.preventDefault();let p=pos(e);ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(p.x,p.y,22,0,Math.PI*2);ctx.fill();scratched++;if(scratched%12===0)checkReveal()}
function checkReveal(){try{let a=ctx.getImageData(0,0,canvas.width,canvas.height).data,clear=0,total=0;for(let i=3;i<a.length;i+=32){total++;if(a[i]<40)clear++}if(total&&clear/total>.45){ctx.clearRect(0,0,canvas.width,canvas.height);canvas.style.pointerEvents='none'}}catch(e){}}
canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);erase(e)});canvas.addEventListener('pointermove',erase);canvas.addEventListener('pointerup',()=>{drawing=false;checkReveal()});canvas.addEventListener('pointercancel',()=>drawing=false);document.getElementById('resetScratch').addEventListener('click',paintGold);window.addEventListener('resize',paintGold);paintGold();
const petals=['✿','❀','♡','✧'];function makePetal(){let e=document.createElement('span');e.className='petal';e.textContent=petals[Math.floor(Math.random()*petals.length)];e.style.left=Math.random()*100+'vw';e.style.fontSize=(12+Math.random()*18)+'px';let t=8+Math.random()*9;e.style.animationDuration=t+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),t*1000)}for(let i=0;i<10;i++)setTimeout(makePetal,i*450);setInterval(makePetal,1000);
let ac=null,osc=null,gain=null,playing=false;const mb=document.getElementById('musicBtn'),ml=document.getElementById('musicLabel');mb.addEventListener('click',async()=>{if(playing){try{osc.stop()}catch(e){}gain.disconnect();playing=false;ml.textContent='Music off';return}try{let AC=window.AudioContext||window.webkitAudioContext;if(!AC){ml.textContent='Unavailable';return}ac=ac||new AC();await ac.resume();gain=ac.createGain();gain.gain.value=.012;gain.connect(ac.destination);osc=ac();osc.type='sine';osc.frequency.value=523.25;osc.connect(gain);osc.start();playing=true;ml.textContent='Soft tone on'}catch(e){ml.textContent='Unavailable'}});

const birthdayAudio = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");

musicButton.addEventListener("click", async () => {
  try {
    if (birthdayAudio.paused) {
      await birthdayAudio.play();
      musicLabel.textContent = "Music on 🎹";
    } else {
      birthdayAudio.pause();
      musicLabel.textContent = "Music off";
    }
  } catch (error) {
    alert("Could not play the piano song. Check the file path and try again.");
    console.error(error);
  }
});
