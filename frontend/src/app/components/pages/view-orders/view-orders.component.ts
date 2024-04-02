import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {
  orders!:Order[];
constructor( orderService:OrderService){

  orderService.getAllAdminsOrders().subscribe(
    orders => {
      this.orders = orders;
    }
  )
}


}
