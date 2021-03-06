import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  flag: boolean;

  constructor(private sharedService: SharedService) { }
  
  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(message => this.flag = message);
  }

}
