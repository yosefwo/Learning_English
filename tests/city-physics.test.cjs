const assert=require('node:assert/strict'),P=require('../city-physics');
const box=(left,right,bottom)=>({left,right,bottom});const rim={left:100,right:174,top:300};
assert(!P.crossesBasketRim(box(110,150,280),box(110,150,299.99),rim),'no early catch');
assert(P.crossesBasketRim(box(110,150,299),box(110,150,300),rim),'exact lower-edge/top-edge touch');
assert(P.crossesBasketRim(box(110,150,300),box(110,150,301),rim),'contact at previous frame');
assert(!P.crossesBasketRim(box(110,150,301),box(110,150,320),rim),'already below rim cannot be caught');
assert(!P.crossesBasketRim(box(175,220,290),box(175,220,310),rim),'no horizontal overlap');
assert(!P.crossesBasketRim(box(174,220,290),box(174,220,310),rim),'side edge grazing is not a catch');
assert(P.crossesBasketRim(box(173,220,290),box(173,220,310),rim),'one-pixel overlap catches');
assert(P.crossesBasketRim(box(110,150,200),box(110,150,400),rim),'fast frames do not tunnel through rim');
assert(!P.crossesBasketRim(box(110,150,310),box(110,150,290),rim),'rising objects do not catch');
assert(!P.crossesBasketRim(box(110,150,300),box(110,150,300),rim),'paused objects do not catch');
assert(P.crossesBasketRim(box(70,110,290),box(110,150,310),rim),'horizontal position interpolated at contact');
for(const width of [320,600,720])for(const wordHeight of [44,72,96]){
 const basketTop=width*.6*.88-19.5-2;
 const center=basketTop-wordHeight/2;
 assert(P.crossesBasketRim(box(100,165,center-1+wordHeight/2),box(100,165,center+1+wordHeight/2),{left:95,right:170,top:basketTop}));
}
console.log('PASS: exact rim contact, no premature/late/side catches, high-speed swept collision, mobile widths and wrapped words.');
