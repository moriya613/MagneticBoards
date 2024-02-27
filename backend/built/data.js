"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sample_users = exports.sample_tags = exports.sample_items = void 0;
exports.sample_items = [
    {
        id: '1',
        name: 'לוח ה100',
        price: 10,
        favorite: false,
        uses: 4,
        imageUrl: 'assets/100Board.png',
        tags: ['חשבון', 'מתמטיקה'],
        width: 5,
        length: 5
    },
    {
        id: '2',
        name: 'ELUL',
        price: 20,
        favorite: true,
        uses: 7,
        imageUrl: 'assets/Elul.png',
        tags: ['חגים', 'תשרי'],
        width: 5,
        length: 5
    },
    {
        id: '3',
        name: 'אותיות',
        price: 5,
        favorite: false,
        uses: 3,
        imageUrl: 'assets/letters.png',
        tags: ['אותיות', 'כיתה א'],
        width: 5,
        length: 5
    },
    {
        id: '4',
        name: 'מה בקלמר',
        price: 2,
        favorite: true,
        uses: 3,
        imageUrl: 'assets/MaBakalmar.png',
        tags: ['כיתה א'],
        width: 5,
        length: 5
    },
    {
        id: '5',
        name: 'כותרת חשבון',
        price: 11,
        favorite: false,
        uses: 0,
        imageUrl: 'assets/MathTitle.png',
        tags: ['חשבון', 'מתמטיקה'],
        width: 2,
        length: 5
    },
    {
        id: '6',
        name: 'תוצרי כתיבה',
        price: 9,
        favorite: false,
        uses: 4,
        imageUrl: 'assets/WriteProdct.png',
        tags: ['עברית', 'שפה'],
        width: 3,
        length: 1
    },
];
exports.sample_tags = [
    { name: 'חשבון', count: 2 },
    { name: 'חגים', count: 2 },
    { name: 'תשרי', count: 2 },
    { name: 'אותיות', count: 2 },
    { name: 'כיתה א', count: 2 },
    { name: 'מתמטיקה', count: 2 },
    { name: 'שפה', count: 1 },
    { name: 'עברית', count: 1 }
];
exports.sample_users = [
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
