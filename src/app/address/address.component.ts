import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addAddressForm=new FormGroup({
  name:new FormControl(''),
  email:new FormControl(''),
  city:new FormControl(''),
  address:new FormControl(''),
  zipcode:new FormControl(''),
})

  constructor(public router:Router) { }

  ngOnInit(): void {
  }


  addAddress() {
    console.log(this.addAddressForm.value);
    alert('Address Added Successfully');
    localStorage.setItem('addressData', JSON.stringify(this.addAddressForm.value));
    this.router.navigate(['/payment']);
  }
  
}
