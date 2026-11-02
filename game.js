'use strict';
(() => {
const KEY='english-neighborhood-v1';
const $=id=>document.getElementById(id);
const total=GAME_STAGES.reduce((n,s)=>n+s.turns.length,0);
const fresh=best=>({version:1,index:0,score:0,best,answers:[],attempts:[],assisted:[]});
let state=fresh(0), storageOK=true;
try {
 const saved=JSON.parse(localStorage.getItem(KEY));
 if(saved && saved.version===1 && Number.isInteger(saved.index) && saved.index>=0 && saved.index<=total && Number.isFinite(saved.score) && saved.score>=0 && saved.score<=total*10 && Number.isFinite(saved.best) && saved.best>=0 && saved.best<=total*10 && ['answers','attempts','assisted'].every(k=>Array.isArray(saved[k]))){state=saved;}
} catch {storageOK=false;}
let sound=false,locked=false,walking=false,walkTimer, options=[];
function save(){state.best=Math.max(state.best,state.score);try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch{storageOK=false;}$('save-status').textContent=storageOK?'הניקוד וההתקדמות נשמרים אוטומטית בדפדפן במכשיר הזה.':'השמירה בדפדפן אינה זמינה כרגע. אפשר לשחק, אך ההתקדמות עלולה להימחק בסגירה.';}
function position(index){let start=0;for(let i=0;i<GAME_STAGES.length;i++){const stage=GAME_STAGES[i];if(index<start+stage.turns.length)return {stage,stageIndex:i,turn:stage.turns[index-start],turnIndex:index-start,start};start+=stage.turns.length;}return null;}
function speak(text){if(!sound||!window.speechSynthesis)return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.82;const voice=window.speechSynthesis.getVoices().find(v=>/^en-US$/i.test(v.lang));if(voice)u.voice=voice;window.speechSynthesis.speak(u);}
function shuffled(values){const list=[...values];for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;}
function map(stageIndex){$('map').replaceChildren();GAME_STAGES.forEach((s,i)=>{const b=document.createElement('button');b.textContent=i<stageIndex?'✓':String(i+1);b.className='map-stop'+(i===stageIndex?' current':i<stageIndex?' done':'');b.disabled=true;b.title=`${s.place}: ${s.topic}`;b.setAttribute('aria-label',`תחנה ${i+1}: ${s.topic}${i<stageIndex?' — הושלמה':''}`);if(i===stageIndex)b.setAttribute('aria-current','step');$('map').append(b);});}
function render(animate=false){
 clearTimeout(walkTimer);
 const pos=position(state.index);$('score').textContent=state.score;$('best').textContent=state.best;
 $('ending').hidden=!!pos;document.querySelector('.game-card').hidden=!pos;
 if(!pos){$('station').textContent='16 / 16';map(16);$('summary').textContent=`סיימת ${total} שיחות עם ${state.score} מתוך ${total*10} נקודות. השיא שלך: ${state.best}. אפשר להתחיל שוב ולתרגל עם פחות עזרה.`;return;}
 const {stage,stageIndex,turn,turnIndex}=pos;
 locked=Boolean(state.answers[state.index]);walking=animate;
 $('station').textContent=`${stageIndex+1} / 16`;map(stageIndex);
 $('place').textContent=stage.place;$('level').textContent=`${stageIndex<5?'צעדים ראשונים':stageIndex<10?'בונים ביטחון':'משלבים זמנים'} · ${stage.topic} · שיחה ${turnIndex+1}/${stage.turns.length}`;
 $('story').textContent=stage.story;$('npc').textContent=stage.avatar;$('name').textContent=stage.name;$('speech').textContent=turn.speech;$('mission').textContent=turn.mission;
 $('lesson').href=`${stage.chapter<9?'index.html':'part2.html'}#ch${stage.chapter}`;
 $('reply').hidden=true;$('help').hidden=true;$('feedback').hidden=true;$('feedback').className='';$('next').hidden=!locked;
 $('hint').disabled=locked;$('translate').disabled=locked;
 options=shuffled([turn.answer,...turn.wrong]);$('answers').replaceChildren();
 options.forEach(text=>{const b=document.createElement('button');b.textContent=text;b.lang='en';b.dir='ltr';b.disabled=locked||walking;
 if(state.attempts[state.index]?.includes(text)){b.classList.add('wrong');b.disabled=true;}
 b.addEventListener('click',()=>answer(text,b,turn));$('answers').append(b);});
 if(locked){showCorrect(turn);}
 $('scene').classList.toggle('walking',animate);
 if(animate){clearTimeout(walkTimer);walkTimer=setTimeout(()=>{$('scene').classList.remove('walking');walking=false;[...$('answers').children].forEach(b=>b.disabled=locked||state.attempts[state.index]?.includes(b.textContent));speak(turn.speech);},900);}else speak(turn.speech);
}
function showCorrect(turn){$('reply').textContent=turn.answer;$('reply').hidden=false;[...$('answers').children].forEach(b=>{b.disabled=true;if(b.textContent===turn.answer)b.classList.add('correct');});$('feedback').hidden=false;$('feedback').className='';$('feedback').textContent=`נכון! +${state.answers[state.index]} נקודות. ${turn.rule}`;}
function answer(text,b,turn){if(locked||walking)return;if(text!==turn.answer){state.attempts[state.index]??=[];state.attempts[state.index].push(text);b.classList.add('wrong');b.disabled=true;$('feedback').hidden=false;$('feedback').className='error';$('feedback').textContent=`עוד ניסיון — ${turn.rule}`;save();return;}
 locked=true;const points=state.attempts[state.index]?.length?4:state.assisted[state.index]?7:10;state.answers[state.index]=points;state.score+=points;save();showCorrect(turn);$('score').textContent=state.score;$('best').textContent=state.best;$('next').hidden=false;$('hint').disabled=true;$('translate').disabled=true;speak(turn.answer);
}
function assist(kind){if(locked)return;const {turn}=position(state.index);state.assisted[state.index]=true;save();$('help').hidden=false;$('help').textContent=kind==='hint'?turn.rule:turn.translation;}
$('hint').addEventListener('click',()=>assist('hint'));$('translate').addEventListener('click',()=>assist('translation'));
$('next').addEventListener('click',()=>{if(!locked)return;const old=position(state.index).stageIndex;state.index++;save();render(position(state.index)?.stageIndex!==old);$('mission').tabIndex=-1;$('mission').focus({preventScroll:true});if(state.index===total){$('ending').tabIndex=-1;$('ending').focus();}});
function restart(){if(state.index<total&&!confirm('להתחיל מסע חדש? ההתקדמות והניקוד במסע הנוכחי יתאפסו. השיא יישמר.'))return;clearTimeout(walkTimer);window.speechSynthesis?.cancel();state=fresh(state.best);save();render(true);}
$('restart').addEventListener('click',restart);$('replay').addEventListener('click',restart);
if(!window.speechSynthesis){$('sound').disabled=true;$('sound').textContent='הקראה אינה זמינה בדפדפן';}
$('sound').addEventListener('click',()=>{sound=!sound;$('sound').setAttribute('aria-pressed',String(sound));$('sound').textContent=sound?'🔇 כבה הקראה':'🔊 השמע שיחה';if(sound&&position(state.index))speak(position(state.index).turn.speech);else window.speechSynthesis?.cancel();});
window.addEventListener('pagehide',()=>window.speechSynthesis?.cancel());save();render(true);
})();
