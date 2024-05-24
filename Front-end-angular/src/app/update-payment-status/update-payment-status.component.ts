import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {PaymentsService} from "../services/payments.service";
import {UpdateStatusDialogComponent} from "../dialogs/update-status-dialog/update-status-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-payment-status',
  templateUrl: './update-payment-status.component.html',
  styleUrl: './update-payment-status.component.css'
})
export class UpdatePaymentStatusComponent implements OnInit{
  payment!: any;
  paymentId!: string;
  paymentStatus!: string;

  constructor(private paymentsService: PaymentsService, private http: HttpClient,
              private router: Router, private activatedRoute: ActivatedRoute,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.paymentId = this.activatedRoute.snapshot.params['paymentid'];
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
    this.paymentsService.updatePaymentStatus(this.paymentId,this.paymentStatus).subscribe({
      next: data => {
        this.dialog.open(UpdateStatusDialogComponent);
      }, error: err => {
        console.log(err)
      }
    });
  }

  paymentsPage() {
    this.router.navigateByUrl("/admin/payments")
  }
}
