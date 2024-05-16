import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Payment, Student} from "../models/app.models";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents()  {
    return this.http.get<Student[]>(`${environment.backendHost}students/all`);
  }

  getStudentDetails(code: string) {
    return this.http.get<Student>(`${environment.backendHost}student/${code}`)
  }

  getStudentPayments(code: string) {
    return this.http.get<Payment[]>(`${environment.backendHost}payments/student/${code}`);
  }

  savePayment(formData: FormData){
    return this.http.post<Payment>(`${environment.backendHost}payments/new`, formData)
  }
}
