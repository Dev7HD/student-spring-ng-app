import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";
import {Student} from "../models/app.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  constructor(private router: Router, private studentService: StudentsService) {
  }
  public dataSource:any
  public students!: Student[]
  public displayedColumns: string[] = ['firstName','lastName','email','code','programId','studentDetails']
  public student!: Student
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: data => {
        this.students = data
        this.dataSource = new MatTableDataSource(this.students)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }, error: err => {
        console.error(err)
      }
    })
  }

  studentDetails(student: Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }
}
