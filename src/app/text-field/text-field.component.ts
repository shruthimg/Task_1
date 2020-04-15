import {Component, ElementRef, forwardRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

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
export class TextFieldComponent implements ControlValueAccessor {
  @Input() textFieldName: string;
  @ViewChild('inputValue') input: ElementRef;
  @Output() messageEvent = new EventEmitter<any>();
  @Input() innerValue: any;
  disabled: boolean;
  propagateChange = (_: any) => { };

  constructor() {}

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
    //  this.innerValue = value;
    }
  }
  writeValue(value: string) {
    //this.innerValue = value ? value : '';
  }
  onChange(e: Event, value: any) {
    this.innerValue = value;
    this.propagateChange(this.innerValue);
    this.messageEvent.emit(e);
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
