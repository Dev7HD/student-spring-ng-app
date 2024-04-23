import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any = {
    admin: {password: '1234', roles: ['ADMIN','STUDENT']},
    user: {password: '1234', roles: ['STUDENT']},
  }
  public userName: any;
  public isAuthenticated: boolean = false;
  public roles: string[] = [];

  constructor(private router: Router) { }

  public login(userName: string, password: string): boolean {
    if(this.users[userName].password == password && this.users[userName]) {
      this.userName = userName;
      this.isAuthenticated = true;
      this.roles = this.users[userName].roles;
      return true;
    }
    else {
      return false
    }
  }

  public logout() {
    this.isAuthenticated = false;
    this.userName = undefined;
    this.roles = [];
    this.router.navigateByUrl('/login');
  }
}
