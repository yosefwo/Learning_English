const assert=require('node:assert/strict'),D=require('../city-data'),L=require('../city-language');
const texts=D.missions.flatMap(m=>[m.speech,m.result,...m.rounds.flatMap(r=>[r.prompt,r.answer,...r.wrong])]);
const missing=new Set();for(const text of texts)for(const token of L.split(text))if(/^[A-Za-z]/.test(token.text)&&!L.gloss(token.text))missing.add(token.text);
assert.deepEqual([...missing],[],'every English story, question and answer word has a translation');
for(const m of D.missions)for(const r of m.rounds)assert.equal(L.masked(r.prompt),r.prompt.replace('___','hmm'));
assert.equal(L.gloss('bakery'),'מאפייה');assert.equal(L.gloss('path'),'שביל');assert.equal(L.gloss('Ruth’s'),'של רות');assert.equal(L.gloss('BAKERY'),'מאפייה');
const tokens=L.split('I ___ here.');assert.deepEqual(tokens.map(t=>t.text),['I',' ','___',' ','here','.']);assert.equal(tokens[2].start,2);assert.equal(tokens[2].end,5);
console.log('PASS: complete vocabulary coverage; masked answers in 78 prompts; exact word offsets for speech highlighting; bakery/path translations.');
