const body=document.body;
const search=document.querySelector('#search');
const theme=document.querySelector('#theme');
const expand=document.querySelector('#expand');
const fontUp=document.querySelector('#fontUp');
const fontDown=document.querySelector('#fontDown');

const savedTheme=localStorage.getItem('book-theme');
if(savedTheme==='dark')body.classList.add('dark');

if(theme){
  theme.addEventListener('click',()=>{
    body.classList.toggle('dark');
    localStorage.setItem('book-theme',body.classList.contains('dark')?'dark':'light');
  });
}

if(expand){
  expand.addEventListener('click',()=>{
    const items=[...document.querySelectorAll('details')];
    const open=items.some(x=>!x.open);
    items.forEach(x=>x.open=open);
    expand.textContent=open?'הסתר תשובות':'הצג תשובות';
  });
}

if(search){
  search.addEventListener('input',()=>{
    const q=search.value.trim().toLowerCase();
    document.querySelectorAll('.chapter,.word-guide,.cover').forEach(section=>{
      section.classList.toggle('hidden-by-search',q&&!section.innerText.toLowerCase().includes(q));
    });
  });
}

let fontScale=Number(localStorage.getItem('book-font-scale')||1);
function applyFontScale(){
  fontScale=Math.min(1.4,Math.max(.85,fontScale));
  document.documentElement.style.fontSize=`${fontScale*100}%`;
  localStorage.setItem('book-font-scale',String(fontScale));
}
applyFontScale();
if(fontUp)fontUp.addEventListener('click',()=>{fontScale+=.1;applyFontScale();});
if(fontDown)fontDown.addEventListener('click',()=>{fontScale-=.1;applyFontScale();});

const sidebar=document.querySelector('.sidebar');
if(sidebar && !document.querySelector('a[href="part2.html"]') && location.pathname.endsWith('index.html')){
  const link=document.createElement('a');
  link.href='part2.html';
  link.textContent='חלק ב המלא – כל הזמנים →';
  link.className='part-link';
  sidebar.appendChild(link);
}

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
  if(innerWidth<850 && sidebar)sidebar.scrollIntoView({behavior:'smooth'});
}));
