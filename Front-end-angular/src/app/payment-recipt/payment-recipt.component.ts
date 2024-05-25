import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentsService} from "../services/payments.service";

@Component({
  selector: 'app-payment-recipt',
  templateUrl: './payment-recipt.component.html',
  styleUrl: './payment-recipt.component.css'
})
export class PaymentReciptComponent  implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private paymentService: PaymentsService) {  }
  paymentId!: string;
  fileUrl: any;
  ngOnInit(): void {
    this.paymentId = this.activatedRoute.snapshot.params['id'];
    this.paymentService.getPaymentFile(this.paymentId).subscribe({
      next: data => {
        let blob = new Blob([data], { type: "application/pdf" });
        this.fileUrl = window.URL.createObjectURL(blob);
      }, error: err => {
        console.error(err)
      }
    })
  }

  successLog() {
    console.log('PDF successfully loaded.');
  }
}
