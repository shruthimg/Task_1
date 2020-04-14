import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  myForm: FormGroup;
  empDetail: any;
  columns: any;
  jobRoleOptions: Observable<any>;
  deptOptions: Observable<any>;
  roles: string[] = ['tester', 'developer', 'Business analyst'];
  dept: string[] = ['testing an application', 'developing an application', 'analysing the business'];
 constructor(private fb: FormBuilder) { }
 data = {
   header: {
     rows: [{
       columns: [{name: 'Name', contentModel: {active: false}, styleClass: 'name'},
         {name: 'Start Date', contentModel: {active: false}, styleClass: 'date'},
         {name: 'Job Role', contentModel: {active: false}, styleClass: 'role'},
         {name: 'Department', contentModel: {active: false}, styleClass: 'department'}],
       styleClass: 'header'
     }]
   },
   body: {
     rows: [{
        columns: [
                   {"Name" : {active: false, value: 'Andy'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "tester"}, "Department": {active: false, value: "testing an application"}},
                   {"Name" : {active: false, value: 'Alex'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "tester"}, "Department": {active: false, value: "testing an application"}},
                   {"Name" : {active: false, value: 'Ben'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "tester"}, "Department": {active: false, value: "testing an application"}},
                   {"Name" : {active: false, value: 'Bex'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "tester"}, "Department": {active: false, value: "testing an application"}},
                   {"Name" : {active: false, value: 'Casper'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "tester"}, "Department": {active: false, value: "testing an application"}},

                 ],
        styleClass: 'row'
     }]
   }
 };
  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      startdate: ['', [Validators.required]],
      jobrole: ['', [Validators.required, Validators.minLength(4)]],
      department: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.jobRoleOptions = this.myForm.controls.jobrole.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(),
        startWith(''),
        map(value => this.roles.filter(option => option.toLowerCase().includes(value)))
      );
    this.deptOptions = this.myForm.controls.department.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(),
        startWith(''),
        map(value => this.dept.filter(option => option.toLowerCase().includes(value)))
      );

  }

}
