import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() primary: boolean;
  @Input() type: boolean;
  @Input() enabled: boolean;

  text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
