const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');let saved=null,musicPref=null,speedPref=null;
function boot(noSpeech=false){const nodes={},groups={},events={},timers=new Map(),spoken=[],utterances=[];let frame,time=0,timerId=0;
 function element(){return {children:[],hidden:false,disabled:false,textContent:'',style:{},dataset:{},className:'',classList:{set:new Set(),add(c){this.set.add(c)},remove(c){this.set.delete(c)},contains(c){return this.set.has(c)},toggle(c,v){if(v??!this.set.has(c))this.set.add(c);else this.set.delete(c)}},append(b){this.children.push(b);b.parent=this;},replaceChildren(){this.children=[];},remove(){this.parent.children=this.parent.children.filter(b=>b!==this);},setAttribute(){},focus(){},getClientRects(){return [{}]},getBoundingClientRect(){const field={left:0,top:0,right:600,bottom:360,width:600,height:360};if(this.id==='field')return field;if(this.className==='basket-rim'){const r=nodes.catcher.getBoundingClientRect();return {left:r.left-2,right:r.right+2,top:r.top-2,bottom:r.top+5,width:r.width+4,height:7};}const width=this.id==='catcher'?74:80,height=this.id==='catcher'?39:48;const x=parseFloat(this.style.left||'0')/100*field.width,y=parseFloat(this.style.top||'0')/100*field.height;return {left:x-width/2,right:x+width/2,top:y-height/2,bottom:y+height/2,width,height};},querySelectorAll(s){return s==='.word-token'||s==='.reading-word'?this.children.filter(b=>b.className.includes(s.slice(1))):this.children;},addEventListener(k,f){this['on'+k]=f;},getContext(){return new Proxy({},{get:()=>()=>{}})},matches(){return false;},click(){if(!this.disabled)this.onclick?.();}};}
 const get=id=>{const e=nodes[id]??=element();e.id=id;return e;};const D=require('../city-data.js');groups['[data-go]']=Object.keys(D.places).map(go=>{const e=element();e.dataset.go=go;return e;});groups['[data-lane]']=[0,1,2].map(lane=>{const e=element();e.dataset.lane=lane;return e;});groups['[data-move]']=[];groups.ruby=[];get('difficulty').value='normal';get('questList').children=[element(),element(),element()];
 const schedule=(fn,ms)=>{timers.set(++timerId,{fn,due:time+ms});return timerId;};
 const document={hidden:false,body:element(),getElementById:get,createElement:element,createTextNode(text){const e=element();e.textContent=text;return e;},querySelectorAll:s=>groups[s]||[],addEventListener(k,f){events[k]=f;}};
 const synth={cancel(){},getVoices(){return []},speak(u){spoken.push(u.text);utterances.push(u);if(!noSpeech)schedule(()=>u.onend?.(),150);}};
 function Audio(){this.currentTime=0;this.state='running';this.destination={};this.createGain=()=>({gain:{value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}});this.createOscillator=()=>({frequency:{value:0},connect(){},start(){},stop(){}});this.resume=()=>Promise.resolve();this.suspend=()=>Promise.resolve();}
 const context=vm.createContext({document,window:{addEventListener(){},scrollTo(){},speechSynthesis:synth,AudioContext:Audio},SpeechSynthesisUtterance:function(t){this.text=t},setInterval(){return 1},setTimeout:schedule,clearTimeout:id=>timers.delete(id),requestAnimationFrame(f){frame=f},localStorage:{getItem(k){return k==='village-music-enabled'?musicPref:k==='village-speed-percent'?speedPref:saved},setItem(k,v){if(k==='village-music-enabled')musicPref=v;else if(k==='village-speed-percent')speedPref=v;else saved=v}},confirm:()=>true,console});
 const root=path.join(__dirname,'../');vm.runInContext(fs.readFileSync(root+'city-data.js','utf8')+'\nthis.data=NightCity;',context);vm.runInContext(fs.readFileSync(root+'city-language.js','utf8'),context);vm.runInContext(fs.readFileSync(root+'city-physics.js','utf8'),context);vm.runInContext(fs.readFileSync(root+'city.js','utf8'),context);
 function pump(n){for(let i=0;i<n;i++){time+=50;for(const [id,t] of [...timers])if(t.due<=time){timers.delete(id);t.fn();}frame(time);}}
 return {nodes,groups,events,context,pump,spoken,utterances};}
let b=boot();assert.equal(b.nodes.gameSpeed.value,'60');assert.equal(b.nodes.difficulty.value,'slow');const click=id=>b.nodes[id].click();click('start');
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
 const review=(stage===7?b.nodes.endingReview:b.nodes.dialogBody).children[0];assert.equal(review.className,'challenge-review');const rows=review.children[1].children;assert.equal(rows.length,m.rounds.length);rows.forEach((row,i)=>{assert.equal(row.children[0].children.map(e=>e.textContent).join(''),m.rounds[i].prompt.replace('___',m.rounds[i].answer));assert.equal(row.children[1].textContent,m.rounds[i].meaning);});
 if(stage===1){assert.deepEqual(JSON.parse(saved).inventory,['קמח','תפוחים','קבלה']);assert.equal(JSON.parse(saved).coins,0);}
 if(stage===3){assert.equal(b.nodes.dialogTitle.textContent,'מישהו חתם. מי?');assert(b.nodes.chapterLabel.textContent.includes('2'));}
}
assert.equal(b.nodes.complete.hidden,false);assert(b.spoken.some(t=>t==='I hmm here to help.'));
// Reload completed two-chapter save without starting over.
b=boot();b.nodes.continue.click();assert.equal(b.nodes.complete.hidden,false);
// Speech engine that never fires end still advances by the bounded fallback.
saved=null;b=boot(true);click('start');b.groups['[data-go]'][0].click();b.pump(500);click('dialogAction');b.pump(150);assert(b.nodes.field.children.some(e=>e.className.includes('word-token')));
saved=null;b=boot();click('start');b.groups['[data-go]'][0].click();b.pump(500);click('dialogAction');const spokenQuestion=b.utterances.at(-1);assert.equal(spokenQuestion.text,'I hmm here to help.');spokenQuestion.onboundary({name:'word',charIndex:2});const blank=b.nodes.challengePrompt.children.find(el=>el.textContent==='___');assert(blank.classList.contains('reading-now'));click('dialogStop');assert(!blank.classList.contains('reading-now'));b.pump(200);assert.equal(b.nodes.field.children.filter(e=>e.className.includes('word-token')).length,0);assert(b.nodes.roundStatus.textContent.includes('נעצרה'));click('dialogRead');b.pump(10);assert(b.nodes.field.children.some(e=>e.className.includes('word-token')));assert(b.spoken.at(-1).includes('hmm'));assert(!b.spoken.at(-1).includes('am here'));
 // Every marked word opens a translation without losing game time.
 const word=b.nodes.challengePrompt.children.find(el=>el.textContent==='help');word.click();assert.equal(b.nodes.glossary.hidden,false);assert.equal(b.nodes.glossWord.textContent,'help');assert(b.nodes.glossMeaning.textContent.includes('לעזור'));const heldClock=b.nodes.clock.textContent;b.pump(40);assert.equal(b.nodes.clock.textContent,heldClock);click('glossClose');assert.equal(b.nodes.glossary.hidden,true);
 // Music is available during challenges; the choice is saved and shared by both controls.
 click('dialogMusic');assert.equal(musicPref,'true');assert(b.nodes.music.textContent.includes('כבה'));click('music');assert.equal(musicPref,'false');assert(b.nodes.dialogMusic.textContent.includes('הפעל'));
 // Live speed changes synchronize sliders and persist independently of checkpoints.
 b.nodes.dialogSpeed.value='45';b.nodes.dialogSpeed.oninput();assert.equal(speedPref,'45');assert.equal(b.nodes.gameSpeed.value,'45');assert.equal(b.nodes.dialogSpeedValue.textContent,'45%');b=boot();assert.equal(b.nodes.gameSpeed.value,'45');b.nodes.difficulty.value='normal';b.nodes.difficulty.onchange();assert.equal(speedPref,'85');assert.equal(b.nodes.dialogSpeed.value,'85');
 console.log('PASS: 78 continuous sentence rounds; real decoy avoidance and catch collisions; pause during automatic transitions; chapter 2; purchase inventory; finish/reload; speech fallback.');
