import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackbar: MatSnackBar) { }


  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    }
    else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackbar.open('1 item added to cart.', 'Ok', { duration: 3000 });
    // console.log(this.cart.value);
    
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  onClearCart(): void {
    this.cart.next({ items: [] });
    this._snackbar.open('Cart is cleared', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items
      .filter((_item) => _item.id !== item.id);
    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackbar.open('1 Item removed from cart', 'Ok', { duration: 3000 });
    }
    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      _item.quantity--;
      if (_item.quantity === 0) {
        itemForRemoval = _item;
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, true);
    }
    this._snackbar.open('1 item removed from cart','Ok',{duration:3000})
  }

}
