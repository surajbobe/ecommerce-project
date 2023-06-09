import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){

    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem:CartItem = undefined;  

    if(this.cartItems.length > 0){

      // find the item in the cart based on item id
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    
    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }

  decrementItemQuantity(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity == 0){
      this.removeCartItem(theCartItem);
    }

    this.computeCartTotals();
  }

  removeCartItem(theCartItem: CartItem){

    const itemIndex =  this.cartItems.findIndex( tempCartItem => theCartItem.id == tempCartItem.id);

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for( let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //public the new values....all subscriber will receive the value
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data for debugging
    this.logCardData(totalPriceValue,totalQuantityValue);
  }

  logCardData(totalPriceValue: number, totalQuantityValue: number){
    console.log("Contents of cart");
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity ${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subtotalPrice= ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log('------------------------------------------------------------------------------------')
  }
  
  
}
