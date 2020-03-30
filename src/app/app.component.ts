import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedService} from './shared.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public flag: boolean;
  @Input() public myForm: FormGroup;
  name = 'Name';
  date = 'Start date';
  role = 'Job role';
  dept = 'Department';
  empDetail: any;

  constructor(private sharedService: SharedService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(message => this.flag = message);
    this.myForm = this.fb.group({ });
  }

  onSubmit(formValue) {
    this.empDetail = [formValue.textField.textField,
      formValue.dateField.dateField,
      formValue.roleForm.refField,
      formValue.deptForm.refField];

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
