import {Component, OnInit} from '@angular/core';
import {UpdatePaymentService} from "../services/update-payment.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-update-payment-status',
  templateUrl: './update-payment-status.component.html',
  styleUrl: './update-payment-status.component.css'
})
export class UpdatePaymentStatusComponent implements OnInit{
  payment!: any;
  paymentId!: string;
  paymentStatus!: string;

  constructor(private dialogService: UpdatePaymentService, private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    this.paymentId = this.dialogService.paymentId;
    this.http.get(`${environment.backendHost}payment?id=${this.paymentId}`).subscribe({
      next: data => {
        this.payment = data;
        this.paymentStatus = this.payment.status;
        console.log(this.paymentStatus)
      }, error: err => {
        console.error(err);
      }
    })
  }

  updatePaymentStatus() {
    this.dialogService.updatePaymentStatus(this.paymentId,this.paymentStatus).subscribe({
      next: data => {
        this.paymentsPage()
        console.log(data)
      }, error: err => {
        console.log(err)
      }
    });
  }

  paymentsPage() {
    this.router.navigateByUrl("/admin/payments")
  }
}
