import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth:AuthService,public route:Router) { }

  ngOnInit(): void {
  }

  signupForm=new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  })
  
  submitForm(){
   console.log(this.signupForm.value)
   this.auth.postFormData(this.signupForm.value).subscribe(res=>{
alert('Signup Successful')
this.route.navigate(['/login'])   
   })
  }

}
