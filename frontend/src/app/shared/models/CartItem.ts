import { Point } from "@angular/cdk/drag-drop";
import { Item } from "./Item";

export class CartItem {
    constructor(public item:Item){}
    quantity: number = 1;
    price: number = this.item.price;
    position:Point ={x:0, y:0};
}