import {AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-reference-field',
  templateUrl: './reference-field.component.html',
  styleUrls: ['./reference-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReferenceFieldComponent),
      multi: true
    }
  ]
})
export class ReferenceFieldComponent implements ControlValueAccessor, AfterViewInit {
  @Input() refFieldName: string;
  @Input() parentForm: FormGroup;
  @ViewChild('inputValue') input: ElementRef;
  innerValue: any;
  disabled: boolean;
  propagateChange = (_: any) => { };

  constructor() {}

  ngAfterViewInit() {
    this.parentForm.controls.department.valueChanges.subscribe(
    () => {
    const dept = this.parentForm.controls.department.value;
    if (dept  === '' || dept === null || dept === undefined ) {
          this.innerValue = '';
          this.input.nativeElement.value = '';
        }
      }
    );
    this.parentForm.controls.jobrole.valueChanges.subscribe(
      () => {
        const role = this.parentForm.controls.jobrole.value;
        if (role  === '' || role === null || role === undefined ) {
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
