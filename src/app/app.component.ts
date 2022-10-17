import { Component, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(ListComponent) child!:ListComponent;
  constructor() { }
  
  ngOnInit(): void { }
  refresh(){
    this.child.getAllCars();
  }
  
}
