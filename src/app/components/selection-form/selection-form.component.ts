import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../../models/customer';
import { Query } from '../../models/query';
import { ApiService } from 'src/app/services/api.service';
import { PersistenceService } from 'src/app/services/persistence.service';

@Component({
  selector: 'app-selection-form',
  templateUrl: './selection-form.component.html',
  styleUrls: ['./selection-form.component.css']
})
export class SelectionFormComponent implements OnInit {

  public customers: Customer[];

  public customerId = new FormControl('', Validators.required);
  public startDate = new FormControl(new Date(), Validators.required);
  public endDate = new FormControl(new Date(), Validators.required);
  public selectionForm = new FormGroup({
    customerId: this.customerId,
    startDate: this.startDate,
    endDate: this.endDate
  });

  @Output() public submitted = new EventEmitter<Query>();

  constructor(private api: ApiService, private persistence: PersistenceService) { }

  ngOnInit() {

    this.startDate.valueChanges.subscribe(value => {
      if (value > this.endDate.value) {
        this.endDate.setValue(value);
      }
    });

    this.endDate.valueChanges.subscribe(value => {
      if (value < this.startDate.value) {
        this.startDate.setValue(value);
      }
    });

    this.api.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.customerId.setValue(this.customers[0].id);
      const savedState = this.persistence.loadState();
      if (savedState) {
        this.customerId.setValue(savedState.customerId);
        this.startDate.setValue(savedState.startDate);
        this.endDate.setValue(savedState.endDate);
        this.onSubmit();
      }
    });


  }

  onSubmit() {
    const query = new Query(this.customerId.value, this.startDate.value, this.endDate.value);
    this.persistence.saveState(query);
    this.submitted.emit(query);
  }

}
