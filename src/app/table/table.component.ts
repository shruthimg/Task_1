import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() headers: any[];
  @Input() rows: any = [];

  @Input() data: {
    header: {
      rows: TableColumn[]
    },
    body: {
      rows: TableRow[]
    }
  }

  constructor() { }

  ngOnInit(): void {
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
