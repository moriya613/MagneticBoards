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
import {  ElementRef, ViewChild, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-orders-to-confirm',
  templateUrl: './orders-to-confirm.component.html',
  styleUrl: './orders-to-confirm.component.css'
})
export class OrdersToConfirmComponent implements OnInit {
  orders!:Order[];

  @ViewChild('editable-input', { static: true }) editableDiv!: ElementRef;
  ordersForm!: FormGroup;

  private inputSubject = new Subject<{ event: any, index: number }>();

  constructor(private fb: FormBuilder, private router:Router, private orderService:OrderService, userService:UserService,
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

  ngOnInit() {
    // this.ordersForm = this.fb.group({
    //   orders: this.fb.array(this.orders.map(order => this.fb.group({
    //     adminNotes: [order.adminNotes]
    //   })))
    // });

    this.inputSubject.pipe(
      debounceTime(300)
    ).subscribe(({ event, index }) => this.handleInput(event, index));
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

  get ordersControls() {
    return (this.ordersForm.get('orders') as FormArray).controls;
  }

  onInput(event: any, index: number) {
    this.inputSubject.next({ event, index });
  }
  
  handleInput(event: any, index: number) {
    const value = event.target.innerText;
    this.orders[index].adminNotes = value;
    const control = (this.ordersForm.get('orders') as FormArray).at(index);
    control.get('adminNotes')?.setValue(value, { emitEvent: false });
  }

  sendNotes(event: any, order:Order){
    
    const adminNotes = event.target.previousElementSibling.textContent;

      order.adminNotes = adminNotes;
    
    this.orderService.changeStatusToReject(order).subscribe();
    
  }

  public onDragEnded(event: CdkDragEnd, item:CartItem, order:Order): void {
   
    let cartItem =item;
    if(!cartItem)
      return;
    cartItem.position = '{x:' +event.source.getFreeDragPosition().x+ ', y:' + event.source.getFreeDragPosition().y+ '}';
    
  
    //this.orderService.changePosition(imageUrl,event.source.getFreeDragPosition());    
  }
  
  saveAfterEdit(order:Order){
    this.orderService.changeStatusToNew(order).subscribe();
  
  }


}
