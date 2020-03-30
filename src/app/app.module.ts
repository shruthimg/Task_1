import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { DateFieldComponent } from './date-field/date-field.component';
import { ReferenceFieldComponent } from './reference-field/reference-field.component';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import {ModalComponent} from './modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    MainComponent,
    ModalComponent,
    TextFieldComponent,
    DateFieldComponent,
    ReferenceFieldComponent,
    ButtonComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
