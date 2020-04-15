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
  tableForm: FormGroup;
  empDetail: any;
  columns: any;
  jobRoleOptions: Observable<any>[];
  deptOptions: Observable<any>[];
  roles: string[] = ['tester', 'developer', 'Business analyst'];
  dept: string[] = ['testing an application', 'developing an application', 'analysing the business'];

  constructor(private fb: FormBuilder) {
      this.tableForm = this.fb.group({
        memberDetails: this.fb.array([])
      });
   }
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
                   {"Name" : {active: false, value: 'Andy'}, "Start Date" : {active: false, value: '01-07-2015'}, "Job Role" :  {active: false, value: "Developer"}, "Department": {active: false, value: "Developing an application"}},
                   {"Name" : {active: false, value: 'Alex'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "Tester"}, "Department": {active: false, value: "Testing an application"}},
                   {"Name" : {active: false, value: 'Ben'}, "Start Date" : {active: false, value: '10-07-2019'}, "Job Role" :  {active: false, value: "Business analyst"}, "Department": {active: false, value: "Analysing the application"}},
                   {"Name" : {active: false, value: 'Bex'}, "Start Date" : {active: false, value: '01-07-2017'}, "Job Role" :  {active: false, value: "Developer"}, "Department": {active: false, value: "Developing an application"}},
                   {"Name" : {active: false, value: 'Casper'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "Tester"}, "Department": {active: false, value: "Testing an application"}},
                   {"Name" : {active: false, value: 'Joey'}, "Start Date" : {active: false, value: '01-07-2020'}, "Job Role" :  {active: false, value: "Business analyst"}, "Department": {active: false, value: "Analysing the application"}},
                   {"Name" : {active: false, value: 'Monica'}, "Start Date" : {active: false, value: '01-07-2017'}, "Job Role" :  {active: false, value: "Developer"}, "Department": {active: false, value: "Developing an application"}},
                   {"Name" : {active: false, value: 'Phoebe'}, "Start Date" : {active: false, value: '01-07-2015'}, "Job Role" :  {active: false, value: "Tester"}, "Department": {active: false, value: "Testing an application"}},
                   {"Name" : {active: false, value: 'Rachel'}, "Start Date" : {active: false, value: '01-07-2018'}, "Job Role" :  {active: false, value: "Business analyst"}, "Department": {active: false, value: "Analysing the application"}},
                   {"Name" : {active: false, value: 'Ross'}, "Start Date" : {active: false, value: '01-07-2014'}, "Job Role" :  {active: false, value: "Developer"}, "Department": {active: false, value: "Developing an application"}},

                 ],
        styleClass: 'row'
     }]
   }
 };
  ngOnInit(): void {
    this.tableForm = this.fb.group({
        memberDetails: this.fb.array(
          this.data.body.rows[0].columns.map(x => this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(4)]],
            startdate: ['', [Validators.required]],
            jobrole: ['', [Validators.required, Validators.minLength(4)]],
            department: ['', [Validators.required, Validators.minLength(4)]]
          }))
        )
      })

      this.jobRoleOptions = this.tableForm.controls.memberDetails.controls[0].controls.jobrole.valueChanges
            .pipe(debounceTime(200), distinctUntilChanged(),
              startWith(''),
              map(value => this.roles.filter(option => option.toLowerCase().includes(value)))
            );
      this.deptOptions = this.tableForm.controls.memberDetails.controls[0].controls.department.valueChanges
            .pipe(debounceTime(200), distinctUntilChanged(),
              startWith(''),
              map(value => this.dept.filter(option => option.toLowerCase().includes(value)))
            );

    }

     onBlur(event: any, col: any, i: number) {
        this.data.body.rows[0].columns[i][col].active = !(this.data.body.rows[0].columns[i][col].active);
        if(event.target.value !== null && event.target.value !== '' && event.target.value !== undefined) {
          this.data.body.rows[0].columns[i][col].value = event.target.value;
        }
     }

     onDateBlur(event: any, col: any, i: number) {
        //this.data.body.rows[0].columns[i][col].active = !(this.data.body.rows[0].columns[i][col].active);
        if(event.target.value !== null && event.target.value !== '' && event.target.value !== undefined) {
             this.data.body.rows[0].columns[i][col].value = event.target.value;
        }
     }
}
