import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
 @Input() row:any;
 @Output() refresh = new EventEmitter<any>();
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  editCar() {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: this.row
    }).afterClosed().subscribe(val => {
      this.refresh.emit();
    })
  }
}
