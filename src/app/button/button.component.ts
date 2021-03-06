import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() primary: boolean;
  @Input() className:string;
  @Input() enabled: boolean;
  @Input() public buttonName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
