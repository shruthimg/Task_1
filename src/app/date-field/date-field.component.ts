import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    }
  ]
})
export class DateFieldComponent implements ControlValueAccessor, AfterViewInit {
  @Input() dateFieldName: string;
  @Input() parentForm: FormGroup;
  @ViewChild('inputValue') input: ElementRef;
  innerValue: any;
  disabled: boolean;
  propagateChange = (_: any) => { };

  constructor() {}

  ngAfterViewInit() {
    this.parentForm.controls.startdate.valueChanges.subscribe(
      () => {
        if (this.parentForm.controls.startdate.value === '' || this.parentForm.controls.startdate.value === null ||
          this.parentForm.controls.startdate.value === undefined) {
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
