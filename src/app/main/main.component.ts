import {
	Component,
	Input,
	OnInit,
	ViewChild,
	TemplateRef,
	AfterViewInit,
	ChangeDetectorRef
} from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	startWith
} from 'rxjs/operators';
import {
	Observable
} from 'rxjs';
import { TableRow, TableColumn } from '../table/table.component';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
	@ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
	@ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
	@ViewChild('roleTemplate') roleTemplate: TemplateRef<any>;
	@ViewChild('deptTemplate') deptTemplate: TemplateRef<any>;
	@ViewChild('commentTemplate') commentTemplate: TemplateRef<any>;
	data: {
		header: {
			rows: TableRow[]
		},
		body: {
			rows: TableRow[]
		}
	};

	tableForm: FormGroup;
	jobRoleOptions: Observable<any>;
	deptOptions: Observable<any>;
	roles: string[] = ['Tester', 'Developer', 'Business analyst'];
	dept: string[] = ['Testing an application', 'Developing an application', 'Analysing the business'];

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.data = { header: { rows: [] }, body: { rows: [] } };
		this.tableForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(4)]],
			startdate: ['', [Validators.required]],
			jobrole: ['', [Validators.required, Validators.minLength(4)]],
			department: ['', [Validators.required, Validators.minLength(4)]],
			comment: ['', [Validators.required, Validators.minLength(4)]]
		});

		this.jobRoleOptions = this.tableForm.controls.jobrole.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged(),
				startWith(''),
				map(value => this.roles.filter(option => option.toLowerCase().includes(value)))
			);
		this.deptOptions = this.tableForm.controls.department.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged(),
				startWith(''),
				map(value => this.dept.filter(option => option.toLowerCase().includes(value)))
			);

		let localData = JSON.parse(localStorage.getItem('empDetails'));		
		this.data.header = {
			rows: [
				<TableRow>{
					columns: [<TableColumn>{ name: "Name", sort: true, id: "name" },
					<TableColumn>{ name: "Start Date", sort: false, id: "startDate" },
					<TableColumn>{ name: "Job Role", sort: false, id: "jobRole" },
					<TableColumn>{ name: "Department", sort: false, id: "department" },
					<TableColumn>{ name: "Comment", sort: false, id: "comment" }
					]
				}
			]
		}
		const templateMap: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
		templateMap.set("name", this.nameTemplate);
		templateMap.set("startdate", this.dateTemplate);
		templateMap.set("jobRole", this.roleTemplate);
		templateMap.set("department", this.deptTemplate);
		templateMap.set("comment", this.commentTemplate);
		if (localData) {
			this.data.body.rows = localData.map(emp => {
				return <TableRow>{
					columns: this.data.header.rows[0].columns.map(headerColumn => {
						return <TableColumn>{
							id: headerColumn.id,
							contentModel: {
								value: emp[headerColumn.id],
								active: false
							},
							reference: templateMap.get(headerColumn.id)
						}
					})
				}
			});
		}
	}

	ngAfterViewInit() {
		this.data.body.rows.forEach(row => row.columns.forEach(col => {
			switch (col.name) {
				case 'Name':
					col.reference = this.nameTemplate;
					break;
				case 'Start Date':
					col.reference = this.dateTemplate;
					break;
				case 'Job Role':
					col.reference = this.roleTemplate;
					break;
				case 'Department':
					col.reference = this.deptTemplate;
					break;
				case 'Comment':
					col.reference = this.commentTemplate;
					break;
			}
		}))
		this.cdr.detectChanges();
	}
}
