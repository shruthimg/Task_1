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
  @Input() column: any;
  jobRoleOptions: Observable<any>;
  deptOptions: Observable<any>;
  roles: string[] = ['tester', 'developer', 'Business analyst'];
  dept: string[] = ['testing an application', 'developing an application', 'analysing the business'];
 constructor(private fb: FormBuilder) { }
 data = {
   header: {
     rows: [{
       columns: [{name: 'Name', styleClass: 'name'},
         {name: 'Start Date', styleClass: 'date'},
         {name: 'Job Role', styleClass: 'role'},
         {name: 'Department', styleClass: 'department'}],
       styleClass: 'header'
     }]
   },
   body: {
     rows: [
       {id: 1, Name : 'Andy', Start_Date : '10/01/2019', Job_Role :  'tester', Department: 'testing an application'},
       {id: 2, Name : 'Ålex', Start_Date : '11/01/2019', Job_Role :  'developer', Department: 'developing an application'},
       {id: 3, Name : 'Boby', Start_Date : '12/01/2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {id: 4, Name : 'Bella', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {id: 5, Name : 'Bex', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {id: 6, Name : 'Andrew', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {id: 7, Name : 'Chandler', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {id: 8, Name : 'Casper', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {id: 9, Name : 'Daniel', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {id: 10, Name : 'David', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {id: 11, Name : 'Joey', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {id: 12, Name : 'Monica', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {id: 13, Name : 'Phoebe', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {id: 14, Name : 'Rachel', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {id: 15, Name : 'Ross', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {id: 16, Name : 'Mike', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {id: 17, Name : 'Janice', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {id: 18, Name : 'Susan', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'}
     ]
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

  Onblur() {

  }
}
