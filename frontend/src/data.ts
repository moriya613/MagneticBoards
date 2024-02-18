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
      tags: ['חשבון', 'מתמטיקה'],
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
      tags: ['חגים', 'תשרי'],
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
      tags: ['אותיות', 'כיתה א'],
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
      tags: ['כיתה א'],
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
      tags: ['חשבון', 'מתמטיקה'],
      width: 100,
      length: 50    },
    {
      id:'6',
      name: 'תוצרי כתיבה',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/WriteProdct.png',
      tags: ['עברית', 'שפה'],
      width: 70,
      length: 70
    },
  ];

  export const sample_tags: Tag[] = [
    {name:'חשבון', count:2},
    {name:'חגים', count:2},
    {name:'תשרי', count:2},
    {name:'אותיות', count:2},
    {name:'כיתה א', count:2},
    {name:'מתמטיקה', count:2},
    {name:'שפה', count:1},
    {name:'עברית', count:1}

  ]