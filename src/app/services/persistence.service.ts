import { Injectable } from '@angular/core';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  saveState(state: Query) {
    localStorage['invoice-calculator'] = JSON.stringify(state);
  }

  loadState() {
    if (localStorage['invoice-calculator']) {
      return Query.fromJSON(JSON.parse(localStorage['invoice-calculator']));
    }
  }
}
