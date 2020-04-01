import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  headers: any[];
  rows: any;

  @Input() data: {
    header: {
      rows: TableRow[]
    },
    body: {
      rows: TableRow[]
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.headers = this.data.header.rows;
    this.rows = this.data.body.rows;
  }
}

export class TableRow {
  columns: TableColumn[];
  styleClass: string;
}

export class TableColumn {
  name: string;
  styleClass: string;
}
