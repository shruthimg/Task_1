import {
	Component,
	OnInit
} from '@angular/core';
import {
	SharedService
} from './shared.service';
import {
	FormBuilder,
	FormGroup,
	Validators
} from '@angular/forms';
import {
	Observable
} from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	startWith
} from 'rxjs/operators';
import * as data from '../assets/Employees.json';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public flag: boolean;
	empDetail: any;
	myForm: FormGroup;
	options: string[] = ['One', 'Two', 'Three'];
	jobOptions: Observable < any > ;
	departmentOptions: Observable < any > ;

	constructor(private sharedService: SharedService, private fb: FormBuilder) {}
	ngOnInit(): void {
		localStorage.setItem('EmployeesDetails', JSON.stringify(data.default));
		this.sharedService.sharedMessage.subscribe(message => this.flag = message);

		this.myForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(4)]],
			startdate: ['', [Validators.required]],
			jobrole: ['', [Validators.required, Validators.minLength(4)]],
			department: ['', [Validators.required, Validators.minLength(4)]]
		});

		this.jobOptions = this.myForm.controls.jobrole.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged(),
				startWith(''),
				map(value => this.options.filter(option => option.toLowerCase().includes(value)))
			);
		this.departmentOptions = this.myForm.controls.department.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged(),
				startWith(''),
				map(value => this.options.filter(option => option.toLowerCase().includes(value)))
			);
	}

	onSubmit(formValue) {
		this.empDetail = [formValue.firstname,
			formValue.startdate,
			formValue.jobrole,
			formValue.department
		];

		localStorage.setItem('empDetails', this.empDetail);
		console.log(localStorage.getItem('empDetails'));
		console.log(formValue);
	}

	close() {
		this.flag = false;
		this.myForm.reset();
		this.sharedService.nextMessage(false);
	}
}
