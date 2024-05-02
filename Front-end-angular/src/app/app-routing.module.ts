import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {LoadPaymentComponent} from "./load-payment/load-payment.component";
import {LoadStudentComponent} from "./load-student/load-student.component";
import {PaymentsComponent} from "./payments/payments.component";
import {StudentsComponent} from "./students/students.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {UpdatePaymentStatusComponent} from "./update-payment-status/update-payment-status.component";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminTemplateComponent,
  canActivate: [AuthGuard]
  ,children:[
      {path: "home", component: HomeComponent},
      {path: "profile", component: ProfileComponent},
      {path: "dashboard", component: DashboardComponent},
      {
        path: "loadPayments", component: LoadPaymentComponent,
        canActivate: [AuthorizationGuard], data: {roles: ['ADMIN']}
      },
      {
        path: "loadStudents", component: LoadStudentComponent,
        canActivate: [AuthorizationGuard], data: {roles: ['ADMIN']}
      },
      {path: "payments", component: PaymentsComponent},
      {path: "students", component: StudentsComponent},
      {path: "update-status", component: UpdatePaymentStatusComponent,
        canActivate: [AuthorizationGuard], data: {roles: ['ADMIN']}}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
