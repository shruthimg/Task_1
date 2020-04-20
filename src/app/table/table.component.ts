import {
	Component,
	Input,
	OnInit,
	TemplateRef
} from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']

})
export class TableComponent implements OnInit {
	headers: TableRow[];
	rows: TableRow[];
	sortedData: TableRow[];
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
		this.sortedData = this.rows.slice();
	}

	sort(sort: Sort, name: string) {
		if (this.headers[0].sort && sort.active === "Name") {
			let index: number;
			index = name === "Name" ? 0 : 0;
			const data = this.rows.slice();
			if (!sort.active || sort.direction === '') {
				this.sortedData = data;
				return;
			}
			this.sortedData = data.sort((a, b) => {
				const isAsc = sort.direction === 'asc';
				return this.compare(a.columns[index].contentModel.value, b.columns[index].contentModel.value, isAsc);
			});
		}
	}
	compare(a: number | string, b: number | string, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
