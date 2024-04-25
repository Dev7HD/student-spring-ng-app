import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  constructor(public authService: AuthService,
              public toastService: ToastService) { }

  logout() {
    this.authService.logout();
  }

  openSnack(){
    this.toastService.openSnackBar()
  }

}
