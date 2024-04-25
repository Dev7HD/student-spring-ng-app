import { HttpInterceptorFn } from '@angular/common/http';
import {ToastService} from "../services/toast.service";
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.toastService.openSnackBar()
    return next.handle(request).pipe(
      finalize(()=>{
        this.toastService.hideSnack();
      })
    );
  }
}
