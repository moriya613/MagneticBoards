import { Component, NgModule } from '@angular/core';
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
  cart!:Cart;
  heightOfBoard = 10; 
  widthOfBoard:number = 20; // Variable to store user input as a number


  heightOptions: number[] = [1,1.5,2];
  widthOptions: number[] = [1,1.5,2];



  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart) => this.cart = cart);
  }

  public onDragEnded(event: CdkDragEnd, imageUrl:string): void {
   
    this.cartService.changePosition(imageUrl,event.source.getFreeDragPosition());
    
  }

}
