import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';

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



}
