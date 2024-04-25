import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public dataSource:any
  public payments:any
  public displayedColumns = ['id','date','amount','status','type', 'firstName','lastName']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get(environment.backendHost + "payments/all").subscribe({
      next: data => {
        this.payments = data
        this.dataSource = new MatTableDataSource(this.payments)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }, error: err => {
        console.error(err)
      }
    })
  }

}
