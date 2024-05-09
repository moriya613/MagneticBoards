import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Point } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrl: './my-boards.component.css'
})
export class MyBoardsComponent {
  orders!:Order[];
constructor(activatedRoute:ActivatedRoute, orderService:OrderService){

  orderService.getOrdersForCurrentUser().subscribe(
    orders => {
      this.orders = orders;
    }
  )
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



}
