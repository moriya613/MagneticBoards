import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WarningDialogComponent } from '../../partials/warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../services/order.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  errorMessage='';
  message:string ='';
  constructor(private formBuilder:FormBuilder,
     private userService:UserService,
     private orderService:OrderService,
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private dialog: MatDialog){

  }

  ngOnInit():void{
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }


  //loginForn.controls.email => fc.email
  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;
   this.userService.login({email:this.fc.email.value, password: this.fc.password.value})
   .subscribe({
    next: (v) =>  { 
      if(v.isSuperAdmin) {

        this.getWaitingListMessage();
      }
      this.router.navigateByUrl(this.returnUrl);
      
    },
    error: (e) => this.errorMessage = localStorage.getItem("ERROR") || "",
});
  
  } 


  getUserRegistered(schoolCode:string):IUserRegister {

    const userRegister:IUserRegister = {name: "xxx",
    email: "xxx",
    password: "xxx",
    confirmPassword: "xxx",
    address: "xxx",
    schoolCode: schoolCode,
    schoolName: "xxx",
    role: "xxx",
    grade: "xxx",
    schoolCharacter: "xxx"};

    return userRegister;

  }

  sum:number=0;
  getWaitingListMessage()  {
    this.userService.getAllAdmins().subscribe(
      users => {
          const adminUsers = users;
          const schollNames = users.map(user => `${user.schoolCode}, ${user.schoolName}, ${user.address}`);

          schollNames.forEach((currentValue) => {
                const schoolCode =  currentValue.split(',')[0];
                this.sum=0;

                this.orderService.getAllOrdersBySchoolCode(this.getUserRegistered(schoolCode))
                .subscribe({
                    next: (orders) =>  {
                      orders.forEach((order) => {
                        if(order.status == 'APPROVED') 
                          this.sum= this.sum +1;
                      })

                    if (this.sum > 0) {
                      this.message =  ' יש לך ' + this.sum  + 'לוחות הממתינות לאישורך של בית ספר ' + currentValue + '\n';
                      const dialogRef = this.dialog.open(WarningDialogComponent, {
                      data: { message: this.message }             });
                    }
                    },

                  error: (e) => this.errorMessage = localStorage.getItem("ERROR") || "",
                });

                 
                  
          })
      })
  }
      
}

