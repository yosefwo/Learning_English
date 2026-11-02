const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');let saved=null;
function boot(noSpeech=false){const nodes={},groups={},events={},timers=new Map(),spoken=[];let frame,time=0,timerId=0;
 function element(){return {children:[],hidden:false,disabled:false,textContent:'',style:{},dataset:{},className:'',classList:{add(){},remove(){},toggle(){}},append(b){this.children.push(b);b.parent=this;},replaceChildren(){this.children=[];},remove(){this.parent.children=this.parent.children.filter(b=>b!==this);},setAttribute(){},focus(){},getClientRects(){return [{}]},querySelectorAll(s){return s==='.word-token'?this.children.filter(b=>b.className.includes('word-token')):this.children;},addEventListener(k,f){this['on'+k]=f;},getContext(){return new Proxy({},{get:()=>()=>{}})},matches(){return false;},click(){if(!this.disabled)this.onclick?.();}};}
 const get=id=>nodes[id]??=element();const D=require('../city-data.js');groups['[data-go]']=Object.keys(D.places).map(go=>{const e=element();e.dataset.go=go;return e;});groups['[data-lane]']=[0,1,2].map(lane=>{const e=element();e.dataset.lane=lane;return e;});groups['[data-move]']=[];groups.ruby=[];get('difficulty').value='normal';get('questList').children=[element(),element(),element()];
 const schedule=(fn,ms)=>{timers.set(++timerId,{fn,due:time+ms});return timerId;};
 const document={hidden:false,body:element(),getElementById:get,createElement:element,querySelectorAll:s=>groups[s]||[],addEventListener(k,f){events[k]=f;}};
 const synth={cancel(){},getVoices(){return []},speak(u){spoken.push(u.text);if(!noSpeech)schedule(()=>u.onend?.(),150);}};
 const context=vm.createContext({document,window:{addEventListener(){},scrollTo(){},speechSynthesis:synth},SpeechSynthesisUtterance:function(t){this.text=t},setInterval(){return 1},setTimeout:schedule,clearTimeout:id=>timers.delete(id),requestAnimationFrame(f){frame=f},localStorage:{getItem(){return saved},setItem(k,v){saved=v}},confirm:()=>true,console});
 const root=path.join(__dirname,'../');vm.runInContext(fs.readFileSync(root+'city-data.js','utf8')+'\nthis.data=NightCity;',context);vm.runInContext(fs.readFileSync(root+'city.js','utf8'),context);
 function pump(n){for(let i=0;i<n;i++){time+=50;for(const [id,t] of [...timers])if(t.due<=time){timers.delete(id);t.fn();}frame(time);}}
 return {nodes,groups,events,context,pump,spoken};}
let b=boot();const click=id=>b.nodes[id].click();click('start');
for(let stage=0;stage<8;stage++){
 const m=b.context.data.missions[stage];if(stage)click('dialogAction');b.groups['[data-go]'][stage].click();b.pump(500);assert.equal(b.nodes.dialogTitle.textContent,m.title);click('dialogAction');
 let complete=0,guard=0;
 // Play the actual collision loop, steering away from earlier decoys into the later correct word.
 while(complete<m.rounds.length&&guard++<7000){
  const words=b.nodes.field.children.filter(el=>el.className.includes('word-token')&&!el.disabled&&el.style.visibility!=='hidden');const r=m.rounds[complete];
  if(m.mode==='balloons'){const w=words.find(el=>el.textContent===r.answer);if(w)w.click();}
  else if(words.length){
   const relevant=words.map(el=>({el,lane:Math.round((parseFloat(m.mode==='falling'?el.style.left:el.style.top)/100)*3-.5),progress:parseFloat(m.mode==='falling'?el.style.top:el.style.left)}));
   const danger=relevant.filter(t=>t.el.textContent!==r.answer&&(m.mode==='falling'?t.progress>74&&t.progress<100:t.progress<27&&t.progress>5)).map(t=>t.lane);
   const correct=relevant.find(t=>t.el.textContent===r.answer);let target=correct?.lane??1;if(danger.includes(target))target=[0,1,2].find(l=>!danger.includes(l))??target;
   b.groups['[data-lane]'][target]?.click();
  }
  b.pump(1);
  // Completion feedback has a filled English sentence; next question starts automatically.
  if(b.nodes.dialogFeedback.textContent.startsWith('✓')){complete++;const clock=b.nodes.clock.textContent;click('dialogPause');b.pump(40);assert.equal(b.nodes.clock.textContent,clock);click('dialogPause');b.pump(1);}
 }
 assert.equal(complete,m.rounds.length,`stage ${stage}`);b.pump(100);assert.equal(JSON.parse(saved).stage,stage+1);
 if(stage===1){assert.deepEqual(JSON.parse(saved).inventory,['קמח','תפוחים','קבלה']);assert.equal(JSON.parse(saved).coins,0);}
 if(stage===3){assert.equal(b.nodes.dialogTitle.textContent,'מישהו חתם. מי?');assert(b.nodes.chapterLabel.textContent.includes('2'));}
}
assert.equal(b.nodes.complete.hidden,false);assert(b.spoken.some(t=>t==='I am here to help.'));
// Reload completed two-chapter save without starting over.
b=boot();b.nodes.continue.click();assert.equal(b.nodes.complete.hidden,false);
// Speech engine that never fires end still advances by the bounded fallback.
saved=null;b=boot(true);click('start');b.groups['[data-go]'][0].click();b.pump(500);click('dialogAction');b.pump(150);assert(b.nodes.field.children.some(e=>e.className.includes('word-token')));
console.log('PASS: 78 continuous sentence rounds; real decoy avoidance and catch collisions; pause during automatic transitions; chapter 2; purchase inventory; finish/reload; speech fallback.');
