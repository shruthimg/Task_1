import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  enableEdit = false;
  enableEditIndex = null;
  headers: any[];
  rows: any;
  newList: Array<any> = [];
  @Input() data: {
    header: {
      rows: TableRow[]
    },
    body: {
      rows: TableRow[]
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    this.headers = this.data.header.rows[0].columns;
    this.rows = this.data.body.rows;
  }
  enableEditMethod(e, i) {
      this.enableEdit = true;
      this.enableEditIndex = i;
      console.log(i, e);
    }
  updateList(i: number, name: any, event: any) {
    this.rows[i][name] = event.target.textContent;
    this.newList.push(this.rows);
    console.log('new array', this.newList);
  }

  ngOnDestroy(): void {
    this.newList = [];
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
