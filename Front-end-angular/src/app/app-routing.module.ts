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
import {AuthGuard} from "./gards/auth.guard";

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminTemplateComponent,
  canActivate: [AuthGuard]
  ,children:[
      {path: "home", component: HomeComponent},
      {path: "profile", component: ProfileComponent},
      {path: "dashboard", component: DashboardComponent},
      {path: "loadPayments", component: LoadPaymentComponent},
      {path: "loadStudents", component: LoadStudentComponent},
      {path: "payments", component: PaymentsComponent},
      {path: "students", component: StudentsComponent},
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
