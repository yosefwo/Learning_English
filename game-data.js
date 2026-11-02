'use strict';
// Each turn: speech, translation, intended reply, correct answer, distractors, rule.
const GAME_STAGES = [
['שער השכונה','נועם','🧑','כינויי גוף',1,'הגעת לשכונה. נועם עוצר ליד השער ומציג לך את חבריו.',[
['Hi! I am Noam. What is your name?','שלום! אני נועם. מה שמך?','הצג את עצמך בשם דויד.','I am David.',['Me am David.','He am David.'],'כשמדברים על עצמנו כנושא משתמשים ב־I — אני.'],
['This is my sister, Maya. Who is she?','זאת אחותי, מאיה. מי היא?','אמור שהיא מאיה.','She is Maya.',['He is Maya.','They is Maya.'],'על אישה אחת משתמשים ב־she — היא.']]],
['הדרך לגינה','מאיה','👩','כינויי מושא',2,'מאיה מחפשת את נועם כדי ללכת יחד לגינה. עזור לה למצוא אותו.',[
['I cannot see Noam. Can you see him?','אני לא רואה את נועם. אתה רואה אותו?','אמור שאתה רואה אותו ליד בית הספר.','I see him near the school.',['I see he near the school.','I see his near the school.'],'נועם מקבל את פעולת הראייה. אחרי see צריך him, ולא he.'],
['My friends need help. Can you help them?','החברים שלי צריכים עזרה. תוכל לעזור להם?','הסכם לעזור להם.','Yes, I can help them.',['Yes, I can help they.','Yes, I can help their.'],'they הוא נושא; them הוא מושא — להם / אותם.']]],
['התיק על הספסל','מאיה','👩','תוארי שייכות',3,'על הספסל נמצא תיק. לפני שממשיכים צריך לברר למי הוא שייך.',[
['I have a blue bag. Is this my bag?','יש לי תיק כחול. האם זה התיק שלי?','אמור למאיה שזה התיק שלה.','Yes, this is your bag.',['Yes, this is you bag.','Yes, this is yours bag.'],'לפני שם עצם, כמו bag, משתמשים ב־your.'],
['Noam has a phone. Where is his phone?','לנועם יש טלפון. איפה הטלפון שלו?','אמור שהטלפון שלו בתוך התיק.','His phone is in the bag.',['Him phone is in the bag.','He phone is in the bag.'],'his מציין שייכות לפני שם עצם: his phone — הטלפון שלו.']]],
['למי הספר?','נועם','🧑','כינויי שייכות',4,'בתיק נמצא גם ספר אנגלית. נועם רוצה לדעת אם הוא שלך.',[
['Is this your English book?','זה ספר האנגלית שלך?','אמור שהספר שלך, בלי לחזור על המילה book.','Yes, it is mine.',['Yes, it is my.','Yes, it is me.'],'mine עומדת לבדה; my חייבת לבוא לפני שם עצם.'],
['Maya says this bag belongs to her. Is it hers?','מאיה אומרת שהתיק שייך לה. האם הוא שלה?','אשר שהתיק שלה.','Yes, it is hers.',['Yes, it is her.','Yes, it is she.'],'ללא שם עצם אחר כך משתמשים ב־hers, ולא her.']]],
['מכינים שלט','דניאל','👨','כינויים חוזרים',5,'דניאל מכין שלט למפגש השכונתי. הוא מציע לך להכין כרטיס שם.',[
['Who made your name card?','מי הכין את כרטיס השם שלך?','אמור שהכנת אותו בעצמך.','I made it myself.',['I made it himself.','I made it itself.'],'כאשר אני עושה בעצמי: I → myself.'],
['Maya made her card without help. What can you say?','מאיה הכינה את הכרטיס שלה ללא עזרה. מה תוכל לומר?','אמור שהיא הכינה אותו בעצמה.','She made it herself.',['She made it himself.','She made it themselves.'],'הכינוי החוזר מתאים לנושא: she → herself.']]],
['בכניסה למועדון','דניאל','👨','הפועל Be',6,'צריך לבדוק מי מוכן לפני שמתחילים לארגן את המפגש.',[
['Are you ready to help?','אתה מוכן לעזור?','אמור שאתה מוכן.','Yes, I am ready.',['Yes, I is ready.','Yes, I are ready.'],'בהווה: I am, he/she/it is, you/we/they are.'],
['Noam and Maya are here. Are they ready too?','נועם ומאיה כאן. גם הם מוכנים?','אמור ששניהם מוכנים.','Yes, they are ready.',['Yes, they is ready.','Yes, they am ready.'],'עם they משתמשים ב־are.']]],
['מחסן הציוד','רוני','🧔','Have / Has',7,'רוני פותח את מחסן הציוד. בדקו מה יש לכל אחד לקראת המפגש.',[
['We need a key. Do you have one?','אנחנו צריכים מפתח. יש לך אחד?','אמור שיש לך מפתח.','I have a key.',['I has a key.','I am have a key.'],'עם I משתמשים ב־have; have כבר מציין שיש לך משהו.'],
['Maya needs a bag. Does Noam have one?','מאיה צריכה תיק. האם לנועם יש אחד?','אמור שיש לו תיק.','He has a bag.',['He have a bag.','He is has a bag.'],'במשפט חיובי בהווה עם he משתמשים ב־has.']]],
['שיחה עם רוני','רוני','🧔','Do / Does / Did',8,'עכשיו מבררים מי עובד במועדון ומי עזר כאן אתמול.',[
['I work here. Ask me if Maya works here too.','אני עובד כאן. שאל אותי אם גם מאיה עובדת כאן.','בחר שאלה על מאיה בהווה.','Does Maya work here?',['Do Maya work here?','Does Maya works here?'],'עם Maya (she) שואלים Does; אחריו work בצורת הבסיס.'],
['Noam helped yesterday. Ask me about it.','נועם עזר אתמול. שאל אותי על כך.','שאל אם נועם עזר אתמול.','Did Noam help yesterday?',['Does Noam help yesterday?','Did Noam helped yesterday?'],'בשאלה בעבר משתמשים ב־Did + פועל בסיסי: help.']]],
['בית הקפה','ליה','👩‍🍳','Present Simple',9,'עוצרים לקנות שתייה. ליה מספרת על שעות הפתיחה הקבועות.',[
['I open the café every morning. Tell Noam about me.','אני פותחת את בית הקפה בכל בוקר. ספר עליי לנועם.','אמור שליה פותחת בכל בוקר.','She opens the café every morning.',['She open the café every morning.','She is open the café every morning.'],'הרגל קבוע הוא Present Simple. עם she מוסיפים s לפועל.'],
['Does Maya drink coffee every day?','מאיה שותה קפה בכל יום?','אמור שהיא לא שותה קפה.','No, she does not drink coffee.',['No, she do not drink coffee.','No, she does not drinks coffee.'],'עם she שוללים בעזרת does not; אחריו drink ללא s.']]],
['סידור הגינה','מאיה','👩','Present Continuous',10,'חוזרים לגינה. כולם עסוקים ברגע זה בהכנות.',[
['What are you doing right now?','מה אתה עושה ממש עכשיו?','אמור שאתה עוזר לנועם עכשיו.','I am helping Noam now.',['I help Noam yesterday.','I helping Noam now.'],'מה שקורה עכשיו: am/is/are + פועל עם ing.'],
['Where are the children? What are they doing?','איפה הילדים? מה הם עושים?','אמור שהם משחקים בגינה עכשיו.','They are playing in the garden now.',['They is playing in the garden now.','They playing in the garden now.'],'עם they משתמשים ב־are, ואז playing.']]],
['הספר שנעלם','נועם','🧑','Past Simple',11,'נועם לא מוצא את הספר. נסה להיזכר במה שקרה אתמול.',[
['Where did you see my book yesterday?','איפה ראית את הספר שלי אתמול?','אמור שראית אותו בבית הספר.','I saw it at school yesterday.',['I see it at school yesterday.','I did saw it at school yesterday.'],'אתמול הוא עבר. צורת העבר של see היא saw.'],
['Did Maya take the book?','האם מאיה לקחה את הספר?','אמור שהיא לא לקחה אותו.','No, she did not take it.',['No, she did not took it.','No, she does not took it.'],'בשלילה בעבר: did not + צורת בסיס, take.']]],
['משחזרים את הבוקר','רוני','🧔','Past Continuous',12,'רוני זוכר שראה את הספר הבוקר. בררו מה קרה באותו רגע.',[
['What were you doing when I called?','מה עשית כשהתקשרתי?','אמור שהיית באמצע קריאה כשהוא התקשר.','I was reading when you called.',['I am reading when you called.','I were reading when you called.'],'פעולה שהייתה באמצע בעבר: I was + reading.'],
['What were Noam and Maya doing at eight?','מה נועם ומאיה עשו בשמונה?','אמור שהם היו באמצע עבודה בגינה.','They were working in the garden.',['They was working in the garden.','They are working in the garden.'],'עם they בעבר מתמשך משתמשים ב־were + ing.']]],
['עזרה בדרך','ליה','👩‍🍳','Future with Will',13,'ליה מגיעה עם השתייה, אבל יש לה יותר מדי שקיות. החלט לעזור לה.',[
['These bags are heavy!','השקיות האלה כבדות!','הצע עכשיו לעזור לה לסחוב.','I will help you.',['I helped you yesterday.','I will helped you.'],'להחלטה ברגע הדיבור אפשר להשתמש ב־will + פועל בסיסי.'],
['Will you bring my book back tomorrow?','תחזיר לי את הספר מחר?','הבטח שתחזיר אותו מחר.','Yes, I will bring it back tomorrow.',['Yes, I will brought it back tomorrow.','Yes, I did bring it back tomorrow.'],'הבטחה לעתיד: will + bring.']]],
['תוכנית למפגש','דניאל','👨','Going to',14,'הציוד מוכן. דניאל שואל על התוכנית שקבעתם למפגש.',[
['What is your plan for this evening?','מה התוכנית שלך לערב?','ספר על התוכנית: אתה מתכוון לפגוש את השכנים.','I am going to meet the neighbors.',['I going to meet the neighbors.','I am going to met the neighbors.'],'תוכנית קיימת: am/is/are going to + פועל בסיסי.'],
['Look at those dark clouds!','הסתכל בעננים הכהים האלה!','נבא גשם לפי מה שרואים כרגע.','It is going to rain.',['It going to rain.','It is going to rained.'],'לתחזית המבוססת על סימן שרואים עכשיו מתאים is going to rain.']]],
['רגע לפני הפתיחה','מאיה','👩','Present Perfect',15,'השמש חוזרת. מאיה בודקת מה כבר הושלם ומה עוד צריך לעשות.',[
['Is the garden ready now?','הגינה מוכנה עכשיו?','אמור שכבר סיימתם את העבודה, והתוצאה חשובה עכשיו.','We have finished the work.',['We has finished the work.','We have finish the work.'],'Present Perfect: have/has + צורת V3. עם we: have finished.'],
['Where is Noam’s book?','איפה הספר של נועם?','אמור שמאיה כבר מצאה אותו.','She has already found it.',['She have already found it.','She has already find it.'],'עם she משתמשים ב־has. צורת V3 של find היא found.']]],
['המפגש בגינה','נועם','🧑','Past Perfect',16,'כולם הגיעו למפגש! נועם מספר איך ההכנות הסתיימו עוד לפני הגעת האורחים.',[
['Was the work finished when the guests arrived?','העבודה כבר הסתיימה כשהאורחים הגיעו?','אמור שסיימתם לפני שהאורחים הגיעו.','We had finished before the guests arrived.',['We have finished before the guests arrived.','We had finish before the guests arrived.'],'אירוע שקדם לאירוע אחר בעבר: had + V3. קודם סיימנו, אחר כך האורחים הגיעו.'],
['Did you know Maya before today?','הכרת את מאיה לפני היום?','אמור שלא פגשת אותה לפני שעברת לכאן.','I had not met her before I moved here.',['I had not meet her before I moved here.','I have not met her before I moved here.'],'שני אירועים בעבר: הפגישה שלא קרתה קודם היא had not met; המעבר הוא moved.']]]
].map(([place,name,avatar,topic,chapter,story,turns])=>({place,name,avatar,topic,chapter,story,turns:turns.map(([speech,translation,mission,answer,wrong,rule])=>({speech,translation,mission,answer,wrong,rule}))}));
