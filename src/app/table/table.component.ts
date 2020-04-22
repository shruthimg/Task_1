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
	rawData: TableRow[];
	defaultTemplate: TemplateRef<any>;
	counter: number = 0;
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
			this.rawData = this.rows.slice();
		}		
	}

	sort(sort: any, column: TableColumn) {
		if (column.sort) {
			this.counter = this.counter % 3;
			const index = column.name === 'Name' ? 0 : 0;
			if (this.counter !== 2) {
				const data = this.rows.slice();
				data.sort((a, b) => {
					const arg1 = a.columns[index].contentModel.value;
					const arg2 = b.columns[index].contentModel.value
					if (arg1 < arg2) {

						return -1 * (this.counter === 0 ? 1 : -1);
					} else if (arg1 > arg2) {
						return 1 * (this.counter === 0 ? 1 : -1);
					} else {
						return 0;
					}
				});
				this.rows = data;
			}
			else {
				this.rows = this.rawData;
			}
			this.counter++;
		}
	}
}

export class TableRow {
	columns: TableColumn[];	
	styleClass: string;
}

export class TableColumn {
	name: string;
	sort: boolean;
	reference: any;
	contentModel: {
		active: boolean,
		value: string
	};
	id: string;
}
