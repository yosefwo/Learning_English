const vm=require('vm'),fs=require('fs'),assert=require('assert');
const root=require('path').join(__dirname,'../');let stored=null,spoken=[];
function boot(broken=false){
 const nodes={};function el(){return {hidden:false,disabled:false,dataset:{},_text:'',get textContent(){return this._text+this.children.map(x=>x.textContent).join('')},set textContent(v){this._text=v;this.children=[]},children:[],listeners:{},className:'',classList:{add(){},remove(){},toggle(){}},setAttribute(){},append(x){this.children.push(x)},replaceChildren(){this.children=[]},querySelector(s){return this.children.find(c=>c.className===s.slice(1))},addEventListener(k,f){this.listeners[k]=f},focus(){},click(){if(!this.disabled)this.listeners.click?.()}};}
 const doc={getElementById(id){return nodes[id]??=el()},querySelector(){return nodes.card??=el()},createElement:el};
 const ctx=vm.createContext({document:doc,window:{addEventListener(){},speechSynthesis:{cancel(){},getVoices(){return []},speak(u){spoken.push(u.text)}}},SpeechSynthesisUtterance:function(t){this.text=t},localStorage:{getItem(){if(broken)throw Error();return stored},setItem(k,v){if(broken)throw Error();stored=v}},confirm:()=>true,setTimeout:f=>{f();return 1},clearTimeout(){},console});
 vm.runInContext(fs.readFileSync(root+'game-data.js','utf8')+'\nthis.stages=GAME_STAGES;',ctx);vm.runInContext(fs.readFileSync(root+'game.js','utf8'),ctx);return {ctx,nodes};
}
let {ctx,nodes}=boot();const turns=ctx.stages.flatMap(s=>s.turns);assert.equal(turns.length,32);
for(let i=0;i<turns.length;i++){
 const t=turns[i];assert.equal(new Set([t.answer,...t.wrong]).size,3);assert(t.answerTranslation&&t.outcome&&t.wrongTranslations.length===2);assert.equal(spoken.at(-1),t.speech,'auto read each prompt');
 assert(nodes.answers.children.every(b=>!b.querySelector('.answer-translation')),'hide translations before answer');
 if(i===0){nodes.answers.children.find(b=>b.dataset.answer===t.wrong[0]).click();assert(nodes.answers.children.every(b=>b.querySelector('.answer-translation')));({ctx,nodes}=boot());assert(nodes.answers.children.every(b=>b.querySelector('.answer-translation')));}
 if(i===1)nodes.hint.click();
 nodes.answers.children.find(b=>b.dataset.answer===t.answer).click();assert.equal(spoken.at(-1),t.answer);assert(nodes.answers.children.every(b=>b.querySelector('.answer-translation')));assert.equal(nodes.result.textContent,t.outcome);
 const before=JSON.parse(stored).score;nodes.answers.children.find(b=>b.dataset.answer===t.answer).click();assert.equal(JSON.parse(stored).score,before);
 if(i===0){({ctx,nodes}=boot());assert.equal(nodes.score.textContent,4);assert.equal(nodes.next.hidden,false);assert(nodes.answers.children.every(b=>b.querySelector('.answer-translation')));}
 nodes.next.click();
}
assert.equal(JSON.parse(stored).score,311);assert.equal(nodes.ending.hidden,false);({ctx,nodes}=boot());nodes.replay.click();assert.equal(JSON.parse(stored).score,0);assert.equal(JSON.parse(stored).best,311);
nodes.sound.click();const before=spoken.length;nodes.answers.children.find(b=>b.dataset.answer===turns[0].answer).click();nodes.next.click();assert.equal(spoken.length,before,'mute respected');
({nodes}=boot(true));assert(nodes['save-status'].textContent.includes('אינה זמינה'));stored='{bad';({nodes}=boot());assert.equal(nodes.score.textContent,0);
console.log('PASS: 32 story turns; auto speech on every next/station; mute; all translations after wrong/correct/reload; outcome; scoring; finish/replay; blocked/corrupt storage.');
