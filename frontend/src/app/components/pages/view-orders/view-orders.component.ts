import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { CartItem } from '../../../shared/models/CartItem';
import { Point } from '@angular/cdk/drag-drop';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent implements OnInit  {
  
  orders!:Order[];
  users!: IUserRegister[];
  schoolCode:string = '999';
  schollNames:string []=[''];
  @ViewChild('schoolSelect') schoolSelect!: ElementRef;


  constructor( private orderService:OrderService, private userService:UserService,){                   

  }

  ngOnInit(): void {
    this.userService.getAllAdmins().subscribe(
      users => {
          this.users = users;
          this.schollNames = this.users.map(user => `${user.schoolCode}, ${user.schoolName}, ${user.address}`);
          
          this.schollNames = [" ", ...this.schollNames];

      }
    )
  }

  

  public onSelectChange(event: any): void {

    if(!this.schoolSelect.nativeElement.value)
      return;

    this.schoolCode = this.schoolSelect.nativeElement.value .split(',')[0];

    const userRegister:IUserRegister = {name: "xxx",
      email: "xxx",
      password: "xxx",
      confirmPassword: "xxx",
      address: "xxx",
      schoolCode: this.schoolCode,
      schoolName: "xxx",
      role: "xxx",
      grade: "xxx",
      schoolCharacter: "xxx"};

      this.orderService.getAllOrdersBySchoolCode(userRegister).subscribe(
        orders => {
          this.orders =orders;
        }
      )
         
      

    console.log(this.schollNames);
   
    
  }



 


}
