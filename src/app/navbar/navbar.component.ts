import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isloggedOut: boolean = false;

  constructor(public auth: AuthService, public router:Router,public cartService:CartService) { }
  data: any;
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    console.log(userData);
    if (userData) {
      this.isloggedOut = true;
    }
  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  getCartItemCount() {
    return this.cartService.getCartItems().length;
  }
  

}
