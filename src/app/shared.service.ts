import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {EmployeeModel} from './employee-model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private message = new BehaviorSubject(false);
  sharedMessage = this.message.asObservable();

  constructor(private  http: HttpClient) {

  }

  nextMessage(message: boolean) {
    this.message.next(message);
  }

  readJson() {
    return this.http.get('./assets/Employees.json');
  }
}
