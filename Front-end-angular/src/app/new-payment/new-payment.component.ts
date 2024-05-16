import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PaymentType} from "../models/app.models";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  paymentFormGroup!: FormGroup;
  studentCode!: string;
  types: string[] = [];
  pdfFileUrl!: any;
  showProgress!: any;
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
              private studentService: StudentsService) {}

    ngOnInit(): void {
      for (let i in PaymentType){
        let value = PaymentType[i];
        if(typeof value === 'string')
          this.types.push(value);
      }
        this.studentCode = this.activeRoute.snapshot.params['studentCode'];
        this.paymentFormGroup = this.formBuilder.group({
          date: this.formBuilder.control('', [Validators.required]),
          amount: this.formBuilder.control('', [Validators.required]),
          paymentType: this.formBuilder.control('', [Validators.required]),
          studentCode: this.formBuilder.control(this.studentCode, [Validators.required]),
          fileSource: this.formBuilder.control(''),
          fileName: this.formBuilder.control('', [Validators.required]),
        })
    }

  selectFile($event: any) {
    if($event.target.files.length){
      const file = $event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  savePayment() {
    let date = new Date(this.paymentFormGroup.value.date);
    let formattedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    this.showProgress = true;
    const formData = new FormData();
    formData.append("file", this.paymentFormGroup.value.fileSource);
    formData.append("date", formattedDate);
    formData.append("amount", this.paymentFormGroup.value.amount);
    formData.append("paymentType", this.paymentFormGroup.value.paymentType);
    formData.append("studentCode", this.studentCode)
    this.studentService.savePayment(formData).subscribe({
      next: value => {
        alert("Payment saved")
      }, error: err => {
        console.error(err)
      }
    })
  }
}
