import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http:HttpClient) { }

postFormData(id:any){
  return this.http.post('https://database-crud.onrender.com/sign',id)
}
getFormData(id:any){
  return this.http.get('https://database-crud.onrender.com/sign',id)
}

}
