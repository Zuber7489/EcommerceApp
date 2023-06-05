import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TotalPriceService } from '../total-price.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
total:any;
  constructor(private totalPriceService: TotalPriceService,public router:Router,public carddetails:AuthService) { }

  ngOnInit(): void {
    this.totalPriceService.totalPrice$.subscribe(totalPrice => {
      // Use the total price value in this component
      this.total=totalPrice;
      console.log('Total Price:', totalPrice);
    });
  }

  paymentForm=new FormGroup({
    NameOnCard: new FormControl('',Validators.required),
    Email: new FormControl('',Validators.required),
    CreditCardNumber : new FormControl('',Validators.required),
    ExpiryDate: new FormControl('',Validators.required),
    SecurityCode:new FormControl('',Validators.required),
    ZIPCode:new FormControl('',Validators.required)
  })

  paymentalert(){
    
      alert('Payment done')
      this.router.navigate(['/invoice'])
      console.log(this.paymentForm.value)
    }
   
  }


  

