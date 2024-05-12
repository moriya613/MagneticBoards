import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrl: './my-boards.component.css'
})
export class MyBoardsComponent {
  orders!:Order[];
  inputValue: string = '';

constructor(activatedRoute:ActivatedRoute, private orderService:OrderService){

  orderService.getOrdersForCurrentUser().subscribe(
    orders => {
      this.orders = orders;
    }
  )
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

public onDragEnded(event: CdkDragEnd, imageUrl:string, order:Order): void {
   
  let cartItem = order.items.find(x=> x.item.imageUrl == imageUrl);
  if(!cartItem)
    return;
  cartItem.position = '{x:' +event.source.getFreeDragPosition().x+ ', y:' + event.source.getFreeDragPosition().y+ '}';
  

  //this.orderService.changePosition(imageUrl,event.source.getFreeDragPosition());    
}

saveAfterEdit(order:Order){
  this.orderService.changeStatusToNew(order).subscribe();

}

}
