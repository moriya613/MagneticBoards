import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.css'
})
export class WarningDialogComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },private userService:UserService, private orderService:OrderService,public dialogRef: MatDialogRef<WarningDialogComponent>) {
  

  }
  

    
    
  }



