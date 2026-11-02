'use strict';
const NightCity = (()=>{
 const cols=24,rows=18,tile=40;
 const buildings=[
 {x:1,y:1,w:5,h:4,name:'LIBRARY',color:'#405270'},
 {x:9,y:1,w:5,h:4,name:'BANK',color:'#48576e'},
 {x:16,y:1,w:4,h:4,name:'ELECTRONICS',color:'#39656c'},
 {x:1,y:7,w:4,h:4,name:'BAKERY',color:'#6c5360'},
 {x:10,y:7,w:4,h:4,name:'CAFÉ',color:'#615c79'},
 {x:16,y:7,w:3,h:4,name:'WORKSHOP',color:'#4c6160'},
 {x:1,y:15,w:5,h:2,name:'HOME',color:'#4b5a74'},
 {x:10,y:15,w:6,h:2,name:'WAREHOUSE',color:'#4a5365'}];
 function walkable(x,y){return x>=0&&y>=0&&x<cols&&y<rows&&!(x>=21&&y>=7&&y<16)&&!buildings.some(b=>x>=b.x&&x<b.x+b.w&&y>=b.y&&y<b.y+b.h);}
 function path(sx,sy,gx,gy){if(!walkable(gx,gy))return [];const q=[[sx,sy]],seen=new Set([`${sx},${sy}`]),previous=new Map();let at=0;while(at<q.length){const [x,y]=q[at++];if(x===gx&&y===gy){const result=[];let key=`${x},${y}`;while(key!==`${sx},${sy}`){result.unshift(key.split(',').map(Number));key=previous.get(key);}return result;}for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;if(walkable(nx,ny)&&!seen.has(key)){seen.add(key);previous.set(key,`${x},${y}`);q.push([nx,ny]);}}}return [];}
 const places={maya:{x:8,y:13,name:'MAYA'},shop:{x:17,y:5,name:'SHOP'},harbor:{x:20,y:13,name:'HARBOR'},beacon:{x:22,y:3,name:'LIGHTHOUSE'}};
 const missions=[
 {target:'maya',objective:'מצא את מאיה בכיכר ושאל איפה החנות',who:'MAYA / CENTRAL SQUARE',title:'הודעה בחשכה',speech:'David! The boat is coming. We need a battery and a red cable. Ask me where the electronics shop is.',translation:'דויד! הסירה מתקרבת. אנחנו צריכים סוללה וכבל אדום. שאל אותי איפה חנות האלקטרוניקה.',mode:'balloons',instructions:'לחץ על הבלון שמשלים נכון את המשפט. הבלונים נעים — אפשרויות שגויות הן מסיחים. כל סיבוב מתחיל בלחיצה שלך.',result:'Maya: Go north, then turn right at the bank. The shop is next to the café. Take these 12 coins!',resultHe:'מאיה: לך צפונה, ואז פנה ימינה ליד הבנק. החנות ליד בית הקפה. קח 12 מטבעות!',rounds:[
 {prompt:'I ___ looking for the shop.',answer:'am',wrong:['is','are'],hint:'עם I משתמשים ב־am.',meaning:'אני מחפש את החנות.'},
 {prompt:'Where is the ___ shop?',answer:'electronics',wrong:['bread','garden'],hint:'electronics = אלקטרוניקה; bread = לחם; garden = גינה.',meaning:'איפה חנות האלקטרוניקה?'},
 {prompt:'Go north, then turn ___.',answer:'right',wrong:['under','yesterday'],hint:'right = ימינה; under = מתחת; yesterday = אתמול.',meaning:'לך צפונה ואז פנה ימינה.'}]},
 {target:'shop',objective:'היכנס לחנות וקנה סוללה וכבל אדום',who:'LEO / NIGHT SHOP',title:'החנות האחרונה שפתוחה',speech:'You made it! The battery is on the top shelf. The red cable is next to it. Catch only what you need. Seven coins for the battery, five for the cable.',translation:'הגעת! הסוללה במדף העליון, והכבל האדום לידה. אסוף רק את מה שצריך. 7 מטבעות לסוללה ו־5 לכבל.',mode:'falling',instructions:'הזז את הסל בין שלושה טורים: חצים, כפתורי 1–3 או נגיעה בטור. תפוס את המילה הנכונה שנופלת; התחמק מהמילים האחרות. כל סיבוב מציג שלוש מילים.',result:'Leo: Here are your battery and red cable. The harbor gate is open. Hurry — the captain is waiting!',resultHe:'ליאו: הנה הסוללה והכבל האדום שלך. שער הנמל פתוח. מהר — הקברניט מחכה!',rounds:[
 {prompt:'Where is the ___?',answer:'battery',wrong:['bread','flower'],hint:'battery = סוללה; bread = לחם; flower = פרח.',meaning:'איפה הסוללה? היא במדף העליון.'},
 {prompt:'Pick the ___ cable.',answer:'red',wrong:['blue','green'],hint:'red = אדום; blue = כחול; green = ירוק.',meaning:'בחר את הכבל האדום.'},
 {prompt:'I ___ a battery, please.',answer:'need',wrong:['needs','needing'],hint:'עם I הפועל הוא need, ללא s.',meaning:'אני צריך סוללה, בבקשה.'},
 {prompt:'How ___ is the cable?',answer:'much',wrong:['many','where'],hint:'How much? = כמה עולה? many = רבים; where = איפה.',meaning:'כמה עולה הכבל?'}]},
 {target:'harbor',objective:'הגע לשער הנמל עם הציוד',who:'MAYA / HARBOR GATE',title:'הרוח מתחזקת',speech:'I am at the harbor! The wind is strong. Follow the right words through the gate. Stay away from the wrong ones!',translation:'אני בנמל! הרוח חזקה. עבור בשער בעקבות המילים הנכונות והתחמק מהשגויות!',mode:'side',instructions:'המילים מגיעות מצד ימין. הזז את הדמות בין שלושה נתיבים בעזרת ↑↓, כפתורי 1–3 או נגיעה בנתיב. תפוס רק את ההשלמה הנכונה ותן לשגויות לחלוף.',result:'Maya: Great! The boat is close. Take the equipment to the lighthouse. I will keep the gate open.',resultHe:'מאיה: מצוין! הסירה קרובה. קח את הציוד למגדלור. אני אשמור את השער פתוח.',rounds:[
 {prompt:'Maya ___ the red cable.',answer:'has',wrong:['have','is'],hint:'עם Maya, כמו she, משתמשים ב־has.',meaning:'הכבל האדום אצל מאיה.'},
 {prompt:'The light ___ off.',answer:'is',wrong:['are','am'],hint:'The light הוא יחיד, כמו it: is.',meaning:'האור כבוי.'},
 {prompt:'We ___ to the lighthouse.',answer:'are going',wrong:['is going','goes'],hint:'עם we: are going — אנחנו הולכים כעת.',meaning:'אנחנו הולכים למגדלור.'},
 {prompt:'I can help ___.',answer:'you',wrong:['your','yours'],hint:'you = לך / אותך; your לפני חפץ; yours = שלך.',meaning:'אני יכול לעזור לך.'}]},
 {target:'beacon',objective:'הגע למגדלור והחזר את האור',who:'THE LIGHTHOUSE / LAST SIGNAL',title:'רגע לפני שהסירה מגיעה',speech:'You have the battery. Maya has the cable. Are you ready to bring back the light?',translation:'הסוללה אצלך. הכבל אצל מאיה. אתה מוכן להחזיר את האור?',mode:'final',instructions:'בחר את התשובה שמסיימת את המשימה.',result:'The light is on. The boat is safe!',resultHe:'האור דולק. הסירה הגיעה בשלום!',rounds:[]}
 ];
 const speeds={slow:{factor:.65,seconds:330,label:'רגוע'},normal:{factor:1,seconds:240,label:'רגיל'},fast:{factor:1.4,seconds:180,label:'מהיר'}};
 const vocab=[{word:'battery',correct:'סוללה',wrong:['לחם','סירה']},{word:'harbor',correct:'נמל',wrong:['חנות','סערה']},{word:'cable',correct:'כבל',wrong:['מפה','פרח']}];
 return {cols,rows,tile,buildings,walkable,path,places,missions,speeds,vocab};
})();
if(typeof module!=='undefined')module.exports=NightCity;
