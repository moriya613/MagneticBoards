import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { CartService } from '../../../services/cart.service';
import { Item } from '../../../shared/models/Item';
import { ItemsService } from '../../../services/items.service';
import { CartItem } from '../../../shared/models/CartItem';

@Component({
  selector: 'app-orders-to-confirm',
  templateUrl: './orders-to-confirm.component.html',
  styleUrl: './orders-to-confirm.component.css'
})
export class OrdersToConfirmComponent {
  orders!:Order[];
  constructor(private router:Router, private orderService:OrderService, userService:UserService,
    private cartService:CartService, private itemService:ItemsService){
   
    const user = userService.currentUser;
    const userRegister:IUserRegister = {name: user.name,
                                        email: user.email,
                                        password: "xxx",
                                        confirmPassword: "xxx",
                                        address: user.address,
                                        schoolCode: user.schoolCode,
                                        schoolName: user.schoolCode,
                                        role: user.role,
                                        grade: "xxx",
                                        character: "xxx"};
                                        
    orderService.getNewOrdersForCurrentSchoolCode(userRegister).subscribe(
      orders => {
        this.orders = orders;
      }
    )
  }


  selectedItems: Item[] = [];
  selectedOrders:Order[] = [];

  selectItem(order: Order, event: any) {
    
    if (event.target.checked) {
      this.selectedOrders.push(order);
      order.items.forEach( (cartItem: CartItem) => 
          this.itemService.getItemById(cartItem.item.id).subscribe(serverItem => {
            this.selectedItems.push(serverItem)}))

    } else {

      const index = this.selectedOrders.findIndex(selectedItem => selectedItem === order);
        if (index !== -1) {
          this.selectedOrders.splice(index, 1);
        }

      order.items.forEach( (cartItem:CartItem) => {
        const index = this.selectedItems.findIndex(selectedItem => selectedItem === cartItem.item);
        if (index !== -1) {
          this.selectedItems.splice(index, 1);
        }
      })     
    }
  }

  addToSelectedItems() {
    this.cartService.clearCart();
   
    this.selectedItems.forEach( item => 
      
            this.cartService.addToCart(item));

    const selectedOrdersJson = JSON.stringify(this.selectedOrders);
    localStorage.setItem('selectedOrders', selectedOrdersJson);

       this.router.navigateByUrl('/checkout');

   

    // Logic to handle addition to selectedItems if needed
  }


}
