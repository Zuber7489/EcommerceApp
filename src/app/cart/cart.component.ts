import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TotalPriceService } from '../total-price.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalprice: any;
  hide: boolean = false;
  appliedcouponprice: any;
  appliedfinalcouponprice: any;
  incrementprice: any;
  decrementprice: any;
  paymentHandler: any = null;
  stripeAPIKey: any = 'pk_test_51NJARiSD2oveXp5BgZzKoND7vJoGH7lB2qZcNaYxJQSaa5ztU2o0KzXGpVgHieEwpl044ewb1tlhkMVdCITmEOaG00d7zxX1wj';
  cartItems: any[] = [];
  paymentSuccessful: boolean = false; // Flag variable to track payment status

  couponForm = new FormGroup({
    coupon: new FormControl('')
  })

  constructor(
    public cartService: CartService,
    private totalPriceService: TotalPriceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems);
    this.loadCartItems();
    this.invokeStripe();
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (let item of this.cartItems) {
      totalPrice += item.price;
    }
    this.totalprice = totalPrice + 0;
    this.totalPriceService.updateTotalPrice(this.totalprice);
    return Number(totalPrice.toFixed(2));
  }

  submit() {
    if (this.couponForm.value.coupon == 'WIN100') {
      const discount = this.calculateTotalPrice() * 0.1; // Calculate 10% discount
      this.appliedcouponprice = this.calculateTotalPrice() - discount;
      this.appliedfinalcouponprice = Number(this.appliedcouponprice.toFixed(2));
      console.log(this.couponForm.value.coupon)
      this.hide = true;
    } else {
      this.appliedcouponprice = this.totalprice;
      alert('Invalid coupon');
    }
  }

  private loadCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    } else {
      this.cartItems = this.cartService.getCartItems();
      this.updateLocalStorage(); // Initial storage of cart items
    }
  }

  removeItem(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotalPrice();
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  counter: number = 1;

  increment(item: any) {
    this.counter++;
    item.price = item.price + item.price;
    this.incrementprice = item.price;
  }

  decrement(item: any) {
    if (item.price > 1) {
      this.counter--;
      item.price -= 1;
    }
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',

      token: (stripeToken: any) => {
        console.log(stripeToken);
        alert('Payment is Successful');
        this.paymentSuccessful = true; // Set payment status to true
        this.router.navigate(['/invoice']); // Navigate to invoice page
      },
    });

    paymentHandler.open({
      name: 'Zuber Shaikh',
      description: 'This is just a test mode.',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');

      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            alert('Payment has been successful!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
