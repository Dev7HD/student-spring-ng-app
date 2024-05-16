import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Payment, Student} from "../models/app.models";
import {StudentsService} from "../services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  code!: string;
  student!: Student;
  payments!: Payment[];
  public dataSource:any
  public displayedColumns: string[] = ['date','amount','type','status','receipt']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private activatedRoute: ActivatedRoute,
              private studentService: StudentsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.params["code"]
    this.getStudentDetails()
    this.getStudentsPayments()
  }

  getStudentDetails(){
    this.studentService.getStudentDetails(this.code).subscribe({
      next: value => {
        this.student = value
      }, error: error => {
        console.log(error)
      }
    })
  }

  getStudentsPayments() {
    this.studentService.getStudentPayments(this.code).subscribe({
      next: value => {
        this.payments = value
        this.dataSource = new MatTableDataSource(this.payments)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }, error: error => {
        console.log(error)
      }
    })
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.code}`)
  }
}
