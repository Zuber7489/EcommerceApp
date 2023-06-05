import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
id:any;
user:any;
  loginForm=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

  constructor(public auth:AuthService , public router:Router) { }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.loginForm.value)
    this.auth.getFormData(this.loginForm.value).subscribe((res:any)=>{
     this.user= res.find((user:any)=>{
     return user.email===this.loginForm.value.email && user.password===this.loginForm.value.password;
     });if(this.user){
      alert('Login Successful');
      localStorage.setItem(`user`,JSON.stringify(this.user))
      this.router.navigate(['/'])
     }else{
      alert('Please check Email & Password');
     }
    })
  }

}
