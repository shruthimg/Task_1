import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {SharedService} from './shared.service';
import {FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {TextFieldComponent} from './text-field/text-field.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flag: boolean;
  name = 'Name';
  date = 'Start date';
  role = 'Job role';
  dept = 'Department';
  empDetail: any;
  myForm: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(message => this.flag = message);

    this.myForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      startdate: ['', [Validators.required]],
      jobrole: ['', [Validators.required, Validators.minLength(4)]],
      department: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(formValue) {
    this.empDetail = [formValue.firstname,
      formValue.startdate,
      formValue.jobrole,
      formValue.department];

    localStorage.setItem('empDetails', this.empDetail);
    console.log(localStorage.getItem('empDetails'));
    console.log(formValue);
  }

  close() {
    this.flag = false;
    this.myForm.reset();
    this.sharedService.nextMessage(false);
  }
}
