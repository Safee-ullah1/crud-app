import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Output() refresh = new EventEmitter<any>();
  constructor(private dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "auto",
      height: "auto",
      minWidth: "30%"
    }).afterClosed().subscribe(val => {
      if (val === "save") {
        this.refresh.emit();
      }
    })
  }
  ngOnInit(): void {
  }

}
