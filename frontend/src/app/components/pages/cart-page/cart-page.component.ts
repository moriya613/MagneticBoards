import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!:Cart;
  sizeInCm = 10; 

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart) => this.cart = cart);
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removefromCart(cartItem.item.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.item.id, quantity);
  }

  public onDragEnded(event: CdkDragEnd, imageUrl:string): void {
   
    this.cartService.changePosition(imageUrl,event.source.getFreeDragPosition());
    
  }
}
