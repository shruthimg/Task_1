import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.css']
})
export class DateFieldComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() dateFieldName: string;
  dateField: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dateField = new FormGroup({
      datefield: new FormControl('', Validators.required)
    });
    this.parentForm.addControl('dateField', this.dateField);
  }
}
