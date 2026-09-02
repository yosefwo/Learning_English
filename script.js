const body=document.body;
const search=document.querySelector('#search');
const theme=document.querySelector('#theme');
const expand=document.querySelector('#expand');
const fontUp=document.querySelector('#fontUp');
const fontDown=document.querySelector('#fontDown');

const savedTheme=localStorage.getItem('book-theme');
if(savedTheme==='dark')body.classList.add('dark');

if(theme){theme.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('book-theme',body.classList.contains('dark')?'dark':'light');});}
if(expand){expand.addEventListener('click',()=>{const items=[...document.querySelectorAll('details')];const open=items.some(x=>!x.open);items.forEach(x=>x.open=open);expand.textContent=open?'הסתר תשובות':'הצג תשובות';});}
if(search){search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.chapter,.word-guide,.cover').forEach(section=>section.classList.toggle('hidden-by-search',q&&!section.innerText.toLowerCase().includes(q)));});}

let fontScale=Number(localStorage.getItem('book-font-scale')||1);
function applyFontScale(){fontScale=Math.min(1.4,Math.max(.85,fontScale));document.documentElement.style.fontSize=`${fontScale*100}%`;localStorage.setItem('book-font-scale',String(fontScale));}
applyFontScale();
if(fontUp)fontUp.addEventListener('click',()=>{fontScale+=.1;applyFontScale();});
if(fontDown)fontDown.addEventListener('click',()=>{fontScale-=.1;applyFontScale();});

const isPartTwo=location.pathname.endsWith('part2.html');
const sidebar=document.querySelector('.sidebar');
const main=document.querySelector('main');

document.title=document.title.replace('Turbo English','אנגלית בהיגיון');
document.querySelectorAll('header h1,.cover h2').forEach(el=>{el.textContent=el.textContent.replace('Turbo English','אנגלית בהיגיון');});

if(!isPartTwo){
  document.querySelectorAll('a[href="#part2"],a[href="#ch9"]').forEach(el=>el.remove());
  document.querySelector('#part2')?.remove();
  document.querySelector('#ch9')?.remove();
}

function addPageLink(parent,href,text,className='part-link'){
  if(!parent||parent.querySelector(`a[href="${href}"]`))return;
  const link=document.createElement('a');link.href=href;link.textContent=text;link.className=className;parent.appendChild(link);
}

if(isPartTwo){
  addPageLink(sidebar,'index.html','← חזרה לחלק א – יסודות המשפט');
}else{
  addPageLink(sidebar,'part2.html','חלק ב – כל הזמנים →');
  const cover=document.querySelector('#cover,.cover');
  if(cover&&!cover.querySelector('a[href="part2.html"]')){const p=document.createElement('p');addPageLink(p,'part2.html','עבור לחלק ב – הזמנים','part-button');cover.appendChild(p);}
}

if(main){const nav=document.createElement('nav');nav.className='page-navigation';nav.setAttribute('aria-label','מעבר בין חלקי הספר');addPageLink(nav,isPartTwo?'index.html':'part2.html',isPartTwo?'← חזרה לחלק א':'עבור לחלק ב →','part-button');main.appendChild(nav);}

const extraStyle=document.createElement('style');
extraStyle.textContent=`details{transition:background .2s ease,border-color .2s ease,box-shadow .2s ease}details[open]{background:#fffbea;border-color:#f59e0b;box-shadow:0 0 0 2px rgba(245,158,11,.14)}details[open] summary{color:#92400e}details[open]>p{background:#fffbeb;border-radius:10px;padding:10px 12px;margin-top:10px}body.dark details[open]{background:#3a2b1b;border-color:#f59e0b}body.dark details[open] summary{color:#fcd34d}body.dark details[open]>p{background:#2b2118}.page-navigation{display:flex;justify-content:center;margin:28px 0}.part-button,.part-link{display:inline-block;text-decoration:none;font-weight:700}.part-button{padding:10px 16px;border:1px solid var(--border);border-radius:12px;background:var(--tip);color:var(--text)}`;
document.head.appendChild(extraStyle);

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<850&&sidebar)sidebar.scrollIntoView({behavior:'smooth'});}));

// Add accessible text-to-speech to every English phrase or sentence.
const speechEngine=window.speechSynthesis;
let englishVoices=[];
let activeSpeechButton=null;

function refreshEnglishVoices(){
  if(!speechEngine)return;
  englishVoices=speechEngine.getVoices().filter(voice=>/^en([_-]|$)/i.test(voice.lang));
}

function preferredEnglishVoice(){
  const ranked=[/google.*(us|english)/i,/microsoft.*(aria|jenny|guy|zira|david)/i,/samsung.*english/i,/(natural|neural|premium|enhanced)/i];
  const american=englishVoices.filter(voice=>/^en[-_]US$/i.test(voice.lang));
  const candidates=american.length?american:englishVoices;
  for(const pattern of ranked){
    const voice=candidates.find(item=>pattern.test(`${item.name} ${item.voiceURI}`));
    if(voice)return voice;
  }
  return candidates.find(voice=>voice.default)||candidates[0]||null;
}

function englishTextFrom(element){
  const copy=element.cloneNode(true);
  copy.querySelectorAll('.he,.speak-button').forEach(item=>item.remove());
  return copy.textContent.replace(/^[AB]:\s*/i,'').replace(/\s+/g,' ').trim();
}

function finishSpeechButton(){
  if(!activeSpeechButton)return;
  activeSpeechButton.classList.remove('is-speaking');
  activeSpeechButton.setAttribute('aria-pressed','false');
  activeSpeechButton=null;
}

function speakEnglish(text,button){
  if(!speechEngine||!text)return;
  speechEngine.cancel();
  finishSpeechButton();
  refreshEnglishVoices();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang='en-US';
  utterance.rate=.82;
  utterance.pitch=1;
  const voice=preferredEnglishVoice();
  if(voice)utterance.voice=voice;
  utterance.onend=finishSpeechButton;
  utterance.onerror=finishSpeechButton;
  activeSpeechButton=button;
  button.classList.add('is-speaking');
  button.setAttribute('aria-pressed','true');
  speechEngine.speak(utterance);
}

function addEnglishSpeechButtons(){
  document.querySelectorAll('.en').forEach(element=>{
    if(element.parentElement?.closest('.en')||element.querySelector(':scope > .speak-button'))return;
    const text=englishTextFrom(element);
    if(!text)return;
    const button=document.createElement('button');
    button.type='button';
    button.className='speak-button';
    button.setAttribute('aria-label',`השמע באנגלית: ${text}`);
    button.setAttribute('aria-pressed','false');
    button.title='השמעת המשפט באנגלית';
    button.innerHTML='<span aria-hidden="true">🔊</span>';
    button.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      if(activeSpeechButton===button){speechEngine.cancel();finishSpeechButton();return;}
      speakEnglish(text,button);
    });
    element.append(' ',button);
  });
}

if(speechEngine){
  refreshEnglishVoices();
  speechEngine.addEventListener?.('voiceschanged',refreshEnglishVoices);
  addEnglishSpeechButtons();
}
