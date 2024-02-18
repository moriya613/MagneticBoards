import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../shared/models/Item';
import { CartItem } from '../shared/models/CartItem';
import { Point } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  addToCart(item:Item): void{
    let cartItem = this.cart.items.find(x => x.item.id == item.id);
    if(cartItem)
      return;
    this.cart.items.push(new CartItem(item));
    this.setCartToLocalStorage();
  }

  removefromCart(id:string):void{
    this.cart.items = this.cart.items.filter(x => x.item.id != id);
    this.setCartToLocalStorage();
  }

  changeQuantity(id:string, quantity: number): void{
    let cartItem = this.cart.items.find(x=> x.item.id == id);
    if(!cartItem)
      return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.item.price;
    this.setCartToLocalStorage();
  }

  changePosition(imageUrl:string, position:Point){
    let cartItem = this.cart.items.find(x=> x.item.imageUrl == imageUrl);
    if(!cartItem)
      return;
    cartItem.position = position;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
   try{
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();

   } catch(exception){
      return new Cart();
   }
  }

  constructor() { }
}
