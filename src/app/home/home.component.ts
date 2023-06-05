import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any;
  meradata:any;
  originalData: any;
  selectedCategory: string = 'All';
  
  constructor(public http: HttpClient,private cartService:CartService) { }
  
  ngOnInit(): void {
   this.getData()
  }
  
  getData(){
    this.http.get('https://fakestoreapi.com/products').subscribe((res: any) => {
      this.data = res;
      this.originalData = res;
      console.log(this.data);
    });
  }

  filteredData() {
    if (this.selectedCategory === 'All') {
      this.getData() // Return the original unfiltered data
    } else {
      this.data = this.originalData.filter((item: any) => item.category === this.selectedCategory);
    }
  }
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log(product)
  }  

  getCartItemCount() {
    return this.cartService.getCartItems().length;
  }

}
