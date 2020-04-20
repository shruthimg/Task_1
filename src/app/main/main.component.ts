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
import {
	HttpClient
} from '@angular/common/http';
import { TableRow } from '../table/table.component';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
	@ViewChild('nameTemplate') nameTemplate: TemplateRef < any > ;
	@ViewChild('dateTemplate') dateTemplate: TemplateRef < any > ;
	@ViewChild('roleTemplate') roleTemplate: TemplateRef < any > ;
	@ViewChild('deptTemplate') deptTemplate: TemplateRef < any > ;
	@ViewChild('commentTemplate') commentTemplate: TemplateRef < any > ;
	data: {
		header: {
			rows: TableRow[]
		},
		body: {
			rows: TableRow[]
		}
	};

	tableForm: FormGroup;
	jobRoleOptions: Observable < any > ;
	deptOptions: Observable < any > ;
	roles: string[] = ['tester', 'developer', 'Business analyst'];
	dept: string[] = ['testing an application', 'developing an application', 'analysing the business'];

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private http: HttpClient) {}

	ngOnInit(): void {
		this.tableForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(4)]],
			startdate: ['', [Validators.required]],
			jobrole: ['', [Validators.required, Validators.minLength(4)]],
			department: ['', [Validators.required, Validators.minLength(4)]],
			comment: ['', [Validators.required, Validators.minLength(4)]]
		});
    this.data = JSON.parse(localStorage.getItem('EmployeesDetails'));

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
