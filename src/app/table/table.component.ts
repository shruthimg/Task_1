import {
	Component,
	Input,
	OnInit,
	TemplateRef
} from '@angular/core';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	headers: TableRow[];
	rows: TableRow[];
	defaultTemplate: TemplateRef<any>;

	@Input() data: {
		header: {
			rows: TableRow[]
		},
		body: {
			rows: TableRow[]
		}
	};

	ngOnInit(): void {
		if (this.data) {
			this.headers = this.data.header.rows[0].columns;
			this.rows = this.data.body.rows;
		}
	}
}

export class TableRow {
	columns: TableColumn[];
	styleClass: string;
}

export class TableColumn {
  name: string;
	reference: any;
	contentModel: {
		active: boolean,
		value: string
	};
	styleClass: string;
}
