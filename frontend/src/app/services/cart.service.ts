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
  private checkoutCart!:Cart;
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  

  addToCart(item:Item): void{
    let cartItem = this.cart.items.find(x => x.item.id == item.id);
    if(cartItem) {
      let index = this.cart.items.indexOf(cartItem);
      //this.cart.items[index].quantity= this.cart.items[index].quantity+1;
     // this.setCartToLocalStorage();

     // return;
    }
    this.cart.items.push(new CartItem(item));
    this.setCartToLocalStorage();
  }

  mergeCartItems = (cartItems: CartItem[]): CartItem[] => {
    // Define the type of the map object with string keys and CartItem values
    const itemMap: { [key: string]: CartItem } = cartItems.reduce((acc, cartItem) => {
      if (acc[cartItem.item.id]) {
        // If item with the same id exists, add to its quantity
        acc[cartItem.item.id].quantity += cartItem.quantity;
      } else {
        // If item with the same id does not exist, add it
        acc[cartItem.item.id] = { ...cartItem };
      }
      return acc;
    }, {} as { [key: string]: CartItem });
  
    // Convert the map back to an array
    return Object.values(itemMap);
  }


  addToCheckoutCart(cartItem:CartItem){
    if(!this.checkoutCart) {
      this.checkoutCart = new Cart();
    }

    let cItem = this.checkoutCart.items.find(x => x.item.id == cartItem.item.id);
    if(cItem) {
      let index = this.checkoutCart.items.indexOf(cItem);
      this.checkoutCart.items[index].quantity= this.checkoutCart.items[index].quantity+1;

      return;
    }
    this.checkoutCart .items.push(cartItem);
  }

  clearCheckoutCart(){
    this.checkoutCart = new Cart();
  }

  removefromCart(id:string):void{ // remove all instances of this item
    this.cart.items = this.cart.items.filter(x => x.item.id != id);
    this.setCartToLocalStorage();
  }

  removeOneItemfromCart(item:CartItem):void{ // remove one item
    this.cart.items = this.cart.items.filter(x => x != item);
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

  changePosition(item:CartItem, position:Point){
    let cartItem = item;
    if(!cartItem)
      return;
    cartItem.position = '{x:' +position.x+ ', y:' + position.y+ '}';
    this.setCartToLocalStorage();
  }

  updateRotation(item:CartItem, rotation:number){
    item.rotation = rotation
    this.setCartToLocalStorage();
  }

  changeBoardLength(width:number, height:number){
    this.cart.height=height;
    this.cart.width=width;
    this.setCartToLocalStorage;
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart() :Cart{
    return this.cartSubject.value;
  }

  getCheckoutCart():Cart {
    return this.checkoutCart;
  }


  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price * currentItem.quantity, 0);
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
