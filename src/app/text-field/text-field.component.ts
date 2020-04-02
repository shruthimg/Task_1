import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnChanges, ViewChild} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent implements ControlValueAccessor, AfterViewInit {
  @Input() parentForm: FormGroup;
  @Input() textFieldName: string;
  @ViewChild('inputValue') input: ElementRef;
  innerValue: any;
  disabled: boolean;
  propagateChange = (_: any) => { };

  constructor() {}

  ngAfterViewInit() {
    this.parentForm.controls.firstname.valueChanges.subscribe(
      () => {
        if (this.parentForm.controls.firstname.value === '' || this.parentForm.controls.firstname.value === null ||
          this.parentForm.controls.firstname.value === undefined) {
          this.innerValue = '';
          this.input.nativeElement.value = '';
        }
      }
    );
  }
  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  writeValue(value: string) {
    this.innerValue = value;
  }
  onChange(e: Event, value: any) {
    this.innerValue = value;
    this.propagateChange(this.innerValue);
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  onInput() {
    console.log('Input value', this.input.nativeElement.value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
