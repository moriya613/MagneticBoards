import { Item } from "./app/shared/models/Item";
import { Tag } from "./app/shared/models/Tag";

export const sample_items: Item[] = [
    {
      id:'1',
      name: 'לוח ה100',
      price: 10,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/100Board.png',
      tags: ['חשבון'],
      width: 80,
      length: 100
    },
    {
      id:'2',
      name: 'אלול',
      price: 20,
      favorite: true,
      uses: 7,
      imageUrl: 'assets/Elul.png',
      tags: ['כללי'],
      width: 170,
      length: 150
    },
    {
      id:'3',
      name: 'אותיות',
      price: 5,
      favorite: false,
      uses: 3,
      imageUrl: 'assets/letters.png',
      tags: ['עברית'],
      width: 100,
      length: 100
    },
    {
      id:'4',
      name: 'מה בקלמר',
      price: 2,
      favorite: true,
      uses: 3,
      imageUrl: 'assets/MaBakalmar.png',
      tags: ['כללי'],
      width: 120,
      length: 120
    },
    {
      id:'5',
      name: 'כותרת חשבון',
      price: 11,
      favorite: false,
      uses: 0,
      imageUrl: 'assets/MathTitle.png',
      tags: ['חשבון'],
      width: 100,
      length: 50    },
    {
      id:'6',
      name: 'תוצרי כתיבה',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/WriteProdct.png',
      tags: ['עברית'],
      width: 70,
      length: 70
    },
    {
      id:'7',
      name: 'יש לי יום הולדת',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/Birthday.jpg',
      tags: ['כללי'],
      width: 50,
      length: 70
    },

    {
      id:'8',
      name: 'אותיות באנגלית',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/EngLetters.jpg',
      tags: ['אנגלית'],
      width: 70,
      length: 50
    },

    {
      id:'9',
      name: 'ילדה בלון',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/GirlBaloon.jpg',
      tags: ['כללי'],
      width: 70,
      length: 50
    },

    {
      id:'10',
      name: ' עלילה',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/Hebrew2.jpg',
      tags: ['עברית'],
      width: 70,
      length: 50
    },
    {
      id:'11',
      name: ' Long U',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/longu.jpg',
      tags: ['אנגלית'],
      width: 40,
      length: 70
    },
    {
      id:'12',
      name: 'בית המספרים',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/NumbersHouse.jpg',
      tags: ['חשבון'],
      width: 50,
      length: 50
    },

    {
      id:'13',
      name: ' תרגיל חיבור',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/PlusMath.jpg',
      tags: ['חשבון'],
      width: 50,
      length: 50
    },

    {
      id:'14',
      name: ' זמן',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/Time.jpg',
      tags: ['עברית'],
      width: 50,
      length: 50
    },
  ];

  export const sample_tags: Tag[] = [
    {name:'חשבון', count:2},
    {name:'אנגלית', count:2},
    {name:'יום הולדת', count:2},
    {name:'עברית', count:2},
    {name:' כללי', count:2},
    {name:'תורה', count:2}
  ]