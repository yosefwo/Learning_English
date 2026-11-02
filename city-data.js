'use strict';
const NightCity = (()=>{
 const cols=24,rows=18,tile=40;
 const buildings=[
 {x:1,y:1,w:5,h:4,name:'SCHOOL',color:'#405270'},
 {x:9,y:1,w:5,h:4,name:'BAKERY',color:'#48576e'},
 {x:16,y:1,w:4,h:4,name:'MARKET',color:'#39656c'},
 {x:1,y:7,w:4,h:4,name:'ORCHARD',color:'#6c5360'},
 {x:10,y:7,w:4,h:4,name:'VILLAGE HALL',color:'#615c79'},
 {x:16,y:7,w:3,h:4,name:'OLD MILL',color:'#4c6160'},
 {x:1,y:15,w:5,h:2,name:'HOME',color:'#4b5a74'},
 {x:10,y:15,w:6,h:2,name:'DELIVERY YARD',color:'#4a5365'}];
 function walkable(x,y){return x>=0&&y>=0&&x<cols&&y<rows&&!(x>=21&&y>=7&&y<16)&&!buildings.some(b=>x>=b.x&&x<b.x+b.w&&y>=b.y&&y<b.y+b.h);}
 function path(sx,sy,gx,gy){if(!walkable(gx,gy))return [];const q=[[sx,sy]],seen=new Set([`${sx},${sy}`]),previous=new Map();let at=0;while(at<q.length){const [x,y]=q[at++];if(x===gx&&y===gy){const result=[];let key=`${x},${y}`;while(key!==`${sx},${sy}`){result.unshift(key.split(',').map(Number));key=previous.get(key);}return result;}for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;if(walkable(nx,ny)&&!seen.has(key)){seen.add(key);previous.set(key,`${x},${y}`);q.push([nx,ny]);}}}return [];}
 const places={square:{x:8,y:13,name:'MAYA'},market:{x:17,y:5,name:'ANNA'},school:{x:5,y:6,name:'TOM'},yard:{x:12,y:14,name:'LEO'},orchard:{x:5,y:10,name:'RUTH'},mill:{x:18,y:6,name:'ELI'},bridge:{x:20,y:12,name:'MAYA'},hall:{x:12,y:11,name:'ANNA'}};
 const missions=[
  {
    "target": "square",
    "chapter": 1,
    "title": "היריד חייב להיפתח",
    "who": "MAYA · VILLAGE SQUARE",
    "objective": "פגוש את מאיה בכיכר",
    "speech": "David! You came to visit on a busy day. Our village fair opens at six. We are raising money to fix the school roof. Anna needs help at the bakery. Can you find the market for her?",
    "translation": "דויד, הגעת לביקור ביום עמוס. היריד נפתח בשש ואנחנו מגייסים כסף לתיקון גג בית הספר. אנה צריכה עזרה במאפייה. תוכל למצוא עבורה את השוק?",
    "mode": "balloons",
    "result": "Maya: Follow the path past the bakery. Anna is waiting at the market. Here are eighteen coins. Please bring the receipt.",
    "resultHe": "מאיה נותנת לך 18 מטבעות: ״לך בשביל שעובר ליד המאפייה. אנה מחכה בשוק. ואל תשכח קבלה — אנחנו צריכים לרשום כל הוצאה של היריד״.",
    "rounds": [
      {
        "prompt": "I ___ here to help.",
        "answer": "am",
        "wrong": [
          "is",
          "are"
        ],
        "meaning": "אני כאן כדי לעזור.",
        "hint": "עם I משתמשים ב־am."
      },
      {
        "prompt": "Where ___ the market?",
        "answer": "is",
        "wrong": [
          "are",
          "am"
        ],
        "meaning": "איפה השוק?",
        "hint": "השוק הוא יחיד: is."
      },
      {
        "prompt": "Can you help ___ find it?",
        "answer": "me",
        "wrong": [
          "my",
          "mine"
        ],
        "meaning": "תוכלי לעזור לי למצוא אותו?",
        "hint": "אחרי help צריך מושא: me."
      },
      {
        "prompt": "Anna is at the market. ___ is waiting for me.",
        "answer": "She",
        "wrong": [
          "He",
          "They"
        ],
        "meaning": "אנה בשוק. היא מחכה לי.",
        "hint": "על אנה משתמשים ב־she."
      },
      {
        "prompt": "I can carry ___ basket.",
        "answer": "your",
        "wrong": [
          "you",
          "yours"
        ],
        "meaning": "אני יכול לשאת את הסל שלך.",
        "hint": "לפני basket צריך תואר שייכות: your."
      },
      {
        "prompt": "The bakery is ___ the school.",
        "answer": "near",
        "wrong": [
          "yesterday",
          "them"
        ],
        "meaning": "המאפייה קרובה לבית הספר.",
        "hint": "near = ליד, קרוב."
      },
      {
        "prompt": "We ___ eighteen coins.",
        "answer": "have",
        "wrong": [
          "has",
          "is"
        ],
        "meaning": "יש לנו שמונה־עשר מטבעות.",
        "hint": "עם we משתמשים ב־have."
      },
      {
        "prompt": "Thank you! I ___ find Anna now.",
        "answer": "will",
        "wrong": [
          "was",
          "did"
        ],
        "meaning": "תודה! אלך למצוא את אנה עכשיו.",
        "hint": "החלטה עכשיו: will + פועל בסיסי."
      }
    ]
  },
  {
    "target": "market",
    "chapter": 1,
    "title": "הרשימה של אנה",
    "who": "ANNA · VILLAGE MARKET",
    "objective": "קנה קמח ותפוחים לעוגות של היריד",
    "speech": "The apple cakes always sell first. But I have no flour left! Please buy flour for six coins and apples for twelve. The flour is by the bread. Ask Sam which apples are fresh.",
    "translation": "עוגות התפוחים תמיד נמכרות ראשונות, אבל הקמח נגמר. קנה קמח ב־6 מטבעות ותפוחים ב־12. הקמח ליד הלחם. שאל את סם אילו תפוחים טריים.",
    "mode": "falling",
    "result": "Anna: Thank you! Take the flour and apples to Tom at the school kitchen. I will start the oven.",
    "resultHe": "אנה מוסרת לך את הקבלה. ״תביא את המצרכים לטום במטבח בית הספר, ואני אדליק את התנור״. על הדלפק מונח פתק משלוח כחול שאיש לא אסף.",
    "rounds": [
      {
        "prompt": "Where is the ___, please?",
        "answer": "flour",
        "wrong": [
          "flower",
          "floor"
        ],
        "meaning": "איפה הקמח, בבקשה?",
        "hint": "flour = קמח; flower = פרח; floor = רצפה."
      },
      {
        "prompt": "I need some ___ for the cakes.",
        "answer": "apples",
        "wrong": [
          "onions",
          "cables"
        ],
        "meaning": "אני צריך תפוחים לעוגות.",
        "hint": "apples = תפוחים."
      },
      {
        "prompt": "Are ___ apples fresh?",
        "answer": "these",
        "wrong": [
          "this",
          "that"
        ],
        "meaning": "התפוחים האלה טריים?",
        "hint": "עם שם עצם ברבים משתמשים ב־these."
      },
      {
        "prompt": "How ___ is the flour?",
        "answer": "much",
        "wrong": [
          "many",
          "where"
        ],
        "meaning": "כמה עולה הקמח?",
        "hint": "How much = כמה עולה."
      },
      {
        "prompt": "The flour ___ six coins.",
        "answer": "costs",
        "wrong": [
          "cost",
          "are"
        ],
        "meaning": "הקמח עולה שישה מטבעות.",
        "hint": "flour הוא יחיד: costs."
      },
      {
        "prompt": "I would ___ twelve apples.",
        "answer": "like",
        "wrong": [
          "likes",
          "liked"
        ],
        "meaning": "הייתי רוצה שנים־עשר תפוחים.",
        "hint": "would like = הייתי רוצה."
      },
      {
        "prompt": "Please put ___ in my basket.",
        "answer": "them",
        "wrong": [
          "they",
          "their"
        ],
        "meaning": "בבקשה שים אותם בסל שלי.",
        "hint": "מושא ברבים: them."
      },
      {
        "prompt": "This basket is ___.",
        "answer": "mine",
        "wrong": [
          "my",
          "me"
        ],
        "meaning": "הסל הזה שלי.",
        "hint": "mine עומדת לבדה: שלי."
      },
      {
        "prompt": "Can I have the ___, please?",
        "answer": "receipt",
        "wrong": [
          "recipe",
          "roof"
        ],
        "meaning": "אפשר לקבל את הקבלה?",
        "hint": "receipt = קבלה; recipe = מתכון."
      },
      {
        "prompt": "I ___ all eighteen coins.",
        "answer": "paid",
        "wrong": [
          "pay",
          "paying"
        ],
        "meaning": "שילמתי את כל שמונה־עשר המטבעות.",
        "hint": "paid היא צורת העבר של pay."
      }
    ]
  },
  {
    "target": "school",
    "chapter": 1,
    "title": "שני הארגזים שלא הגיעו",
    "who": "TOM · SCHOOL KITCHEN",
    "objective": "מסור את המצרכים לטום וברר מה חסר",
    "speech": "Great, the cakes can go in the oven. But Ruth’s plants are still missing. Two blue boxes should be here by now. They are the main prize in the fair. Leo brought the deliveries this morning. Will you ask him?",
    "translation": "מצוין, אפשר להכין את העוגות. אבל השתילים של רות עדיין חסרים — שני ארגזים כחולים שהיו אמורים להגיע, והם הפרס המרכזי ביריד. ליאו הביא את המשלוחים הבוקר. תוכל לשאול אותו?",
    "mode": "side",
    "result": "Tom: Leo is at the delivery yard. Take this blue note. The number on it may help him find our boxes.",
    "resultHe": "טום לוקח את המצרכים ונותן לך פתק כחול: משלוח 24, שני ארגזים. ליד החתימה יש כתם גשם. העוגות כבר בתנור, אבל בלי השתילים לא יהיה הפרס שהובטח.",
    "rounds": [
      {
        "prompt": "Here ___ the apples and flour.",
        "answer": "are",
        "wrong": [
          "is",
          "am"
        ],
        "meaning": "הנה התפוחים והקמח.",
        "hint": "כמה מצרכים יחד: are."
      },
      {
        "prompt": "Anna ___ starting the oven.",
        "answer": "is",
        "wrong": [
          "are",
          "am"
        ],
        "meaning": "אנה מתחילה להפעיל את התנור.",
        "hint": "עם Anna כמו she: is."
      },
      {
        "prompt": "I bought the flour for ___.",
        "answer": "her",
        "wrong": [
          "she",
          "hers"
        ],
        "meaning": "קניתי את הקמח בשבילה.",
        "hint": "אחרי for צריך מושא: her."
      },
      {
        "prompt": "How many boxes are ___?",
        "answer": "missing",
        "wrong": [
          "miss",
          "misses"
        ],
        "meaning": "כמה ארגזים חסרים?",
        "hint": "missing = חסרים."
      },
      {
        "prompt": "Two blue boxes ___ not here.",
        "answer": "are",
        "wrong": [
          "is",
          "has"
        ],
        "meaning": "שני ארגזים כחולים לא כאן.",
        "hint": "boxes הוא רבים: are."
      },
      {
        "prompt": "Who ___ the boxes this morning?",
        "answer": "brought",
        "wrong": [
          "bring",
          "brings"
        ],
        "meaning": "מי הביא את הארגזים הבוקר?",
        "hint": "פעולה שכבר קרתה: brought."
      },
      {
        "prompt": "I will ask ___ about the delivery.",
        "answer": "him",
        "wrong": [
          "he",
          "his"
        ],
        "meaning": "אשאל אותו על המשלוח.",
        "hint": "מושא: him."
      },
      {
        "prompt": "Please give ___ the blue note.",
        "answer": "me",
        "wrong": [
          "I",
          "mine"
        ],
        "meaning": "בבקשה תן לי את הפתק הכחול.",
        "hint": "give me = תן לי."
      }
    ]
  },
  {
    "target": "yard",
    "chapter": 1,
    "title": "החתימה בכתם הגשם",
    "who": "LEO · DELIVERY YARD",
    "objective": "מצא את ליאו ובדוק את פתק המשלוח",
    "speech": "I remember the blue boxes. It started raining when I reached the bridge. The school gate was locked, so someone offered a dry place. I wrote the name here... but the ink is gone. Ruth may know who it was.",
    "translation": "אני זוכר את הארגזים הכחולים. התחיל גשם כשהגעתי לגשר. שער בית הספר היה נעול ומישהו הציע מקום יבש. רשמתי כאן את השם, אבל הדיו נמרח. אולי רות יודעת מי זה היה.",
    "mode": "balloons",
    "result": "Leo: The boxes were not lost on the road. Someone signed for them. Ask Ruth at the orchard. She was near the bridge when I arrived.",
    "resultHe": "ליאו מראה לך את עותק המשלוח: שני הארגזים נמסרו, ומישהו חתם. הם כנראה שמורים במקום יבש בכפר. בפרק השני: למצוא את מי שקיבל אותם לפני פתיחת היריד.",
    "rounds": [
      {
        "prompt": "Did you ___ two blue boxes?",
        "answer": "deliver",
        "wrong": [
          "delivered",
          "delivers"
        ],
        "meaning": "מסרת שני ארגזים כחולים?",
        "hint": "אחרי did הפועל בצורת בסיס."
      },
      {
        "prompt": "Yes, I ___ them this morning.",
        "answer": "delivered",
        "wrong": [
          "deliver",
          "delivering"
        ],
        "meaning": "כן, מסרתי אותם הבוקר.",
        "hint": "פעולה שהסתיימה: delivered."
      },
      {
        "prompt": "The school gate ___ locked.",
        "answer": "was",
        "wrong": [
          "were",
          "are"
        ],
        "meaning": "שער בית הספר היה נעול.",
        "hint": "יחיד בעבר: was."
      },
      {
        "prompt": "It ___ raining at the bridge.",
        "answer": "was",
        "wrong": [
          "were",
          "is"
        ],
        "meaning": "ירד גשם ליד הגשר.",
        "hint": "was raining = היה באמצע ירידת גשם."
      },
      {
        "prompt": "Someone ___ the boxes inside.",
        "answer": "carried",
        "wrong": [
          "carry",
          "carries"
        ],
        "meaning": "מישהו נשא את הארגזים פנימה.",
        "hint": "אירוע בעבר: carried."
      },
      {
        "prompt": "This signature is not ___.",
        "answer": "mine",
        "wrong": [
          "my",
          "me"
        ],
        "meaning": "החתימה הזאת אינה שלי.",
        "hint": "mine ללא שם עצם אחריה."
      },
      {
        "prompt": "Where ___ Ruth work?",
        "answer": "does",
        "wrong": [
          "do",
          "did"
        ],
        "meaning": "איפה רות עובדת?",
        "hint": "שאלה בהווה עם she: does."
      },
      {
        "prompt": "She works at the ___.",
        "answer": "orchard",
        "wrong": [
          "harbor",
          "airport"
        ],
        "meaning": "היא עובדת במטע.",
        "hint": "orchard = מטע."
      }
    ]
  },
  {
    "target": "orchard",
    "chapter": 2,
    "title": "רות זוכרת את המעיל",
    "who": "RUTH · APPLE ORCHARD",
    "objective": "שאל את רות מי עזר לליאו בגשם",
    "speech": "Those plants took me all spring to grow. I saw Leo at the bridge. Eli was there too, wearing his green coat. He has a key to the old mill. It is dry inside. But please check the labels — another village ordered blue boxes too.",
    "translation": "גידלתי את השתילים האלה כל האביב. ראיתי את ליאו בגשר, וגם את אלי במעיל הירוק. יש לו מפתח לטחנה הישנה ויבש שם בפנים. אבל בדוק את התוויות — גם כפר אחר הזמין ארגזים כחולים.",
    "mode": "side",
    "result": "Ruth: Ours have the school name and the number 24. Take this order list to Eli. Please don’t bring the wrong plants!",
    "resultHe": "רות נותנת לך רשימת הזמנה: 24 שתילים, מספר משלוח 24 ושם בית הספר. עכשיו ברור למה חשוב למצוא את הארגזים הנכונים. צבע הארגז לבדו לא מספיק.",
    "rounds": [
      {
        "prompt": "Were you ___ the bridge this morning?",
        "answer": "near",
        "wrong": [
          "next",
          "yesterday"
        ],
        "meaning": "היית ליד הגשר הבוקר?",
        "hint": "near = ליד."
      },
      {
        "prompt": "I ___ Leo in the rain.",
        "answer": "saw",
        "wrong": [
          "see",
          "seen"
        ],
        "meaning": "ראיתי את ליאו בגשם.",
        "hint": "העבר של see הוא saw."
      },
      {
        "prompt": "Eli was wearing ___ green coat.",
        "answer": "his",
        "wrong": [
          "him",
          "he"
        ],
        "meaning": "אלי לבש את המעיל הירוק שלו.",
        "hint": "לפני coat צריך his."
      },
      {
        "prompt": "Does Eli ___ a key?",
        "answer": "have",
        "wrong": [
          "has",
          "having"
        ],
        "meaning": "יש לאלי מפתח?",
        "hint": "אחרי does משתמשים ב־have."
      },
      {
        "prompt": "He ___ the old mill every day.",
        "answer": "opens",
        "wrong": [
          "open",
          "opening"
        ],
        "meaning": "הוא פותח את הטחנה מדי יום.",
        "hint": "הרגל עם he: opens."
      },
      {
        "prompt": "The plants in these boxes are ___.",
        "answer": "ours",
        "wrong": [
          "our",
          "us"
        ],
        "meaning": "השתילים בארגזים האלה שלנו.",
        "hint": "ours עומדת לבדה."
      },
      {
        "prompt": "The other village has ___ own order.",
        "answer": "its",
        "wrong": [
          "it",
          "it’s"
        ],
        "meaning": "לכפר האחר יש הזמנה משלו.",
        "hint": "its = שלו; it’s = it is."
      },
      {
        "prompt": "Please check the labels ___.",
        "answer": "carefully",
        "wrong": [
          "careful",
          "care"
        ],
        "meaning": "בבקשה בדוק היטב את התוויות.",
        "hint": "carefully מתאר איך לבדוק."
      },
      {
        "prompt": "I ___ find the right boxes.",
        "answer": "will",
        "wrong": [
          "did",
          "was"
        ],
        "meaning": "אמצא את הארגזים הנכונים.",
        "hint": "הבטחה: will + find."
      },
      {
        "prompt": "Thank you for helping ___.",
        "answer": "us",
        "wrong": [
          "we",
          "our"
        ],
        "meaning": "תודה שאת עוזרת לנו.",
        "hint": "מושא ברבים: us."
      }
    ]
  },
  {
    "target": "mill",
    "chapter": 2,
    "title": "לא כל ארגז כחול הוא שלנו",
    "who": "ELI · OLD MILL",
    "objective": "השווה תוויות ואסוף את ההזמנה הנכונה",
    "speech": "I kept the boxes away from the rain. There are four blue boxes here. Two belong to your school; two are for Hill Farm. Match the school name, the order number and the plants on Ruth’s list. Then help me pack them.",
    "translation": "שמרתי את הארגזים מהגשם. יש כאן ארבעה ארגזים כחולים: שניים לבית הספר שלכם ושניים לחוות הגבעה. התאם את שם בית הספר, מספר ההזמנה וסוגי השתילים ברשימה של רות.",
    "mode": "falling",
    "result": "Eli: These are yours — twenty-four plants, order twenty-four. I will carry one box. You can take the other. Maya is waiting at the bridge.",
    "resultHe": "מצאתם את שני הארגזים. אלי משווה איתך את הרשימה וחותם על האיסוף. הוא נושא ארגז אחד, ואתה לוקח את השני. מאיה מחכה ליד הגשר עם עגלת יד.",
    "rounds": [
      {
        "prompt": "These boxes belong to our ___.",
        "answer": "school",
        "wrong": [
          "shop",
          "ship"
        ],
        "meaning": "הארגזים האלה שייכים לבית הספר שלנו.",
        "hint": "school = בית ספר."
      },
      {
        "prompt": "The order number is ___.",
        "answer": "twenty-four",
        "wrong": [
          "forty-two",
          "twelve"
        ],
        "meaning": "מספר ההזמנה הוא עשרים וארבע.",
        "hint": "twenty-four = 24; forty-two = 42."
      },
      {
        "prompt": "There ___ twelve plants in each box.",
        "answer": "are",
        "wrong": [
          "is",
          "has"
        ],
        "meaning": "יש שנים־עשר שתילים בכל ארגז.",
        "hint": "plants הוא רבים: are."
      },
      {
        "prompt": "These two boxes are ___.",
        "answer": "ours",
        "wrong": [
          "our",
          "us"
        ],
        "meaning": "שני הארגזים האלה שלנו.",
        "hint": "ours עומדת בלי שם עצם."
      },
      {
        "prompt": "Those boxes belong to ___.",
        "answer": "them",
        "wrong": [
          "they",
          "their"
        ],
        "meaning": "הארגזים ההם שייכים להם.",
        "hint": "אחרי to משתמשים ב־them."
      },
      {
        "prompt": "Please don’t mix ___ up.",
        "answer": "them",
        "wrong": [
          "they",
          "theirs"
        ],
        "meaning": "בבקשה אל תערבב ביניהם.",
        "hint": "mix them up = לערבב ביניהם."
      },
      {
        "prompt": "I checked the label ___.",
        "answer": "myself",
        "wrong": [
          "himself",
          "itself"
        ],
        "meaning": "בדקתי את התווית בעצמי.",
        "hint": "I → myself."
      },
      {
        "prompt": "Eli ___ the first box for me.",
        "answer": "carries",
        "wrong": [
          "carry",
          "carrying"
        ],
        "meaning": "אלי נושא בשבילי את הארגז הראשון.",
        "hint": "עם he בהווה: carries."
      },
      {
        "prompt": "This box is heavier ___ that one.",
        "answer": "than",
        "wrong": [
          "then",
          "that"
        ],
        "meaning": "הארגז הזה כבד יותר מההוא.",
        "hint": "than להשוואה; then = אז."
      },
      {
        "prompt": "Let’s put the plants in the ___.",
        "answer": "basket",
        "wrong": [
          "battery",
          "blanket"
        ],
        "meaning": "בוא נשים את השתילים בסל.",
        "hint": "basket = סל."
      },
      {
        "prompt": "Have we ___ all the plants?",
        "answer": "counted",
        "wrong": [
          "count",
          "counts"
        ],
        "meaning": "ספרנו את כל השתילים?",
        "hint": "אחרי have: counted."
      },
      {
        "prompt": "Yes, the order is ___.",
        "answer": "complete",
        "wrong": [
          "completely",
          "completes"
        ],
        "meaning": "כן, ההזמנה שלמה.",
        "hint": "complete = שלם, הושלם."
      }
    ]
  },
  {
    "target": "bridge",
    "chapter": 2,
    "title": "הדרך הארוכה והיבשה",
    "who": "MAYA · VILLAGE BRIDGE",
    "objective": "עבור עם מאיה בשביל הבטוח אל היריד",
    "speech": "The short path is muddy. We cannot take the plants that way. Follow me along the dry path, past the bakery. Anna says the first families have arrived. Let’s get the plants to the hall before the prize draw.",
    "translation": "השביל הקצר בוצי ואי אפשר להעביר בו את השתילים. בוא בשביל היבש שעובר ליד המאפייה. המשפחות הראשונות כבר הגיעו ליריד. צריך להגיע לאולם לפני ההגרלה.",
    "mode": "side",
    "result": "Maya: We made it! Anna is by the village hall. Tell her what happened, and don’t forget the signed receipt.",
    "resultHe": "הגעתם לצד היבש. מול אולם הכפר נשמעים קולות היריד וריח העוגות ממלא את הרחוב. מאיה דוחפת את העגלה ואתה מחזיק את הקבלה החתומה.",
    "rounds": [
      {
        "prompt": "The short path is too ___.",
        "answer": "muddy",
        "wrong": [
          "hungry",
          "early"
        ],
        "meaning": "השביל הקצר בוצי מדי.",
        "hint": "muddy = בוצי."
      },
      {
        "prompt": "We ___ take the dry path.",
        "answer": "must",
        "wrong": [
          "was",
          "has"
        ],
        "meaning": "אנחנו חייבים ללכת בשביל היבש.",
        "hint": "must + פועל בסיסי."
      },
      {
        "prompt": "Maya is walking in front of ___.",
        "answer": "me",
        "wrong": [
          "my",
          "mine"
        ],
        "meaning": "מאיה הולכת לפניי.",
        "hint": "אחרי of משתמשים ב־me."
      },
      {
        "prompt": "I am carrying ___ box.",
        "answer": "my",
        "wrong": [
          "mine",
          "me"
        ],
        "meaning": "אני נושא את הארגז שלי.",
        "hint": "לפני box צריך my."
      },
      {
        "prompt": "She ___ carrying the other box.",
        "answer": "is",
        "wrong": [
          "are",
          "am"
        ],
        "meaning": "היא נושאת את הארגז השני.",
        "hint": "עם she משתמשים ב־is."
      },
      {
        "prompt": "We ___ walking past the bakery.",
        "answer": "are",
        "wrong": [
          "is",
          "has"
        ],
        "meaning": "אנחנו עוברים עכשיו ליד המאפייה.",
        "hint": "עם we: are walking."
      },
      {
        "prompt": "The children ___ already at the fair.",
        "answer": "are",
        "wrong": [
          "is",
          "am"
        ],
        "meaning": "הילדים כבר ביריד.",
        "hint": "children הוא רבים: are."
      },
      {
        "prompt": "Please keep the box ___.",
        "answer": "dry",
        "wrong": [
          "drying",
          "dries"
        ],
        "meaning": "בבקשה שמור על הארגז יבש.",
        "hint": "dry = יבש."
      },
      {
        "prompt": "We have ___ the bridge.",
        "answer": "crossed",
        "wrong": [
          "cross",
          "crosses"
        ],
        "meaning": "חצינו את הגשר.",
        "hint": "have + crossed."
      },
      {
        "prompt": "Anna ___ waiting by the hall.",
        "answer": "is",
        "wrong": [
          "are",
          "has"
        ],
        "meaning": "אנה מחכה ליד האולם.",
        "hint": "is waiting = מחכה עכשיו."
      },
      {
        "prompt": "I ___ not lose the receipt.",
        "answer": "will",
        "wrong": [
          "did",
          "was"
        ],
        "meaning": "לא אאבד את הקבלה.",
        "hint": "הבטחה לעתיד: will not."
      },
      {
        "prompt": "We can finish this ___.",
        "answer": "together",
        "wrong": [
          "their",
          "them"
        ],
        "meaning": "אנחנו יכולים לסיים את זה יחד.",
        "hint": "together = יחד."
      }
    ]
  },
  {
    "target": "hall",
    "chapter": 2,
    "title": "היריד נפתח",
    "who": "ANNA · VILLAGE HALL",
    "objective": "מסור את השתילים ואת הקבלה לאנה",
    "speech": "The cakes are nearly sold out! We were worried about the plants. Where did you find them? Tell us what happened so we can thank the people who helped. The children are ready to draw the winning ticket.",
    "translation": "העוגות כמעט נגמרו! דאגנו לשתילים. איפה מצאת אותם? ספר לנו מה קרה כדי שנוכל להודות למי שעזר. הילדים מוכנים להגריל את הכרטיס הזוכה.",
    "mode": "balloons",
    "result": "Anna: The plants are here, the receipts match, and we have enough money to repair the roof. You didn’t just bring two boxes. You helped the whole village.",
    "resultHe": "אנה מצרפת את הקבלה לחשבונות היריד. רות מציגה את השתילים, וטום מודיע שנאסף מספיק כסף לתיקון הגג. ליאו ואלי זוכים למחיאות כפיים. הביקור שלך בכפר הפך ליום שכולם יזכרו.",
    "rounds": [
      {
        "prompt": "We ___ the boxes at the old mill.",
        "answer": "found",
        "wrong": [
          "find",
          "finds"
        ],
        "meaning": "מצאנו את הארגזים בטחנה הישנה.",
        "hint": "העבר של find הוא found."
      },
      {
        "prompt": "Eli kept ___ away from the rain.",
        "answer": "them",
        "wrong": [
          "they",
          "their"
        ],
        "meaning": "אלי שמר אותם מהגשם.",
        "hint": "מושא: them."
      },
      {
        "prompt": "The labels ___ hard to read.",
        "answer": "were",
        "wrong": [
          "was",
          "is"
        ],
        "meaning": "התוויות היו קשות לקריאה.",
        "hint": "רבים בעבר: were."
      },
      {
        "prompt": "Ruth ___ us the order list.",
        "answer": "gave",
        "wrong": [
          "give",
          "gives"
        ],
        "meaning": "רות נתנה לנו את רשימת ההזמנה.",
        "hint": "העבר של give הוא gave."
      },
      {
        "prompt": "We checked every label ___.",
        "answer": "ourselves",
        "wrong": [
          "myself",
          "themselves"
        ],
        "meaning": "בדקנו בעצמנו כל תווית.",
        "hint": "we → ourselves."
      },
      {
        "prompt": "I have ___ the signed receipt.",
        "answer": "brought",
        "wrong": [
          "bring",
          "brings"
        ],
        "meaning": "הבאתי את הקבלה החתומה.",
        "hint": "have + brought."
      },
      {
        "prompt": "The children ___ ready for the draw.",
        "answer": "are",
        "wrong": [
          "is",
          "am"
        ],
        "meaning": "הילדים מוכנים להגרלה.",
        "hint": "children הוא רבים."
      },
      {
        "prompt": "We have enough money to fix the ___.",
        "answer": "roof",
        "wrong": [
          "river",
          "road"
        ],
        "meaning": "יש לנו מספיק כסף לתקן את הגג.",
        "hint": "roof = גג."
      },
      {
        "prompt": "Everyone helped in ___ own way.",
        "answer": "their",
        "wrong": [
          "them",
          "they"
        ],
        "meaning": "כל אחד עזר בדרכו שלו.",
        "hint": "לפני own way: their."
      },
      {
        "prompt": "I would like to visit ___.",
        "answer": "again",
        "wrong": [
          "ago",
          "already"
        ],
        "meaning": "הייתי רוצה לבקר שוב.",
        "hint": "again = שוב; ago = לפני זמן."
      }
    ]
  }
];
 const speeds={slow:{factor:.7,seconds:660,label:'רגוע'},normal:{factor:1,seconds:510,label:'רגיל'},fast:{factor:1.35,seconds:390,label:'מהיר'}};
 const vocab=[{word:'flour',correct:'קמח',wrong:['פרח','רצפה']},{word:'receipt',correct:'קבלה',wrong:['מתכון','שתיל']},{word:'orchard',correct:'מטע',wrong:['נמל','כבל']},{word:'seedlings',correct:'שתילים',wrong:['מטבעות','שולחנות']}];
 return {cols,rows,tile,buildings,walkable,path,places,missions,speeds,vocab};
})();
if(typeof module!=='undefined')module.exports=NightCity;
