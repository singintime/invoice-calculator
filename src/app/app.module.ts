import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SelectionFormComponent } from './components/selection-form/selection-form.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ApiService } from './services/api.service';
import { PersistenceService } from './services/persistence.service';

@NgModule({
  declarations: [
    AppComponent,
    SelectionFormComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, PersistenceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
