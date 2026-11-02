const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');let saved=null;
function boot(){const nodes={},groups={},events={};let frame,time=0;
 function element(){return {children:[],hidden:false,disabled:false,textContent:'',style:{},dataset:{},className:'',classList:{add(){},remove(){},toggle(){}},append(b){this.children.push(b);b.parent=this;},replaceChildren(){this.children=[];},remove(){this.parent.children=this.parent.children.filter(b=>b!==this);},setAttribute(){},focus(){},getClientRects(){return [{}]},querySelectorAll(s){return s==='.word-token'?this.children.filter(b=>b.className.includes('word-token')):this.children;},addEventListener(k,f){this['on'+k]=f;},getContext(){return new Proxy({},{get:()=>()=>{}})},matches(){return false;},click(){if(!this.disabled)this.onclick?.();}};}
 const get=id=>nodes[id]??=element();groups['[data-go]']=['maya','shop','harbor','beacon'].map(go=>{const e=element();e.dataset.go=go;return e;});groups['[data-lane]']=[0,1,2].map(lane=>{const e=element();e.dataset.lane=lane;return e;});groups['[data-move]']=[];groups.ruby=[];get('difficulty').value='normal';get('questList').children=[element(),element(),element()];
 const document={hidden:false,body:element(),getElementById:get,createElement:element,querySelectorAll:s=>groups[s]||[],addEventListener(k,f){events[k]=f;}};
 const context=vm.createContext({document,window:{addEventListener(){},scrollTo(){},speechSynthesis:{cancel(){},getVoices(){return []},speak(){}}},SpeechSynthesisUtterance:function(t){this.text=t},setInterval(){return 1},setTimeout(){return 1},requestAnimationFrame(f){frame=f},localStorage:{getItem(){return saved},setItem(k,v){saved=v}},confirm:()=>true,console});
 const root=path.join(__dirname,'../');vm.runInContext(fs.readFileSync(root+'city-data.js','utf8')+'\nthis.data=NightCity;',context);vm.runInContext(fs.readFileSync(root+'city.js','utf8'),context);
 function pump(n){for(let i=0;i<n;i++){time+=50;frame(time);}}
 return {nodes,groups,events,context,pump};}
let b=boot();const click=id=>b.nodes[id].click();click('start');b.groups['[data-go]'][0].click();b.pump(50);assert.equal(b.nodes.overlay.hidden,false);assert.equal(b.nodes.dialogTitle.textContent,'הודעה בחשכה');
for(let stage=0;stage<3;stage++){
 if(stage){click('dialogAction');b.groups['[data-go]'][stage].click();b.pump(400);assert.equal(b.nodes.overlay.hidden,false);}
 click('dialogAction');
 for(let round=0;round<b.context.data.missions[stage].rounds.length;round++){
  const r=b.context.data.missions[stage].rounds[round];click('dialogAction');
  const words=b.nodes.field.children.filter(el=>el.className.includes('word-token'));
  const i=words.findIndex(el=>el.textContent===r.answer);assert(i>=0);
  if(stage===0){words[i].click();}
  else {
   // Pausing must freeze both clock and word motion.
   click('dialogPause');const clock=b.nodes.clock.textContent,top=words[i].style.top;b.pump(50);assert.equal(b.nodes.clock.textContent,clock);assert.equal(words[i].style.top,top);click('dialogPause');
   if(stage===1&&round===0){b.groups['[data-lane]'][(i+1)%3].click();b.pump(110);assert(b.nodes.dialogFeedback.textContent.includes('עוד ניסיון'));assert.equal(b.nodes.shields.textContent,'◆◆◆◆◇');click('dialogAction');click('dialogAction');const retryWords=b.nodes.field.children.filter(el=>el.className.includes('word-token'));b.groups['[data-lane]'][retryWords.findIndex(el=>el.textContent===r.answer)].click();}
   else b.groups['[data-lane]'][i].click();
   b.pump(140);
  }
  assert(b.nodes.dialogFeedback.textContent.startsWith('✓'),`stage ${stage} round ${round}: ${b.nodes.dialogFeedback.textContent}`);click('dialogAction');
 }
 assert(b.nodes.dialogEnglish.textContent.includes(b.context.data.missions[stage].result));assert.equal(JSON.parse(saved).stage,stage+1);
}
assert.deepEqual(JSON.parse(saved).inventory,['סוללה','כבל אדום']);assert.equal(JSON.parse(saved).coins,0);
// Reload from the stage checkpoint, walk to the lighthouse and finish.
b=boot();assert.equal(b.nodes.continue.hidden,false);b.nodes.continue.click();b.groups['[data-go]'][3].click();b.pump(400);click('dialogAction');b.nodes.dialogBody.children[0].click();assert.equal(b.nodes.complete.hidden,false);assert.equal(JSON.parse(saved).stage,4);
console.log('PASS: end-to-end city mission; real falling/side collisions; wrong hit/retry; pause freezes clock/tokens; inventory/budget; reload checkpoint; lighthouse finish.');
