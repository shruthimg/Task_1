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
       {Name : 'Andy', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {Name : 'Ålex', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {Name : 'Boby', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Bella', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {Name : 'Bex', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {Name : 'Andrew', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Chandler', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {Name : 'Casper', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {Name : 'Daniel', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {Name : 'David', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {Name : 'Joey', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {Name : 'Monica', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Phoebe', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'},
       {Name : 'Rachel', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {Name : 'Ross', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Mike', Start_Date : '11-01-2019', Job_Role :  'developer', Department: 'developing an application'},
       {Name : 'Janice', Start_Date : '12-01-2019', Job_Role :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Susan', Start_Date : '10-01-2019', Job_Role :  'tester', Department: 'testing an application'}
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

  updateList(formValue) {
     this.empDetail = [formValue.firstname,
          formValue.startdate,
          formValue.jobrole,
          formValue.department];

        localStorage.setItem('Updated empDetails', this.empDetail);
        console.log(localStorage.getItem('Updated empDetails'));
        alert("Data Saved!!");
        console.log(formValue);
  }

}
