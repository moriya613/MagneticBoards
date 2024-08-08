import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItem } from '../../../shared/models/CartItem';



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

  public onDragEnded(event: CdkDragEnd, item:CartItem): void {
   
    this.cartService.changePosition(item,event.source.getFreeDragPosition());    
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


  
  public onSelectChange(event: any): void {
    this.widthOfBoard = this.widthSelect.nativeElement.value ;
    this.cartService.changeBoardLength(this.widthOfBoard, this.heightOfBoard);
   
    
  }

}
