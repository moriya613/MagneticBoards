import { CartItem } from "./CartItem";

export class Order {
    id!:number;
    items!:CartItem[];
    totalPrice!:number;
    name!:string;
    address!:string;
    schoolCode!:string;
    paymentId!:string;
    createdAt!:string;
    roleOfUser!:string; 
    status!:string;
    widthOfBoard!:number;
    heightOfBoard!:number;
    adminNotes!:string;

}