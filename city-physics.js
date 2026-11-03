'use strict';
const VillagePhysics = (()=>{
 // Detect the instant the falling object's bottom edge reaches the basket's top.
 // Using the previous and current rectangles prevents fast frames skipping contact.
 function crossesBasketRim(previous,current,basket){
  if(!previous||!current||!basket)return false;
  const travel=current.bottom-previous.bottom;
  if(travel<=0||previous.bottom>basket.top||current.bottom<basket.top)return false;
  const t=(basket.top-previous.bottom)/travel;
  const left=previous.left+(current.left-previous.left)*t;
  const right=previous.right+(current.right-previous.right)*t;
  // The bottom horizontal edge must overlap the top horizontal edge of the basket.
  return left<=basket.right&&right>=basket.left;
 }
 return {crossesBasketRim};
})();
if(typeof module!=='undefined')module.exports=VillagePhysics;
