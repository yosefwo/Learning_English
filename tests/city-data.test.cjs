const assert=require('node:assert/strict');const D=require('../city-data.js');
assert.equal(D.missions.length,8);assert.equal(D.missions.flatMap(m=>m.rounds).length,78);
assert.deepEqual(D.missions.map(m=>m.chapter),[1,1,1,1,2,2,2,2]);
for(const m of D.missions){const p=D.places[m.target];assert(D.walkable(p.x,p.y));assert(m.rounds.length>=8);for(const r of m.rounds){assert.equal(new Set([r.answer,...r.wrong]).size,3);assert(r.hint&&r.meaning&&r.prompt.includes('___'));}}
const stops=[[3,13],...D.missions.map(m=>{const p=D.places[m.target];return [p.x,p.y]})];for(let i=1;i<stops.length;i++){const [sx,sy]=stops[i-1],[gx,gy]=stops[i],p=D.path(sx,sy,gx,gy);assert(p.length>0);let prev=[sx,sy];for(const point of p){assert(D.walkable(...point));assert.equal(Math.abs(point[0]-prev[0])+Math.abs(point[1]-prev[1]),1);prev=point;}assert.deepEqual(p.at(-1),[gx,gy]);}
assert.equal(D.walkable(2,2),false);assert.equal(D.walkable(22,10),false);assert.deepEqual(D.path(3,13,2,2),[]);
console.log('PASS: 8 reachable encounters, two chapters, 78 distinct sentence rounds, collisions, full village route.');
