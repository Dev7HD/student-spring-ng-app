import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  constructor(private http: HttpClient) {
  }
  public dataSource:any
  public students:any
  public displayedColumns = ['firstName','lastName','email','code','programId']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.http.get(environment.backendHost + "students/all").subscribe({
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

}
