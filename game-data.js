'use strict';
const GAME_STAGES = [
  {
    "place": "המכתב בשער",
    "name": "נועם",
    "avatar": "🧑",
    "topic": "כינויי גוף",
    "chapter": 1,
    "story": "זה היום הראשון שלך בשכונה. ליד שער נעול מחכה נער עם מעטפה שעליה כתוב: ״פתחו לפני השקיעה״.",
    "turns": [
      {
        "speech": "Hi! I am Noam. Are you the new neighbor?",
        "translation": "היי! אני נועם. אתה השכן החדש?",
        "mission": "הצג את עצמך כדי שנועם יראה לך את המכתב.",
        "answer": "I am David, the new neighbor.",
        "wrong": [
          "Me am David, the new neighbor.",
          "He is David, the new neighbor."
        ],
        "rule": "אני כנושא הוא I; עם I משתמשים ב־am.",
        "answerTranslation": "אני דויד, השכן החדש.",
        "wrongTranslations": [
          "אני דויד, השכן החדש. (שגיאת דקדוק)",
          "הוא דויד, השכן החדש."
        ],
        "outcome": "נועם מחייך ופותח את המעטפה. בפנים יש חצי מפה וציור של מגדל שעון."
      },
      {
        "speech": "My sister Maya has the other half of the map.",
        "translation": "לאחותי מאיה יש את החצי השני של המפה.",
        "mission": "אתה מבחין במאיה ליד הגשר. הצבע עליה.",
        "answer": "She is by the bridge!",
        "wrong": [
          "He is by the bridge!",
          "They is by the bridge!"
        ],
        "rule": "מאיה היא she; לא he או they.",
        "answerTranslation": "היא ליד הגשר!",
        "wrongTranslations": [
          "הוא ליד הגשר!",
          "הם ליד הגשר! (שגיאת דקדוק)"
        ],
        "outcome": "אתם יוצאים אל הגשר. השעון במגדל מתחיל לצלצל."
      }
    ]
  },
  {
    "place": "הגשר הישן",
    "name": "מאיה",
    "avatar": "👩",
    "topic": "כינויי מושא",
    "chapter": 2,
    "story": "מאיה עומדת מול גשר צר. רוח חזקה מעיפה את המפה שלה לעבר גנן שעובר מעבר לנחל.",
    "turns": [
      {
        "speech": "The gardener has my map! Can you see him?",
        "translation": "המפה שלי אצל הגנן! אתה רואה אותו?",
        "mission": "הגנן נמצא ליד העץ. עזור למאיה לזהות אותו.",
        "answer": "Yes! I see him by the tree.",
        "wrong": [
          "Yes! I see he by the tree.",
          "Yes! I see his by the tree."
        ],
        "rule": "אחרי see צריך מושא: him — אותו.",
        "answerTranslation": "כן! אני רואה אותו ליד העץ.",
        "wrongTranslations": [
          "כן! אני רואה אותו ליד העץ. (he אינו כינוי מושא)",
          "כן! אני רואה את שלו ליד העץ. (מבנה שגוי)"
        ],
        "outcome": "הגנן מנופף במפה. אבל ארגז הכלים שלו נפל וחוסם את הדרך."
      },
      {
        "speech": "My friends cannot move this box. Can you help them?",
        "translation": "החברים שלי לא מצליחים להזיז את הארגז. תוכל לעזור להם?",
        "mission": "הסכם לעזור כדי לפתוח את הדרך למפה.",
        "answer": "Of course! I can help them.",
        "wrong": [
          "Of course! I can help they.",
          "Of course! I can help their."
        ],
        "rule": "מקבלי העזרה הם them — להם / אותם.",
        "answerTranslation": "כמובן! אני יכול לעזור להם.",
        "wrongTranslations": [
          "כמובן! אני יכול לעזור להם. (they אינו מושא)",
          "כמובן! אני יכול לעזור לשלהם. (מבנה שגוי)"
        ],
        "outcome": "יחד אתם מזיזים את הארגז. הגנן מחזיר את המפה — עם מפתח קטן שהיה מקופל בתוכה."
      }
    ]
  },
  {
    "place": "הסמל שעל המפתח",
    "name": "הגנן רוני",
    "avatar": "🧔",
    "topic": "תוארי שייכות",
    "chapter": 3,
    "story": "על המפתח חרוט עלה. רוני מספר שסבא שלו טיפל פעם בגינה סודית, מעבר למגדל השעון.",
    "turns": [
      {
        "speech": "This key was in Maya’s map. Whose map is this?",
        "translation": "המפתח הזה היה במפה של מאיה. של מי המפה הזאת?",
        "mission": "הסבר לרוני שהמפה של מאיה.",
        "answer": "It is her map.",
        "wrong": [
          "It is she map.",
          "It is hers map."
        ],
        "rule": "לפני שם עצם: her map; hers עומדת לבדה.",
        "answerTranslation": "זאת המפה שלה.",
        "wrongTranslations": [
          "זאת המפה שלה. (she במקום her)",
          "זאת המפה שלה. (hers אינה באה לפני map)"
        ],
        "outcome": "רוני משווה את המפה לציור ישן על קיר הבקתה. חסר סימן אחד: שמש."
      },
      {
        "speech": "Noam drew a sun on his map. Where is it?",
        "translation": "נועם צייר שמש במפה שלו. איפה היא?",
        "mission": "המפה מציצה מהכיס של נועם. ספר לרוני.",
        "answer": "His map is in his pocket.",
        "wrong": [
          "Him map is in his pocket.",
          "He map is in his pocket."
        ],
        "rule": "תואר השייכות של he הוא his: his map, his pocket.",
        "answerTranslation": "המפה שלו בכיס שלו.",
        "wrongTranslations": [
          "המפה שלו בכיס שלו. (him במקום his)",
          "המפה שלו בכיס שלו. (he במקום his)"
        ],
        "outcome": "כשמחברים את שני החלקים, השמש מציינת מאפייה בקצה הרחוב."
      }
    ]
  },
  {
    "place": "המחברת במאפייה",
    "name": "ליה",
    "avatar": "👩‍🍳",
    "topic": "כינויי שייכות",
    "chapter": 4,
    "story": "ליה האופה מזהה את ציור השמש. היא מוציאה מגירה ובה מחברת אדומה וצעיף מאובק.",
    "turns": [
      {
        "speech": "I found this notebook outside. Is it yours?",
        "translation": "מצאתי את המחברת הזאת בחוץ. היא שלך?",
        "mission": "זיהית את המחברת שאיבדת הבוקר. קח אותה.",
        "answer": "Yes, it is mine!",
        "wrong": [
          "Yes, it is my!",
          "Yes, it is me!"
        ],
        "rule": "mine פירושו שלי ועומד בלי שם עצם אחריו.",
        "answerTranslation": "כן, היא שלי!",
        "wrongTranslations": [
          "כן, היא שלי! (my דורשת שם עצם)",
          "כן, זה אני! (me אינו מציין שייכות)"
        ],
        "outcome": "בין הדפים אתה מגלה פתק שלא כתבת: ״חפשו את מי שמתקן זמן״."
      },
      {
        "speech": "Maya left this scarf here. Is it hers?",
        "translation": "מאיה השאירה כאן את הצעיף הזה. הוא שלה?",
        "mission": "אשר שהצעיף של מאיה כדי להחזיר אותו.",
        "answer": "Yes, that scarf is hers.",
        "wrong": [
          "Yes, that scarf is her.",
          "Yes, that scarf is she."
        ],
        "rule": "כשאין שם עצם אחרי מילת השייכות: hers — שלה.",
        "answerTranslation": "כן, הצעיף הזה שלה.",
        "wrongTranslations": [
          "כן, הצעיף הזה שלה. (her במקום hers)",
          "כן, הצעיף הזה היא. (מבנה שגוי)"
        ],
        "outcome": "בתוך הצעיף מגולגל כרטיס ביקור של דניאל, מתקן השעונים."
      }
    ]
  },
  {
    "place": "מתקן הזמן",
    "name": "דניאל",
    "avatar": "👨",
    "topic": "כינויים חוזרים",
    "chapter": 5,
    "story": "הסדנה של דניאל מלאה שעונים שעצרו בשעות שונות. על השולחן מנגנון קטן בצורת שמש.",
    "turns": [
      {
        "speech": "Who put these two map pieces together?",
        "translation": "מי חיבר את שני חלקי המפה האלה?",
        "mission": "ספר שאתה חיברת אותם בעצמך.",
        "answer": "I did it myself.",
        "wrong": [
          "I did it himself.",
          "I did it itself."
        ],
        "rule": "כשאני עושה בעצמי: I → myself.",
        "answerTranslation": "עשיתי זאת בעצמי.",
        "wrongTranslations": [
          "עשיתי זאת בעצמו. (himself אינו מתאים ל־I)",
          "עשיתי זאת מעצמו. (itself אינו מתאים ל־I)"
        ],
        "outcome": "דניאל מסובב את המפה. מתחת לכתם דיו מופיעות מדרגות שיורדות מהמגדל."
      },
      {
        "speech": "Did someone help Maya find the old path?",
        "translation": "מישהו עזר למאיה למצוא את השביל הישן?",
        "mission": "מאיה מצאה אותו לבדה. תן לה את הקרדיט.",
        "answer": "No, she found it herself.",
        "wrong": [
          "No, she found it himself.",
          "No, she found it themselves."
        ],
        "rule": "הכינוי החוזר שמתאים ל־she הוא herself.",
        "answerTranslation": "לא, היא מצאה אותו בעצמה.",
        "wrongTranslations": [
          "לא, היא מצאה אותו בעצמו.",
          "לא, היא מצאה אותו בעצמם."
        ],
        "outcome": "דניאל נותן לכם את מנגנון השמש: ״תצטרכו אותו כדי להעיר את השער״."
      }
    ]
  },
  {
    "place": "המגדל נעול",
    "name": "נועם",
    "avatar": "🧑",
    "topic": "הפועל Be",
    "chapter": 6,
    "story": "השמש כבר יורדת. בפתח המגדל מופיעה כתובת: ״רק צוות אמיץ נכנס יחד״.",
    "turns": [
      {
        "speech": "The stairs are dark. Are you ready?",
        "translation": "המדרגות חשוכות. אתה מוכן?",
        "mission": "עודד את נועם והודע שאתה מוכן.",
        "answer": "Yes, I am ready. Let’s go!",
        "wrong": [
          "Yes, I is ready. Let’s go!",
          "Yes, I are ready. Let’s go!"
        ],
        "rule": "עם I משתמשים ב־am.",
        "answerTranslation": "כן, אני מוכן. בוא נלך!",
        "wrongTranslations": [
          "כן, אני מוכן. בוא נלך! (is במקום am)",
          "כן, אני מוכן. בוא נלך! (are במקום am)"
        ],
        "outcome": "הדלת נפתחת בחריקה. מהחושך נשמע צליל פעמון חלש."
      },
      {
        "speech": "Where are Maya and Roni? We cannot leave anyone behind.",
        "translation": "איפה מאיה ורוני? אסור להשאיר אף אחד מאחור.",
        "mission": "אתה רואה אותם בכניסה. הרגע את נועם.",
        "answer": "They are here. We are together.",
        "wrong": [
          "They is here. We are together.",
          "They am here. We are together."
        ],
        "rule": "עם they ו־we משתמשים ב־are.",
        "answerTranslation": "הם כאן. אנחנו יחד.",
        "wrongTranslations": [
          "הם כאן. אנחנו יחד. (is במקום are)",
          "הם כאן. אנחנו יחד. (am במקום are)"
        ],
        "outcome": "ארבעתכם יורדים במדרגות. בקצה המסדרון ממתינה דלת עם סמל עלה."
      }
    ]
  },
  {
    "place": "דלת העלה",
    "name": "רוני",
    "avatar": "🧔",
    "topic": "Have / Has",
    "chapter": 7,
    "story": "לדלת אין ידית. יש בה חור למפתח ושקע עגול שמתאים למנגנון השמש.",
    "turns": [
      {
        "speech": "The leaf key! Does anyone have it?",
        "translation": "מפתח העלה! יש אותו למישהו?",
        "mission": "המפתח אצלך. הוצא אותו.",
        "answer": "I have the key!",
        "wrong": [
          "I has the key!",
          "I am have the key!"
        ],
        "rule": "עם I: have, בלי am.",
        "answerTranslation": "המפתח אצלי!",
        "wrongTranslations": [
          "המפתח אצלי! (has במקום have)",
          "המפתח אצלי! (am מיותר)"
        ],
        "outcome": "המפתח מסתובב, אבל הדלת נפתחת רק מעט. עכשיו צריך את מנגנון השמש."
      },
      {
        "speech": "Who has the little sun from Daniel’s workshop?",
        "translation": "אצל מי השמש הקטנה מהסדנה של דניאל?",
        "mission": "נועם מחזיק אותה. ספר לרוני.",
        "answer": "He has the little sun.",
        "wrong": [
          "He have the little sun.",
          "He is has the little sun."
        ],
        "rule": "במשפט חיובי עם he משתמשים ב־has.",
        "answerTranslation": "השמש הקטנה אצלו.",
        "wrongTranslations": [
          "השמש הקטנה אצלו. (have במקום has)",
          "השמש הקטנה אצלו. (is מיותר)"
        ],
        "outcome": "נועם מכניס את המנגנון. הדלת נפתחת — ובפנים גינה קמלה, לא אוצר."
      }
    ]
  },
  {
    "place": "מי כיבה את המים?",
    "name": "רוני",
    "avatar": "🧔",
    "topic": "Do / Does / Did",
    "chapter": 8,
    "story": "הבריכה יבשה והפרחים נפולים. רוני מוצא ליד המשאבה כפתור כבוי ויומן טיפולים.",
    "turns": [
      {
        "speech": "Maya knows machines. What would you like to ask her?",
        "translation": "מאיה מבינה במכונות. מה תרצה לשאול אותה?",
        "mission": "ברר אם המשאבה עובדת.",
        "answer": "Does the pump work?",
        "wrong": [
          "Do the pump work?",
          "Does the pump works?"
        ],
        "rule": "המשאבה היא it: Does + work בצורת בסיס.",
        "answerTranslation": "האם המשאבה עובדת?",
        "wrongTranslations": [
          "האם המשאבה עובדת? (Do במקום Does)",
          "האם המשאבה עובדת? (works במקום work)"
        ],
        "outcome": "מאיה בודקת: המשאבה תקינה. מישהו פשוט סגר את ברז המים אתמול."
      },
      {
        "speech": "The last note in the log is from yesterday. Ask Roni.",
        "translation": "הרישום האחרון ביומן הוא מאתמול. שאל את רוני.",
        "mission": "ברר אם הוא סגר את הברז אתמול.",
        "answer": "Did you close the valve yesterday?",
        "wrong": [
          "Does you close the valve yesterday?",
          "Did you closed the valve yesterday?"
        ],
        "rule": "בשאלה על העבר: Did + close.",
        "answerTranslation": "האם סגרת את הברז אתמול?",
        "wrongTranslations": [
          "האם סגרת את הברז אתמול? (Does אינו מתאים)",
          "האם סגרת את הברז אתמול? (closed במקום close)"
        ],
        "outcome": "רוני נזכר: הוא סגר אותו בגלל צינור שבור. צריך למצוא את הצינור לפני שפותחים מים."
      }
    ]
  },
  {
    "place": "השביל הרטוב",
    "name": "ליה",
    "avatar": "👩‍🍳",
    "topic": "Present Simple",
    "chapter": 9,
    "story": "ליה מגיעה עם לחם חם ופנס. היא מכירה את המקום מילדות ומצביעה על שביל מאחורי עץ תאנה.",
    "turns": [
      {
        "speech": "The water follows this path every morning. Where does it go?",
        "translation": "המים זורמים בשביל הזה בכל בוקר. לאן הם מגיעים?",
        "mission": "לפי המפה, הזרם מגיע לבריכה. ספר לליה.",
        "answer": "It flows into the pool.",
        "wrong": [
          "It flow into the pool.",
          "It is flow into the pool."
        ],
        "rule": "תיאור מסלול קבוע: Present Simple. עם it מוסיפים s.",
        "answerTranslation": "הוא זורם אל הבריכה.",
        "wrongTranslations": [
          "הוא זורם אל הבריכה. (חסרה s)",
          "הוא זורם אל הבריכה. (is מיותר)"
        ],
        "outcome": "אתם הולכים לאורך השביל. מתחת לגשרון נראית שלולית גדולה."
      },
      {
        "speech": "Does the water reach the flowers when the pipe is broken?",
        "translation": "המים מגיעים לפרחים כשהצינור שבור?",
        "mission": "הסבר שהמים לא מגיעים לפרחים.",
        "answer": "No, it does not reach the flowers.",
        "wrong": [
          "No, it do not reach the flowers.",
          "No, it does not reaches the flowers."
        ],
        "rule": "עם it שוללים ב־does not + reach.",
        "answerTranslation": "לא, הם לא מגיעים לפרחים.",
        "wrongTranslations": [
          "לא, הם לא מגיעים לפרחים. (do במקום does)",
          "לא, הם לא מגיעים לפרחים. (reaches במקום reach)"
        ],
        "outcome": "השלולית חושפת את מקום הדליפה. מאיה מתכופפת לבדוק את הצינור."
      }
    ]
  },
  {
    "place": "מתחת לגשרון",
    "name": "מאיה",
    "avatar": "👩",
    "topic": "Present Continuous",
    "chapter": 10,
    "story": "מאיה מבקשת אור. נועם אוחז בצינור, ורוני מחפש חלק חלופי בארגז הכלים.",
    "turns": [
      {
        "speech": "David, what are you doing? I need some light!",
        "translation": "דויד, מה אתה עושה? אני צריכה קצת אור!",
        "mission": "אתה כבר מאיר בפנס. הסבר מה אתה עושה עכשיו.",
        "answer": "I am holding the flashlight for you.",
        "wrong": [
          "I holding the flashlight for you.",
          "I was holding the flashlight yesterday."
        ],
        "rule": "פעולה עכשיו: I am + holding.",
        "answerTranslation": "אני מחזיק בשבילך את הפנס.",
        "wrongTranslations": [
          "אני מחזיק בשבילך את הפנס. (חסר am)",
          "החזקתי בשבילך את הפנס אתמול."
        ],
        "outcome": "אלומת האור מגלה סדק ארוך. צריך להחזיק את הצינור משני הצדדים."
      },
      {
        "speech": "Can Noam and Roni come here?",
        "translation": "נועם ורוני יכולים לבוא לכאן?",
        "mission": "הם כבר מגיעים עם כלי העבודה. עדכן את מאיה.",
        "answer": "They are coming with the tools.",
        "wrong": [
          "They is coming with the tools.",
          "They coming with the tools."
        ],
        "rule": "עם they: are + coming.",
        "answerTranslation": "הם מגיעים עם כלי העבודה.",
        "wrongTranslations": [
          "הם מגיעים עם כלי העבודה. (is במקום are)",
          "הם מגיעים עם כלי העבודה. (חסר are)"
        ],
        "outcome": "כשרוני פותח את הארגז, הוא מגלה שהחלק החלופי נעלם."
      }
    ]
  },
  {
    "place": "החלק שנעלם",
    "name": "רוני",
    "avatar": "🧔",
    "topic": "Past Simple",
    "chapter": 11,
    "story": "בלי טבעת המתכת אי אפשר לתקן את הצינור. רוני מנסה להיזכר איפה הניח אותה.",
    "turns": [
      {
        "speech": "Did you see a metal ring at Daniel’s workshop?",
        "translation": "ראית טבעת מתכת בסדנה של דניאל?",
        "mission": "נזכרת שראית אותה ליד השעון האדום.",
        "answer": "Yes, I saw it by the red clock.",
        "wrong": [
          "Yes, I see it by the red clock yesterday.",
          "Yes, I did saw it by the red clock."
        ],
        "rule": "העבר של see הוא saw; לא מוסיפים did לפני saw.",
        "answerTranslation": "כן, ראיתי אותה ליד השעון האדום.",
        "wrongTranslations": [
          "כן, אני רואה אותה ליד השעון האדום אתמול. (זמן שגוי)",
          "כן, ראיתי אותה ליד השעון האדום. (did saw שגוי)"
        ],
        "outcome": "נועם כבר רוצה לרוץ לסדנה, אבל מאיה אומרת שהיא זוכרת את הטבעת אצל ליה."
      },
      {
        "speech": "Did Lia take the ring to the bakery?",
        "translation": "ליה לקחה את הטבעת למאפייה?",
        "mission": "ליה לא לקחה אותה; היא השאירה אותה אצל דניאל.",
        "answer": "No, she did not take it.",
        "wrong": [
          "No, she did not took it.",
          "No, she does not took it."
        ],
        "rule": "בשלילה בעבר: did not + take.",
        "answerTranslation": "לא, היא לא לקחה אותה.",
        "wrongTranslations": [
          "לא, היא לא לקחה אותה. (took במקום take)",
          "לא, היא לא לקחה אותה. (מבנה וזמן שגויים)"
        ],
        "outcome": "נשאר רמז אחד: מישהו הזיז את הטבעת בזמן שדניאל תיקן את השעון."
      }
    ]
  },
  {
    "place": "הזיכרון שחזר",
    "name": "דניאל",
    "avatar": "👨",
    "topic": "Past Continuous",
    "chapter": 12,
    "story": "דניאל מגיע בריצה לשער הגינה. הוא שמע שמחפשים את הטבעת ורוצה לשחזר את הבוקר.",
    "turns": [
      {
        "speech": "What were you doing when the red clock rang?",
        "translation": "מה עשית כשהשעון האדום צלצל?",
        "mission": "היית באמצע קריאת המפה. ספר לדניאל.",
        "answer": "I was reading the map when it rang.",
        "wrong": [
          "I am reading the map when it rang.",
          "I were reading the map when it rang."
        ],
        "rule": "פעולה שהייתה באמצע בעבר: I was reading.",
        "answerTranslation": "קראתי את המפה כשהוא צלצל.",
        "wrongTranslations": [
          "אני קורא את המפה כשהוא צלצל. (ערבוב זמנים)",
          "קראתי את המפה כשהוא צלצל. (were במקום was)"
        ],
        "outcome": "דניאל נזכר שהרים את המפה כדי לנקות את השולחן — והטבעת התגלגלה מתחתיה."
      },
      {
        "speech": "And what were Noam and Maya doing then?",
        "translation": "ומה נועם ומאיה עשו אז?",
        "mission": "הם ארזו את התיק בזמן ההוא. הזכר לדניאל.",
        "answer": "They were packing the bag.",
        "wrong": [
          "They was packing the bag.",
          "They are packing the bag."
        ],
        "rule": "עם they בעבר מתמשך משתמשים ב־were.",
        "answerTranslation": "הם היו באמצע אריזת התיק.",
        "wrongTranslations": [
          "הם היו באמצע אריזת התיק. (was במקום were)",
          "הם אורזים את התיק עכשיו."
        ],
        "outcome": "מאיה פותחת את התא הצדדי בתיק. הטבעת כאן כל הזמן! כולם פורצים בצחוק."
      }
    ]
  },
  {
    "place": "המים חוזרים",
    "name": "מאיה",
    "avatar": "👩",
    "topic": "Future with Will",
    "chapter": 13,
    "story": "הטבעת במקום, אבל הצינור כבד. מאיה צריכה עזרה מיידית כדי לחבר אותו.",
    "turns": [
      {
        "speech": "I cannot hold this pipe and turn the ring!",
        "translation": "אני לא יכולה גם להחזיק את הצינור וגם לסובב את הטבעת!",
        "mission": "החלט במקום להחזיק את הצינור.",
        "answer": "I will hold the pipe!",
        "wrong": [
          "I will held the pipe!",
          "I held the pipe yesterday!"
        ],
        "rule": "החלטה ברגע הדיבור: will + hold.",
        "answerTranslation": "אני אחזיק את הצינור!",
        "wrongTranslations": [
          "אני אחזיק את הצינור! (held במקום hold)",
          "החזקתי את הצינור אתמול!"
        ],
        "outcome": "מאיה מהדקת את הטבעת ורוני פותח את הברז. זרם דק מתחיל לנוע לבריכה."
      },
      {
        "speech": "Will you stay until the water reaches the pool?",
        "translation": "תישאר עד שהמים יגיעו לבריכה?",
        "mission": "הבטח שתישאר עם החברים.",
        "answer": "Yes, I will stay with you.",
        "wrong": [
          "Yes, I will stayed with you.",
          "Yes, I did stay with you tomorrow."
        ],
        "rule": "הבטחה לעתיד: will + stay.",
        "answerTranslation": "כן, אשאר איתכם.",
        "wrongTranslations": [
          "כן, אשאר איתכם. (stayed במקום stay)",
          "כן, נשארתי איתכם מחר. (זמן שגוי)"
        ],
        "outcome": "המים מגיעים לבריכה. מתחת לפני המים מופיע אריח עם ציור של פעמון."
      }
    ]
  },
  {
    "place": "לפני השקיעה",
    "name": "נועם",
    "avatar": "🧑",
    "topic": "Going to",
    "chapter": 14,
    "story": "על האריח כתוב: ״כשהגינה מתעוררת — העירו את השכונה״. נועם מבין שהאוצר הוא מפגש של כולם.",
    "turns": [
      {
        "speech": "The garden is ready. What is our plan now?",
        "translation": "הגינה מוכנה. מה התוכנית שלנו עכשיו?",
        "mission": "החלטתם להזמין את השכנים. ספר על התוכנית.",
        "answer": "We are going to invite the neighbors.",
        "wrong": [
          "We going to invite the neighbors.",
          "We are going to invited the neighbors."
        ],
        "rule": "תוכנית קיימת: are going to + invite.",
        "answerTranslation": "אנחנו מתכוונים להזמין את השכנים.",
        "wrongTranslations": [
          "אנחנו מתכוונים להזמין את השכנים. (חסר are)",
          "אנחנו מתכוונים להזמין את השכנים. (invited במקום invite)"
        ],
        "outcome": "נועם רץ לבתים עם הזמנות. אבל מאחורי המגדל מצטברים עננים כהים."
      },
      {
        "speech": "Look at those clouds above the garden!",
        "translation": "תסתכל בעננים האלה מעל הגינה!",
        "mission": "הזהר את החברים מגשם לפי העננים שרואים.",
        "answer": "It is going to rain.",
        "wrong": [
          "It going to rain.",
          "It is going to rained."
        ],
        "rule": "תחזית לפי סימן שרואים עכשיו: is going to rain.",
        "answerTranslation": "עומד לרדת גשם.",
        "wrongTranslations": [
          "עומד לרדת גשם. (חסר is)",
          "עומד לרדת גשם. (rained במקום rain)"
        ],
        "outcome": "ליה פותחת סוכך ישן. אתם מעבירים את השולחן מתחתיו רגע לפני הטיפה הראשונה."
      }
    ]
  },
  {
    "place": "צלצול אחרון",
    "name": "דניאל",
    "avatar": "👨",
    "topic": "Present Perfect",
    "chapter": 15,
    "story": "הסוכך מגן על כולם, אבל נועם עדיין בחוץ. צריך לצלצל בפעמון כדי שיֵדע לאן להגיע.",
    "turns": [
      {
        "speech": "Can we ring the bell? Is the repair complete?",
        "translation": "אפשר לצלצל בפעמון? התיקון הושלם?",
        "mission": "דווח שכבר סיימתם את התיקון והתוצאה מוכנה עכשיו.",
        "answer": "We have finished the repair.",
        "wrong": [
          "We has finished the repair.",
          "We have finish the repair."
        ],
        "rule": "Present Perfect: have + V3; עם we — have finished.",
        "answerTranslation": "סיימנו את התיקון.",
        "wrongTranslations": [
          "סיימנו את התיקון. (has במקום have)",
          "סיימנו את התיקון. (finish במקום finished)"
        ],
        "outcome": "דניאל מצלצל. האור נדלק בחלונות מסביב, והשכנים יוצאים עם מטריות."
      },
      {
        "speech": "Has Maya found Noam yet?",
        "translation": "מאיה כבר מצאה את נועם?",
        "mission": "אתה רואה אותם מגיעים יחד. עדכן את דניאל.",
        "answer": "Yes, she has already found him.",
        "wrong": [
          "Yes, she have already found him.",
          "Yes, she has already find him."
        ],
        "rule": "עם she: has; צורת V3 של find היא found.",
        "answerTranslation": "כן, היא כבר מצאה אותו.",
        "wrongTranslations": [
          "כן, היא כבר מצאה אותו. (have במקום has)",
          "כן, היא כבר מצאה אותו. (find במקום found)"
        ],
        "outcome": "נועם מגיע עם אורחת אחרונה: סבתא שלו. היא מזהה מיד את המעטפה."
      }
    ]
  },
  {
    "place": "האוצר של השכונה",
    "name": "סבתא של נועם",
    "avatar": "👵",
    "topic": "Past Perfect",
    "chapter": 16,
    "story": "סבתא מספרת שכתבה את המכתב לפני שנים: היא רצתה שהשכנים יחזרו לטפל בגינה יחד. עכשיו סוף־סוף מישהו השלים את המסע.",
    "turns": [
      {
        "speech": "Was everything ready when the neighbors arrived?",
        "translation": "הכול כבר היה מוכן כשהשכנים הגיעו?",
        "mission": "ספר שסיימתם לפני שהשכנים הגיעו.",
        "answer": "We had finished before they arrived.",
        "wrong": [
          "We have finished before they arrived.",
          "We had finish before they arrived."
        ],
        "rule": "מה שהושלם לפני אירוע אחר בעבר: had + V3.",
        "answerTranslation": "סיימנו לפני שהם הגיעו.",
        "wrongTranslations": [
          "סיימנו לפני שהם הגיעו. (have במקום had בהקשר הזה)",
          "סיימנו לפני שהם הגיעו. (finish במקום finished)"
        ],
        "outcome": "סבתא מביטה במים ובפרחים: ״זה בדיוק מה שקיוויתי שיקרה״."
      },
      {
        "speech": "Were you already friends before this adventure?",
        "translation": "כבר הייתם חברים לפני ההרפתקה הזאת?",
        "mission": "ספר שלפני שהגעת לכאן לא פגשת אותם.",
        "answer": "I had not met them before I came here.",
        "wrong": [
          "I had not meet them before I came here.",
          "I have not met them before I came here."
        ],
        "rule": "לפני הגעה שכבר קרתה בעבר: had not + met.",
        "answerTranslation": "לא פגשתי אותם לפני שבאתי לכאן.",
        "wrongTranslations": [
          "לא פגשתי אותם לפני שבאתי לכאן. (meet במקום met)",
          "לא פגשתי אותם לפני שבאתי לכאן. (have במקום had)"
        ],
        "outcome": "נועם מגיש לך כוס לימונדה: ״עכשיו אתה כבר לא השכן החדש. אתה אחד מאיתנו״. האוצר היה כאן — החברים שמצאת בדרך."
      }
    ]
  }
];
