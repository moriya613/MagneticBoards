import { Item } from "./models/item.model";

export const sample_items: Item[] = [
    {
      id:'1',
      name: 'לוח ה100',
      price: 10,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/100Board.png',
      tags: ['חשבון'],
      width: 8,
      length: 10,
      schoolCharacter: 'ממד'
    },
    {
      id:'2',
      name: 'אלול',
      price: 20,
      favorite: true,
      uses: 7,
      imageUrl: 'assets/Elul.png',
      tags: ['יהדות'],
      width: 17,
      length: 15,
      schoolCharacter: 'ממד'

    },
    {
      id:'3',
      name: 'אותיות',
      price: 5,
      favorite: false,
      uses: 3,
      imageUrl: 'assets/letters.png',
      tags: ['תורה'],
      width: 10,
      length: 10,
      schoolCharacter: 'ממד'

    },
    {
      id:'4',
      name: 'מה בקלמר',
      price: 2,
      favorite: true,
      uses: 3,
      imageUrl: 'assets/MaBakalmar.png',
      tags: ['כללי'],
      width: 12,
      length: 12,
      schoolCharacter: 'ממד'

    },
    {
      id:'5',
      name: 'כותרת חשבון',
      price: 11,
      favorite: false,
      uses: 0,
      imageUrl: 'assets/MathTitle.png',
      tags: ['חשבון'],
      width: 10,
      length: 5 ,   
      schoolCharacter: 'ממד'
    },

    {
      id:'6',
      name: 'תוצרי כתיבה',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/WriteProdct.png',
      tags: ['עברית'],
      width: 7,
      length: 7,
      schoolCharacter: 'ממד'

    },
    {
      id:'7',
      name: 'יש לי יום הולדת',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/Birthday.jpg',
      tags: ['כללי'],
      width: 5,
      length: 7,
      schoolCharacter: 'ממד'

    },

    {
      id:'8',
      name: 'אותיות באנגלית',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/EngLetters.jpg',
      tags: ['אנגלית'],
      width: 7,
      length: 5,
      schoolCharacter: 'ממד'

    },

    {
      id:'9',
      name: 'ילדה בלון',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/GirlBaloon.jpg',
      tags: ['כללי'],
      width: 7,
      length: 5,
      schoolCharacter: 'ממד'

    },

    {
      id:'10',
      name: ' עלילה',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/Hebrew2.jpg',
      tags: ['עברית'],
      width: 7,
      length: 5,
      schoolCharacter: 'ממד'

    },
    {
      id:'11',
      name: ' Long U',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/longU.jpg',
      tags: ['אנגלית'],
      width: 4,
      length: 7,
      schoolCharacter: 'חרדי'

    },
    {
      id:'12',
      name: 'בית המספרים',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/NumbersHouse.jpg',
      tags: ['חשבון'],
      width: 5,
      length: 5,
      schoolCharacter: 'חרדי'

    },

    {
      id:'13',
      name: ' תרגיל חיבור',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/PlusMath.jpg',
      tags: ['חשבון'],
      width: 5,
      length: 5,
      schoolCharacter: 'ממלכתי'

    },

    {
      id:'14',
      name: ' זמן',
      price: 9,
      favorite: false,
      uses: 4,
      imageUrl: 'assets/Time.jpg',
      tags: ['עברית'],
      width: 5,
      length: 5,
      schoolCharacter: 'ממלכתי'

    },
  ];


  export const sample_users: any[] = [
    {
      name: "Amnon Bariach",
      email: "Amnon@gmail.com",
      password: "613613",
      address: "Ashdod",
      isSuperAdmin: true,
      role: "admin",
      schoolCode: 7777
    },
    {
      name: "Jane Doe",
      email: "Jane@gmail.com",
      password: "123123",
      address: "Shanghai",
      isSuperAdmin: false,
      role: "admin",
      schoolCode: 1111


    },
    {
      name: "יהונתן מנהל",
      email: "JoA@gmail.com",
      password: "123123",
      address: "Shanghai",
      isSuperAdmin: false,
      role: "admin",
      schoolCode: 2222


    },
    {
      name: "יהונתן מורה",
      email: "JoT@gmail.com",
      password: "123123",
      address: "Shanghai",
      isSuperAdmin: false,
      role: "teacher",
      schoolCode: 2222


    },
  ];

  