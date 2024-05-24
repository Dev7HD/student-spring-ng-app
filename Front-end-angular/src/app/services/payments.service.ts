import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Payment} from "../models/app.models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  public payments: any;
  public dataSource!: MatTableDataSource<unknown, MatPaginator>;

  constructor(private http: HttpClient) { }

  getPayments() {
    return this.http.get<Array<Payment>>(environment.backendHost + 'payments/all')
  }

  setPayments(payments: any) {
    this.payments = payments;
    this.dataSource = new MatTableDataSource(this.payments)
  }

  getPaymentFile(paymentId: string){
    return this.http.get(`${environment.backendHost}paymentFile/${paymentId}`, {responseType: 'blob'});
  }

  updatePaymentStatus(paymentId: string, status: string): Observable<any> {
    const url = `${environment.backendHost}payments/${paymentId}`;
    const params = new HttpParams().set('status', status);
    return this.http.put(url, null, { params });
  }
}
