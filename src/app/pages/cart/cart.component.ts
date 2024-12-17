import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.view.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  stripe: string = 'pk_live_51M1qVWSIkk0x5fD01z5ceus0In9Fa79naeWY6RdUh9Nhe7ZN9WdU0Ro9K0wqYby2UHYgM4Ubvjwh4fhSZXCe3ZCP00jNAMRB8H';

  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name:'sneackers',
    price: 150,
    quantity: 1,
    id: 1,
  },
  {
    product: 'https://via.placeholder.com/150',
    name:'sneackers',
    price: 150,
    quantity: 2,
    id: 1,
  },
  {
    product: 'https://via.placeholder.com/150',
    name:'sneackers',
    price: 150,
    quantity: 1,
    id: 1,
  },
]};

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];
  constructor(private cartService:CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart(){
    this.cartService.onClearCart();
  }
  onRemoveFromCart(items: CartItem): void{
    this.cartService.removeFromCart(items, true);
  }
  onAddQuantity(item: CartItem): void{
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item:CartItem): void{
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void{
    this.http.post('https://stripe.sciaku.com/checkout',{
      items: this.cart.items
    }).subscribe(async (res:any) =>{
      let stripe = await loadStripe(this.stripe);
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
      console.log(res);
    })
  }
}
