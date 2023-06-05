import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId: any;
  data:any;
  constructor(private route: ActivatedRoute,public http:HttpClient) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', this.productId);
this.getProductDetails()
  }

getProductDetails(){
  this.http.get('https://fakestoreapi.com/products/'+this.productId).subscribe(res=>{
    this.data=res;
    console.log(this.data)
    })
}

}
