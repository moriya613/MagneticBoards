import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../shared/models/Order';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-summary',
  templateUrl: './board-summary.component.html',
  styleUrl: './board-summary.component.css'
})
export class BoardSummaryComponent implements OnInit{
  order:Order = new Order();
  checkoutForm!: FormGroup;
  isSubmitted = false;
  constructor(public cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private orderService:OrderService,
              private router:Router) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.widthOfBoard = cart.width;
                this.order.heightOfBoard = cart.height;
                this.order.totalPrice = cart.totalPrice;
              }

  ngOnInit(): void {
    let {name} = this.userService.currentUser;
    let boardName = '';

    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      boardName:[boardName, Validators.required]

      // address:[address, Validators.required]
    });
  }

  get isAdmin () {
    return this.userService.currentUser.role === 'admin';
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  private getFromLocalStorage():Order[]{
    try{
    const orders = localStorage.getItem('selectedOrders');
    if(orders) return JSON.parse(orders) as Order[];
  } catch(exception)
  {
    console.log("ERROR123");
  }

    return [];
  }

  changeOrdersStatus() {
    const orders = this.getFromLocalStorage();
    orders.forEach(order =>  this.orderService.changeStatusToApproved(order).subscribe({
      next:()=>{

        console.log("V")

      },
      error: (errorResponse) => {
        console.log("X")

      }
    }))

  }

  createOrder(){
    this.isSubmitted = true;
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.boardName = this.fc.boardName.value;

     this.order.address = 'this.fc.address.value';
    this.order.schoolCode = this.userService.currentUser.schoolCode;
    this.order.roleOfUser = this.userService.currentUser.role;
    this.orderService.create(this.order).subscribe({
      next:()=>{
        this.cartService.clearCart();

        this.changeOrdersStatus();

        // if(this.isAdmin) this.router.navigateByUrl('/payment');
        // else
         this.router.navigateByUrl('/');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })

  }
}