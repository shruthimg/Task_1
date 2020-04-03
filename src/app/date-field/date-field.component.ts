import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap';

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

  constructor() {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(1993, 0, 1),
        maxDate: new Date(),
        dateInputFormat: 'DD-MM-YYYY'
      });
  }
  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }
  @Input() dateFieldName: string;
  @Input() parentForm: FormGroup;
  @ViewChild('inputValue') input: ElementRef;
  innerValue: any;
  disabled: boolean;
  datePickerConfig: Partial<BsDatepickerConfig>;
  propagateChange = (_: any) => { };

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

  dateChanged = (e: Date): void => {
    if (e) {
      this.propagateChange(e);
    }
  }
}
