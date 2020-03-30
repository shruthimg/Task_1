import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  headers: any[];
  rows: any = [];

  constructor(private sharedService: SharedService) {
    this.headers = ['Name', 'Start Date', 'Job Role',	'Department'];
  }

  ngOnInit(): void {
    this.sharedService.readJson().subscribe(data => {
      this.rows = data;
    });

  }



}
