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
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';

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
                                        schoolCharacter: "xxx"};
                                        
    orderService.getAllOrdersBySchoolCode(userRegister).subscribe(
      orders => {
        this.orders = orders;
      }
    )
  }


  selectedItems: CartItem[] = [];
  selectedOrders:Order[] = [];

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


  selectItem(order: Order, event: any) {
    
    if (event.target.checked) {
      this.selectedOrders.push(order);
      // order.items.forEach( (cartItem: CartItem) => 
      //     this.itemService.getItemById(cartItem.item.id).subscribe(serverItem => {
      //       this.selectedItems.push(serverItem)}))

    } else {

      const index = this.selectedOrders.findIndex(selectedItem => selectedItem === order);
        if (index !== -1) {
          this.selectedOrders.splice(index, 1);
        }

      // order.items.forEach( (cartItem:CartItem) => {
      //   const index = this.selectedItems.findIndex(selectedItem => selectedItem === cartItem);
      //   if (index !== -1) {
      //     this.selectedItems.splice(index, 1);
      //   }
      // })     
    }
  }

  addToSelectedItems() {
    // this.cartService.clearCart();
   
    // this.selectedItems.forEach( item => 
      
    //         this.cartService.addToCart(item.item));


    this.selectedOrders.forEach(order =>  this.orderService.changeStatusToApproved(order).subscribe({
      next:()=>{

        console.log("V")
        
      },
      error: (errorResponse) => {
        console.log("X")

      }
    }))


    const selectedOrdersJson = JSON.stringify(this.selectedOrders);
    localStorage.setItem('selectedOrders', selectedOrdersJson);

       this.router.navigateByUrl('/');

   

    // Logic to handle addition to selectedItems if needed
  }
  onInput(event: any, order:Order) {
    order.adminNotes = event.target.innerText ;
  }

  sendNotes(order:Order){
    this.orderService.changeStatusToReject(order).subscribe();
    
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
