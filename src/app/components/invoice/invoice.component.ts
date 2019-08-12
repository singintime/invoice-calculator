import { Component, OnInit } from '@angular/core';
import { Query } from '../../models/query';
import { Order, TotalPrice } from '../../models/order';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  public orders: Order[];
  public query: Query;

  constructor(private api: ApiService) { }

  get invoiceAmount() {
    const currencies = {};
    for (const order of this.orders) {
      const currency = order.chargeCustomer.currency;
      const amount = +order.chargeCustomer.totalPrice;
      if (!currencies[currency]) { currencies[currency] = 0; }
      currencies[currency] += amount;
    }
    return Object.keys(currencies).sort().map(key => new TotalPrice(key, currencies[key]));
  }

  ngOnInit() {
  }

  update(event: Query) {
    this.query = event;
    this.api.getOrders(event.customerId, event.startDate, event.endDate).subscribe((orders) => {
      this.orders = orders;
    });
  }

}
