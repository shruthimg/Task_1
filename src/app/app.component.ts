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
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	flag: boolean;
	empDetail = [];
	myForm: FormGroup;
	roles: string[] = ['Tester', 'Developer', 'Business analyst'];
	dept: string[] = ['Testing an application', 'Developing an application', 'Analysing the business'];
	jobOptions: Observable<any>;
	departmentOptions: Observable<any>;

	constructor(private sharedService: SharedService, private fb: FormBuilder, private datePipe: DatePipe) { }
	ngOnInit(): void {
		this.sharedService.sharedMessage.subscribe(message => this.flag = message);
		this.myForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(4)]],
			startdate: ['', [Validators.required]],
			jobrole: ['', [Validators.required, Validators.minLength(4)]],
			department: ['', [Validators.required, Validators.minLength(4)]],
			comment: ['', [Validators.required]]
		});

		this.jobOptions = this.myForm.controls.jobrole.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged(),
				startWith(''),
				map(value => this.roles.filter(option => option.toLowerCase().includes(value)))
			);
		this.departmentOptions = this.myForm.controls.department.valueChanges
			.pipe(debounceTime(200), distinctUntilChanged(),
				startWith(''),
				map(value => this.dept.filter(option => option.toLowerCase().includes(value)))
			);
	}

	onSubmit(formValue) {
		const detail = {
			name: formValue.firstname,
			startDate: this.datePipe.transform(formValue.startdate, 'dd-MM-yyyy'),
			jobRole: formValue.jobrole,
			department: formValue.department,
			comment: formValue.comment
		}
		this.empDetail.push(detail);
		localStorage.setItem('Details', JSON.stringify(this.empDetail));
	}

	close() {
		this.flag = false;
		this.myForm.reset();
		this.sharedService.nextMessage(false);
	}
}
