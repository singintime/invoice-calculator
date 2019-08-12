import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl = 'http://private-anon-d4381faec1-byrd1.apiary-mock.com';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get(this.apiUrl + '/customers').pipe(
      map((data: any[]) => data.map(item => Customer.fromJSON(item)))
    );
  }

  getOrders(customerId: string, startDate: Date, endDate: Date): Observable<Order[]> {
    return this.http.get(this.apiUrl + '/orders/' + customerId +
                         '?start_date=' + formatDate(startDate, 'yyyy-MM-dd', 'en-US') +
                         '&end_date=' + formatDate(endDate, 'yyyy-MM-dd', 'en-US')).pipe(
      map((data: any[]) => data.map(item => Order.fromJSON(item)))
    );
  }

}
