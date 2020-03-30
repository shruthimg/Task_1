import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reference-field',
  templateUrl: './reference-field.component.html',
  styleUrls: ['./reference-field.component.css']
})
export class ReferenceFieldComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() refFieldName: string;
  @Input() groupName: string;
  refField: FormGroup;
  formName: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formName = this.groupName + 'Field';
    this[this.formName] = this.fb.group({
      refField : new FormControl('', [Validators.required])
    });

    this.parentForm.addControl(this.formName, this[this.formName]);
  }
}
