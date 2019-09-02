import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from "@angular/router";

@Injectable()
export class AuthLoginGuard implements CanActivate {
  isAuth: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth) {
      this.router.navigate(["/dashboard"]);
    }
    return !this.isAuth;
  }
}
