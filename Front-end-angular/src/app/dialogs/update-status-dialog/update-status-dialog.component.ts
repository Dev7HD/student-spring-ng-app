import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
  styleUrl: './update-status-dialog.component.css'
})
export class UpdateStatusDialogComponent {

  constructor(private router: Router) {
  }
  showPayments() {
    this.router.navigateByUrl('/admin/payments')
  }
}
