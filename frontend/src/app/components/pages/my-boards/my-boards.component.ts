import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CdkDragEnd, CdkDragStart, Point } from '@angular/cdk/drag-drop';
import { CartItem } from '../../../shared/models/CartItem';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrl: './my-boards.component.css'
})
export class MyBoardsComponent {
  orders!:Order[];
  inputValue: string = '';
  selectedItem: CartItem | null = null;


constructor(activatedRoute:ActivatedRoute, private orderService:OrderService, private cartService:CartService){

  orderService.getOrdersForCurrentUser().subscribe(
    orders => {
      this.orders = orders;
    }
  )
}

onDoubleClick(cItem:CartItem, order: Order): void {

  let cartItem = order.items.find(x=> x == cItem);
  if(!cartItem)
    return;
  cartItem.rotation = (cartItem.rotation + 45) % 360;
  
  this.saveAfterEdit(order);

}

getTransformStyle(item: CartItem): string {
  const rotation = `rotate(${item.rotation}deg)`;
  return `${rotation}`;
}

getRotation(rotation: number): string {
  return `rotate(${rotation}deg)`;
}


onDragStarted(event: CdkDragStart, item: CartItem){
  this.selectedItem = item;
}

deleteBoard(order:Order){
  this.orders = this.orders.filter(x => x!=order);
  this.orderService.DeleteOrder(order).subscribe(

  );
}

 removeItem(order:Order): void {
    // Call the service to remove the item
    if(this.selectedItem != null)
      order.items = order.items.filter(x => x != this.selectedItem);

    this.selectedItem = null;
    this.saveAfterEdit(order);
  }

getStatus(order:Order):string{
  return this.orderService.getHebrewStatus(order);
}

getPosition(stringPoint:string):Point {

  return this.parsePoint(stringPoint);
}

private parsePoint(str: string): { x: number; y: number } {
  // Regular expression to find x and y values
  const xMatch = str.match(/x:(-?\d+)/);
  const yMatch = str.match(/y:(-?\d+)/);

  // Parsing the matches into numbers and constructing the object
  const result = {
    x: xMatch ? Number(xMatch[1]) : 0, // Default to 0 if not found
    y: yMatch ? Number(yMatch[1]) : 0  // Default to 0 if not found
  };

  return result;
}

public onDragEnded(event: CdkDragEnd, cItem:CartItem, order:Order): void {
   
  let cartItem = order.items.find(x=> x == cItem);
  if(!cartItem)
    return;
  cartItem.position = '{x:' +event.source.getFreeDragPosition().x+ ', y:' + event.source.getFreeDragPosition().y+ '}';
  
  this.saveAfterEdit(order);
  //this.orderService.changePosition(imageUrl,event.source.getFreeDragPosition());    
}

saveAfterEdit(order:Order){
  order.status = 'NEW';
  this.orderService.changeStatusToNew(order).subscribe();

}

}
