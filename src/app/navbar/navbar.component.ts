import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isloggedOut: boolean = false;
  searchForm=new FormGroup({
    searchValue:new FormControl('')
  })

  constructor(public auth: AuthService, public router:Router,public cartService:CartService,public http:HttpClient) { }
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
  
searchData(){
  this.cartService.searchCategory(this.searchForm.value.searchValue).subscribe(res=>{
    console.log(res)
  })
}

}
