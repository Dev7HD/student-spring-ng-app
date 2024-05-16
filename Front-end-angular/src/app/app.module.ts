import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatListModule} from "@angular/material/list";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadStudentComponent } from './load-student/load-student.component';
import { LoadPaymentComponent } from './load-payment/load-payment.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import { LoadingToastComponent } from './loading-toast/loading-toast.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AppInterceptor} from "./interceptors/app.interceptor";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule, provideNativeDateAdapter} from "@angular/material/core";
import { UpdatePaymentStatusComponent } from './update-payment-status/update-payment-status.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { MatDatepickerInput, MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    HomeComponent,
    ProfileComponent,
    LoadStudentComponent,
    LoadPaymentComponent,
    LoginComponent,
    StudentsComponent,
    PaymentsComponent,
    DashboardComponent,
    LoadingToastComponent,
    UpdatePaymentStatusComponent,
    StudentDetailsComponent,
    NewPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatListItem,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSort,
    MatSortHeader,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerInput,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync(), AuthGuard, AuthorizationGuard, provideNativeDateAdapter(),
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}
  ]
})
export class AppModule { }
