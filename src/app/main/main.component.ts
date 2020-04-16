import {
	Component,
	Input,
	OnInit,
	ViewChild,
	TemplateRef,
	AfterContentInit,
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

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterContentInit {
	@ViewChild('nameTemplate') nameTemplate: TemplateRef < any > ;
	@ViewChild('dateTemplate') dateTemplate: TemplateRef < any > ;
	@ViewChild('roleTemplate') roleTemplate: TemplateRef < any > ;
	@ViewChild('deptTemplate') deptTemplate: TemplateRef < any > ;
	data = {
		header: {
			rows: [{
				columns: [{
						name: 'Name',
						contentModel: {
							active: false,
							value: ''
						},
						styleClass: 'name'
					},
					{
						name: 'Start Date',
						contentModel: {
							active: false,
							value: ''
						},
						styleClass: 'date'
					},
					{
						name: 'Job Role',
						contentModel: {
							active: false,
							value: ''
						},
						styleClass: 'role'
					},
					{
						name: 'Department',
						contentModel: {
							active: false,
							value: ''
						},
						styleClass: 'department'
					}
				],
				styleClass: 'header'
			}]
		},
		body: {
			rows: [{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Alex'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Andy'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Bella'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Casper'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Monica'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Phoebe'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Rachel'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				},
				{
					columns: [{
							name: 'Name',
							reference: null,
							contentModel: {
								active: false,
								value: 'Ross'
							},
							styleClass: 'name'
						},
						{
							name: 'Start Date',
							reference: null,
							contentModel: {
								active: false,
								value: '12-12-2019'
							},
							styleClass: 'date'
						},
						{
							name: 'Job Role',
							reference: null,
							contentModel: {
								active: false,
								value: 'developer'
							},
							styleClass: 'role'
						},
						{
							name: 'Department',
							reference: null,
							contentModel: {
								active: false,
								value: 'developing an application'
							},
							styleClass: 'dept'
						}
					],
					styleClass: 'row'
				}

			]
		}
	}
	tableForm: FormGroup;
	jobRoleOptions: Observable < any > ;
	deptOptions: Observable < any > ;
	roles: string[] = ['tester', 'developer', 'Business analyst'];
	dept: string[] = ['testing an application', 'developing an application', 'analysing the business'];

	constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.tableForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(4)]],
			startdate: ['', [Validators.required]],
			jobrole: ['', [Validators.required, Validators.minLength(4)]],
			department: ['', [Validators.required, Validators.minLength(4)]]
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
			}
		}))
		this.cdr.detectChanges();
	}
}
