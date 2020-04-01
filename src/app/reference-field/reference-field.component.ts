import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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
export class ReferenceFieldComponent implements ControlValueAccessor {
  @Input() refFieldName: string;
  @ViewChild('inputValue') input: ElementRef;
  value: string;
  disabled: boolean;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {}

  writeValue(value: string) {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onInput() {
    this.value = this.input.nativeElement.value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
