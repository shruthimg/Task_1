import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  headers: any[];
  rows: any;
  @Input() itemTemplate: TemplateRef<HTMLElement>
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
    this.rows = this.data.body.rows[0].columns;
  }
}

export class TableRow {
  columns: TableColumn[];
  styleClass: string;
}

export class TableColumn {
  name: string;
  contentModel: {};
}
