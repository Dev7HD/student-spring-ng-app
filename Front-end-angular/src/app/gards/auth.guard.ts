import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {inject, Injectable} from "@angular/core";

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot) {
      if(this.authService.isAuthenticated) {
        return true;
      }
      else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return inject(AuthGuard).canActivate(route);
}
