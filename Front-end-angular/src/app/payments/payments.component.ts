import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UpdatePaymentService} from "../services/update-payment.service";
import {PaymentsService} from "../services/payments.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public dataSource:any = this.paymentsService.dataSource
  public payments:any
  public displayedColumns = ['id','date','amount','status','type', 'firstName','lastName']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public authService: AuthService,
              private updatePaymentService: UpdatePaymentService,
              private paymentsService: PaymentsService,
              private router: Router) {}

  ngOnInit(): void {
    if(this.authService.roles.includes('ADMIN')){
      this.displayedColumns.push('edit')
    }
    this.paymentsService.getPayments().subscribe({
      next: data => {
        this.paymentsService.setPayments(data)
        this.dataSource = this.paymentsService.dataSource
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }, error: err => {
        console.error(err)
      }
    })
  }

  setPaymentId(id: string) {
    this.updatePaymentService.paymentId = id;
    this.router.navigateByUrl('/admin/update-status');
  }
}
