import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoadingToastComponent} from "../loading-toast/loading-toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public isLoading: boolean = false;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(LoadingToastComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  hideSnack() {
    this._snackBar.dismiss()
  }
}
