import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements ControlValueAccessor {

  @Input() textFieldName: string;
  @Input() value: string;

  constructor(private fb: FormBuilder) {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
