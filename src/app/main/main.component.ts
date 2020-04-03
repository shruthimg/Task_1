import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 constructor() { }
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
       {Name : 'Andy', 'Start Date' : '10/01/2019', 'Job Role' :  'tester', Department: 'testing an application'},
       {Name : 'Ålex', 'Start Date' : '11/01/2019', 'Job Role' :  'developer', Department: 'developing an application'},
       {Name : 'Boby', 'Start Date' : '12/01/2019', 'Job Role' :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Bella', 'Start Date' : '10-01-2019', 'Job Role' :  'tester', Department: 'testing an application'},
       {Name : 'Bex', 'Start Date' : '11-01-2019', 'Job Role' :  'developer', Department: 'developing an application'},
       {Name : 'Andrew', 'Start Date' : '12-01-2019', 'Job Role' :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Chandler', 'Start Date' : '10-01-2019', 'Job Role' :  'tester', Department: 'testing an application'},
       {Name : 'Casper', 'Start Date' : '11-01-2019', 'Job Role' :  'developer', Department: 'developing an application'},
       {Name : 'Daniel', 'Start Date' : '12-01-2019', 'Job Role' :  'Business analyst', Department: 'analysing the business'},
       {Name : 'David', 'Start Date' : '10-01-2019', 'Job Role' :  'tester', Department: 'testing an application'},
       {Name : 'Joey', 'Start Date' : '11-01-2019', 'Job Role' :  'developer', Department: 'developing an application'},
       {Name : 'Monica', 'Start Date' : '12-01-2019', 'Job Role' :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Phoebe', 'Start Date' : '10-01-2019', 'Job Role' :  'tester', Department: 'testing an application'},
       {Name : 'Rachel', 'Start Date' : '11-01-2019', 'Job Role' :  'developer', Department: 'developing an application'},
       {Name : 'Ross', 'Start Date' : '12-01-2019', 'Job Role' :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Mike', 'Start Date' : '11-01-2019', 'Job Role' :  'developer', Department: 'developing an application'},
       {Name : 'Janice', 'Start Date' : '12-01-2019', 'Job Role' :  'Business analyst', Department: 'analysing the business'},
       {Name : 'Susan', 'Start Date' : '10-01-2019', 'Job Role' :  'tester', Department: 'testing an application'}
     ]
   }
 };
  ngOnInit(): void { }
}
