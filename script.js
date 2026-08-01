const body=document.body;
const search=document.querySelector('#search');
const theme=document.querySelector('#theme');
const expand=document.querySelector('#expand');
const fontUp=document.querySelector('#fontUp');
const fontDown=document.querySelector('#fontDown');

const savedTheme=localStorage.getItem('book-theme');
if(savedTheme==='dark')body.classList.add('dark');

theme.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('book-theme',body.classList.contains('dark')?'dark':'light');
});

expand.addEventListener('click',()=>{
  const items=[...document.querySelectorAll('details')];
  const open=items.some(x=>!x.open);
  items.forEach(x=>x.open=open);
  expand.textContent=open?'הסתר תשובות':'הצג תשובות';
});

search.addEventListener('input',()=>{
  const q=search.value.trim().toLowerCase();
  document.querySelectorAll('.chapter,.word-guide').forEach(section=>{
    section.classList.toggle('hidden-by-search',q&&!section.innerText.toLowerCase().includes(q));
  });
});

let fontScale=Number(localStorage.getItem('book-font-scale')||1);
function applyFontScale(){
  fontScale=Math.min(1.4,Math.max(.85,fontScale));
  document.documentElement.style.fontSize=`${fontScale*100}%`;
  localStorage.setItem('book-font-scale',String(fontScale));
}
applyFontScale();
fontUp.addEventListener('click',()=>{fontScale+=.1;applyFontScale();});
fontDown.addEventListener('click',()=>{fontScale-=.1;applyFontScale();});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
  if(innerWidth<850)document.querySelector('.sidebar').scrollIntoView({behavior:'smooth'});
}));
