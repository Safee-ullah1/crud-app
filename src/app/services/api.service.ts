import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postCar(data:any){
    return this.http.post<any>("http://localhost:3000/car/", data)
  }
  getCars(filters:any={}){
    return this.http.get<any>("http://localhost:3000/car", { params: filters})
  }
  putCar(data:any, id:string){
    return this.http.put<any>("http://localhost:3000/car/", {filter:{_id: id}, update:data})
  }
  deleteCar(id:string){
    return this.http.delete<any>("http://localhost:3000/car/", {body:{_id: id}})
  }
}
