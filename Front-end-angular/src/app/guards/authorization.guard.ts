import {
  ActivatedRouteSnapshot,
  GuardResult, MaybeAsync,
  Router,
} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthorizationGuard {
  constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
      if(this.authService.isAuthenticated) {
        let requiredRoles = route.data['roles'];
        let userRoles = this.authService.roles;
        for(let role of userRoles){
          if(requiredRoles.includes(role)){
            return true;
          }
        }
        this.router.navigateByUrl('/admin');
        return false;
      }
      else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
}
