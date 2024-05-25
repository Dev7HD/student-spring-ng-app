import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-new-payment-dialog',
  templateUrl: './new-payment-dialog.component.html',
  styleUrl: './new-payment-dialog.component.css'
})
export class NewPaymentDialogComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private studentService: StudentsService) {}

  ngOnInit(): void {
        this.studentCode = this.activatedRoute.snapshot.params['studentCode']
    }

  studentCode!: string;

  showStudentPayments() {
    this.router.navigateByUrl(`/admin/student-details/${this.studentService.studentCode}`);
  }
}
