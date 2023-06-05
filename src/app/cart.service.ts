// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsKey = 'cartItems';

  constructor() { }

  addToCart(item: any) {
    const cartItems = this.getCartItems();
    cartItems.push(item);
    this.saveCartItems(cartItems);
  }

  getCartItems(): any[] {
    const cartItemsString = localStorage.getItem(this.cartItemsKey);
    return cartItemsString ? JSON.parse(cartItemsString) : [];
  }

  clearCart() {
    localStorage.removeItem(this.cartItemsKey);
  }

  private saveCartItems(cartItems: any[]) {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
  }
}
