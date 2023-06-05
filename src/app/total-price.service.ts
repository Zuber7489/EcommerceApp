import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalPriceService {
  private totalPriceSource = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSource.asObservable();

  constructor() {
    // Retrieve total price from localStorage if available
    const storedTotalPrice = localStorage.getItem('totalPrice');
    if (storedTotalPrice) {
      this.totalPriceSource.next(Number(storedTotalPrice));
    }
  }

  updateTotalPrice(totalPrice: number) {
    // Update total price in the service
    this.totalPriceSource.next(totalPrice);
    // Store total price in localStorage
    localStorage.setItem('totalPrice', String(totalPrice));
  }
}
