import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  displayedColumns: string[] = ['name', 'brand', 'color', 'seats', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog, private api: ApiService){}
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width:"auto",
      height: "auto",
      minWidth:"30%"
  }).afterClosed().subscribe(val=>{
    if(val === "save"){
      this.getAllCars();
    }
  })
  }
  ngOnInit(): void {
    this.getAllCars();
  }
  getAllCars(){
    this.api.getCars()
    .subscribe({
      next: result => {
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  editCar(row: any){
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === "update"){
        this.getAllCars();
      }
    })
  }
  deleteCar(data: any){
    this.api.deleteCar(data._id)
    .subscribe({
      next: result => {
        console.log("Car deleted!");
        this.getAllCars();
      },
      error: error => {
        console.log(error);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
