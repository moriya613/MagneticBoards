import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../shared/models/Order';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  messageToMail!:string;
  constructor(private cartService:CartService,
              private formBuilder: FormBuilder,
              private orderService:OrderService,
              private router:Router) {
                const cart = cartService.getCheckoutCart();
                this.order.items = cart.items;
                this.order.widthOfBoard = cart.width;
                this.order.heightOfBoard = cart.height;
                this.order.totalPrice = cart.totalPrice;
                this.order.name = this.orderService.getOrderNameFromLocalStorage();
              }

  ngOnInit(): void {
    let name = this.order.name;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],

      // address:[address, Validators.required]
    });
  }

  // get isAdmin () {
  //   return this.userService.currentUser.role === 'admin';
  // }

  get fc(){
    return this.checkoutForm.controls;
  }

 

  createOrder(){
    this.router.navigateByUrl('/send-email');
   this.cartService.getCheckoutCart().items.forEach((item, index) =>  this.messageToMail += index + 'שם המוצר: ' + item.item.name + ', ' + 'גודל המוצר: ' + item.item.width + 'X' + item.item.length + 'כמות: ' + item.quantity + '\n');

  }


  // changeOrdersStatus() {
  //   const orders = this.getFromLocalStorage();
  //   orders.forEach(order =>  this.orderService.changeStatusToApproved(order).subscribe({
  //     next:()=>{

  //       console.log("V")
        
  //     },
  //     error: (errorResponse) => {
  //       console.log("X")

  //     }
  //   }))
  
  // }

  
  // createOrder(){
  //   if(this.checkoutForm.invalid){
  //     this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
  //     return;
  //   }

  //   this.order.name = this.fc.name.value;
  //    this.order.address = 'this.fc.address.value';
  //   this.order.schoolCode = this.userService.currentUser.schoolCode;
  //   this.order.roleOfUser = this.userService.currentUser.role;
  //   this.orderService.create(this.order).subscribe({
  //     next:()=>{
  //       this.cartService.clearCheckoutCart();

  //       //this.changeOrdersStatus();

  //       // if(this.isAdmin) this.router.navigateByUrl('/payment');
  //       // else
  //        this.router.navigateByUrl('/');
  //     },
  //     error: (errorResponse) => {
  //       this.toastrService.error(errorResponse.error, 'Cart');
  //     }
  //   })

  // }
}


