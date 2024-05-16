import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Payment} from "../models/app.models";

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
}
