'use strict';
const VillagePhysics = (()=>{
 // A falling object's lower edge must cross the visible rim from above.
 // Interpolate the contact point so fast frames cannot skip the narrow rim.
 function crossesBasketRim(previous,current,rim){
  const travel=current.bottom-previous.bottom;
  if(travel<=0||previous.bottom>rim.top||current.bottom<rim.top)return false;
  const t=(rim.top-previous.bottom)/travel;
  const left=previous.left+(current.left-previous.left)*t;
  const right=previous.right+(current.right-previous.right)*t;
  return Math.min(right,rim.right)>Math.max(left,rim.left);
 }
 return {crossesBasketRim};
})();
if(typeof module!=='undefined')module.exports=VillagePhysics;
