import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private message = new BehaviorSubject(false);
  sharedMessage = this.message.asObservable();

  constructor(private http: HttpClient) { }

  nextMessage(message: boolean) {
    this.message.next(message);
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/employeeDetails.json");
  }
}
