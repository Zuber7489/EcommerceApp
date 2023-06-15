import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { TotalPriceService } from '../total-price.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  cartItems:any[] = [];
  price:any;
  signinDetails:any;
  date=new Date()
  addressData: any;
  constructor(public cartService:CartService, private totalPriceService: TotalPriceService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
this.gettotalprice()
const storedAddressData = localStorage.getItem('addressData');
if (storedAddressData) {
  const parsedAddressData = JSON.parse(storedAddressData);
  // Use the parsedAddressData as needed
  console.log(parsedAddressData);
  this.addressData = parsedAddressData;
}    

  }
  

gettotalprice(){
  this.totalPriceService.totalPrice$.subscribe(totalPrice => {
    // Use the total price value in this component
    this.price=totalPrice;
    console.log('Total Price:', totalPrice);
  });
}



printInvoice(){
  window.print();
}

}
