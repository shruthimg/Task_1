import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() textFieldName: string;
  textField: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.textField = new FormGroup({
      textField: new FormControl('', [Validators.required])
    });
    this.parentForm.addControl('textField', this.textField);
  }
}
