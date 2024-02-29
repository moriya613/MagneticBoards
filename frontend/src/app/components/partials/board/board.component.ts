import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  @ViewChild('widthSelect') widthSelect!: ElementRef;
  @ViewChild('lengthSelect') lengthSelect!: ElementRef;


  cart!:Cart;
  heightOfBoard = 10; 
  widthOfBoard:number = 10; // Variable to store user input as a number


  heightOptions: number[] = [1,1.5,1.7,2];
  widthOptions: number[] = [1,1.5,1.7, 2];



  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart) => this.cart = cart);
    if(this.cart.height)    this.heightOfBoard = this.cart.height;
    if (this.cart.width)    this.widthOfBoard = this.cart.width;
  }

  public onDragEnded(event: CdkDragEnd, imageUrl:string): void {
   
    this.cartService.changePosition(imageUrl,event.source.getFreeDragPosition());
    
  }

  public onSelectChange(event: any): void {
    this.widthOfBoard = this.widthSelect.nativeElement.value ;
    this.heightOfBoard = this.lengthSelect.nativeElement.value ;
    this.cartService.changeBoardLength(this.widthOfBoard, this.heightOfBoard);
   
    
  }

}
