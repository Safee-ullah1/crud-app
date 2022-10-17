import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private api: ApiService) { }
  @Input() row:any;
  @Output() refresh = new EventEmitter<any>();
  ngOnInit(): void {
  }
  deleteCar() {
    this.api.deleteCar(this.row._id)
      .subscribe({
        next: result => {
          console.log("Car deleted!");
          this.refresh.emit();
        },
        error: error => {
          console.log(error);
        }
      })
  }
}
