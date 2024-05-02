import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdatePaymentService {
  paymentId!: string;

  constructor(private http: HttpClient) {}

  updatePaymentStatus(paymentId: string, status: string): Observable<any> {
    const url = `${environment.backendHost}payments/${paymentId}`;
    const params = new HttpParams().set('status', status);
    return this.http.put(url, null, { params });
  }

}
