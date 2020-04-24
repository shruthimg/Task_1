import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
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
import * as jsonData from '../../assets/employeeDetails.json';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	@ViewChild('nameTemplate',{static: true}) nameTemplate: TemplateRef<any>;
	@ViewChild('dateTemplate' ,{static: true}) dateTemplate: TemplateRef<any>;
	@ViewChild('roleTemplate' ,{static: true}) roleTemplate: TemplateRef<any>;
	@ViewChild('deptTemplate' ,{static: true}) deptTemplate: TemplateRef<any>;
	@ViewChild('commentTemplate',{static: true}) commentTemplate: TemplateRef<any>;
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

	constructor(private fb: FormBuilder, public cdr: ChangeDetectorRef) { }

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
		// If data fetching from localStorage 
		// let localStorageData = JSON.parse(localStorage.getItem('empDetails'));
		// If data fetching from local Json file 
		let localStorageData = jsonData.default;
		this.data.header = {
			rows: [
				<TableRow>{
					columns: [<TableColumn>{ name: "Name", sort: { active: true, order: '' }, id: "name" },
					<TableColumn>{ name: "Start Date", sort: { active: false, order: '' }, id: "startDate" },
					<TableColumn>{ name: "Job Role", sort: { active: false, order: '' }, id: "jobRole" },
					<TableColumn>{ name: "Department", sort: { active: false, order: '' }, id: "department" },
					<TableColumn>{ name: "Comment", sort: { active: true, order: '' }, id: "comment" }
					]
				}
			]
		}
		
		const templateMap: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();
		templateMap.set("name", this.nameTemplate);
		templateMap.set("startDate", this.dateTemplate);
		templateMap.set("jobRole", this.roleTemplate);
		templateMap.set("department", this.deptTemplate);
		templateMap.set("comment", this.commentTemplate);
		if (localStorageData) {
			this.data.body.rows = localStorageData.map(emp => {
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
}
