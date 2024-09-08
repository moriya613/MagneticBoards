import { ChangeDetectorRef, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, Point } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItem } from '../../../shared/models/CartItem';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit{


  @ViewChild('widthSelect') widthSelect!: ElementRef;
  @ViewChild('lengthSelect') lengthSelect!: ElementRef;


  cart!:Cart;
  selectedItem: CartItem | null = null;
  heightOfBoard:number = 12; 
  widthOfBoard:number = 10; // Variable to store user input as a number


  widthOptions: number[] = [1, 1.2, 1.5, 2, 2.2, 2.4, 2.7, 3, 3.2, 3.5, 4, 4.4, 4.6, 4.8];



  constructor(private cartService:CartService, private cdr: ChangeDetectorRef, private ngZone: NgZone){

    //this.cartService.changeBoardLength(this.widthOfBoard, this.heightOfBoard);

    this.cartService.getCartObservable().subscribe((cart) => this.cart = cart);
    if(this.cart.height)    this.heightOfBoard = this.cart.height;
    if (this.cart.width)    this.widthOfBoard = this.cart.width;
  }

  onDoubleClick(item: CartItem): void {
    this.cartService.updateRotation(item, (item.rotation + 45) % 360); // Save the new rotation
    this.cdr.detectChanges(); // Ensure changes are detected
  }

  getTransformStyle(item: CartItem): string {
    const rotation = `rotate(${item.rotation}deg)`;
    return `${rotation}`;
  }

  getRotation(rotation: number): string {
    return `rotate(${rotation}deg)`;
  }

  onDragEnded(event: CdkDragEnd, item: CartItem): void {
    this.cartService.changePosition(item, event.source.getFreeDragPosition());  
  }

  onDragStarted(event: CdkDragStart, item: CartItem){
    this.selectedItem = item;
  }

 
  ngOnInit(): void {
    // Load cart items including their rotation values
    this.cartService.getCartObservable().subscribe(cart => {
      this.cart = cart;

    });

  }

  EmptyBoard() {
    this.cartService.clearCart();
    }

  removeItem(): void {
    // Call the service to remove the item
    if(this.selectedItem != null)
       this.cartService.removeOneItemfromCart(this.selectedItem);

    this.selectedItem = null;
  }

  getPosition(stringPoint: string): Point {
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
