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
  heightOfBoard:number = 12; 
  widthOfBoard:number = 10; // Variable to store user input as a number


  widthOptions: number[] = [1, 1.2, 1.5, 2, 2.2, 2.4, 2.7, 3, 3.2, 3.5, 4, 4.4, 4.6, 4.8];



  constructor(private cartService:CartService){

    //this.cartService.changeBoardLength(this.widthOfBoard, this.heightOfBoard);

    this.cartService.getCartObservable().subscribe((cart) => this.cart = cart);
    if(this.cart.height)    this.heightOfBoard = this.cart.height;
    if (this.cart.width)    this.widthOfBoard = this.cart.width;
  }

  public onDragEnded(event: CdkDragEnd, imageUrl:string): void {
   
    this.cartService.changePosition(imageUrl,event.source.getFreeDragPosition());
    

  }

  public onSelectChange(event: any): void {
    this.widthOfBoard = this.widthSelect.nativeElement.value ;
    this.cartService.changeBoardLength(this.widthOfBoard, this.heightOfBoard);
   
    
  }

}
