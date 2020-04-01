import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';
import {TableRow} from '../table/table.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  headers: any[];
  rows: any = [];

  data = {
    header: {
      rows: ['Name', 'Start Date', 'Job Role', 'Department']
    },
    body: {
      rows: { tablecolumn: [
          {'Name' : 'Andy', 'Start Date' : '10/01/2019', 'Job Role' : 'tester', 'Department': 'testing an application'},
          {'Name' : 'Ålex', 'Start Date' : '11/01/2019', 'Job Role' : 'developer', 'Department': 'developing an application'},
          {'Name' : 'Boby', 'Start Date' : '12/01/2019', 'Job Role' : 'Business analyst', 'Department': 'analysing the business'},
          {'Name' : 'Bella', 'Start Date': '10-01-2019', 'Job Role' : 'tester', 'Department': 'testing an application'},
          {'Name' : 'Bex', 'Start Date': '11-01-2019', 'Job Role' : 'developer', 'Department': 'developing an application'}],
        styleClass: 'class1'}
    }
  };

  constructor(private sharedService: SharedService) {
    this.headers = ['Name', 'Start Date', 'Job Role', 'Department'];
   /*
    this.headers = this.data.header.rows;
    this.rows = this.data.body.rows.tablecolumn;*/
  }

  ngOnInit(): void {
    this.sharedService.readJson().subscribe(data => {
      this.rows = data;
    });

  }



}
