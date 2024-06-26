import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { Point } from '@angular/cdk/drag-drop';
import { CartItem } from '../../../shared/models/CartItem';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-view-orders-with-input',
  templateUrl: './view-orders-with-input.component.html',
  styleUrl: './view-orders-with-input.component.css'
})
export class ViewOrdersWithInputComponent {


  @Input()
  orders!:Order[];

  @Input()
  schoolName!:string;

  constructor(private router:Router, private orderService:OrderService, private cartService:CartService){
   
                                           
  }


  selectedOrders:Order[] = [];

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


  selectItem(order: Order, event: any) {
    
    if (event.target.checked) {
      this.selectedOrders.push(order);
      
    } else {

      const index = this.selectedOrders.findIndex(selectedItem => selectedItem === order);
        if (index !== -1) {
          this.selectedOrders.splice(index, 1);
        }

     
    }
  }

  selectedItems: CartItem[] = [];

  changeStatusToPay() {
   

    this.selectedOrders.forEach(order =>  {
      order.items.forEach(item => this.cartService.addToCheckoutCart(item));
      this.orderService.changeStatusToPayed(order).subscribe({
      next:()=>{

        console.log("V")
        
      },
      error: (errorResponse) => {
        console.log("X")

      }
    })})


    this.orderService.setOrderNameToLocalStorage(this.schoolName);
       this.router.navigateByUrl('/checkout');
  }


}