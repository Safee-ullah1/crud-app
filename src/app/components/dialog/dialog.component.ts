import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  carForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      seats: [''],
      color: [''],
    });
    if(this.editData){
      this.carForm.controls['name'].setValue(this.editData.name);
      this.carForm.controls['brand'].setValue(this.editData.brand);
      this.carForm.controls['color'].setValue(this.editData.color);
      this.carForm.controls['seats'].setValue(this.editData.seats);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.carForm.valid){
        this.api.postCar(this.carForm.value)
        .subscribe({
          next:res => {
            alert("Car added succesfully.")
            this.carForm.reset();
            this.dialogRef.close("save");
  
          },
          error:()=>{
            alert("Failed to add car.")
          }
        });
      }
    }
    else{
      this.api.putCar(this.carForm.value, this.editData._id)
      .subscribe({
        next:res => {
          alert("Car updated succesfully.")
          this.carForm.reset();
          this.dialogRef.close("update");

        },
        error:()=>{
          alert("Failed to update car.")
        }
      });
    }
  }
}
