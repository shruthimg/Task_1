import {
	Component,
	Input,
	OnInit,
	TemplateRef,
	OnChanges,
	ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
// import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],

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
	isOpen: boolean;
	filterForm: FormGroup;
	filterIndex: number;
	filterColumn: TableColumn;

	constructor(private fb: FormBuilder) { }

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
		this.filterForm = this.fb.group({
			filter: ['', [Validators.required]],
			filterValue: ['', [Validators.required]],
			toggle: ['', [Validators.required]]
		});
	}

	sort(column: TableColumn, index: number) {
		if (column.sort.active) {
			this.isOpen = true;
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

	filter(column: TableColumn, index: number) {
		this.filterIndex = index;
		this.filterColumn = column;
	}
	onSubmit(formvalue) {
		this.rows = this.rawData;
		let filterArray = [];
		const contains = formvalue.filter === 'contains' ? formvalue.filterValue : '';
		const startWith = formvalue.filter === 'startWith' ? formvalue.filterValue : '';

		this.rows.forEach(filter => {
			let key = filter.columns[this.filterIndex].contentModel.value.toLowerCase();
			let filterVlaue = contains ? key.includes(formvalue.toggle ? contains.toLowerCase() : contains) :
				key.startsWith(formvalue.toggle ? startWith.toLowerCase() : startWith);
			if (filterVlaue) filterArray.push(filter);
		})
		this.rows = filterArray;
	}

	close() {
		this.rows = this.rawData;
		this.filterForm.reset();
	}
}

export class TableRow {
	columns: TableColumn[];
	styleClass: string;
}

export class TableColumn {
	name: string;
	sort: any;
	filter: boolean;
	reference: any;
	contentModel: {
		active: boolean,
		value: string
	};
	id: string;
}
