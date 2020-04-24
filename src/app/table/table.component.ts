import {
	Component,
	Input,
	OnInit,
	TemplateRef,
	OnChanges
} from '@angular/core';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']

})
export class TableComponent implements OnInit, OnChanges {
	headers: TableColumn[];
	rows: TableRow[];
	index: number;
	rawData: TableRow[];
	defaultTemplate: TemplateRef<any>;
	@Input() data: {
		header: {
			rows: TableRow[]
		},
		body: {
			rows: TableRow[]
		}
	};
	ngOnChanges(): void {
		if (this.data) {
			this.headers = this.data.header.rows[0].columns;
			this.rows = this.data.body.rows;
			this.rawData = this.rows.slice();
		}
	  }
	ngOnInit(): void {
		if (this.data) {
			this.headers = this.data.header.rows[0].columns;
			this.rows = this.data.body.rows;
			this.rawData = this.rows.slice();
		}		
	}

	sort(column: TableColumn, index: number) {
		if (column.sort.active) {
			this.index = index;
			column.sort.order = column.sort.order === 'asec' ? column.sort.order = 'desc' : column.sort.order === 'desc' ? '' : 'asec';

			if (column.sort.order !== '') {
				const data = this.rows.slice();
				data.sort((a, b) => {
					const arg1 = a.columns[index].contentModel.value;
					const arg2 = b.columns[index].contentModel.value
					if (arg1.toLowerCase() < arg2.toLowerCase()) {
						return -1 * (column.sort.order === 'asec' ? 1 : -1);
					} else if (arg1.toLowerCase() > arg2.toLowerCase()) {
						return 1 * (column.sort.order === 'asec' ? 1 : -1);
					} else {
						return 0;
					}
				});
				this.rows = data;
			}
			else {
				this.rows = this.rawData;
			}
		}
	}
}

export class TableRow {
	columns: TableColumn[];
	styleClass: string;
}

export class TableColumn {
	name: string;
	sort: any;
	reference: any;
	contentModel: {
		active: boolean,
		value: string
	};
	id: string;
}
