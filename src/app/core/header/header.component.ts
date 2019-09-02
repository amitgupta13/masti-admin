import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  auth: boolean;
  private authListener: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.auth = this.authService.getIsAuth();
    this.authListener = this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.auth = isAuth;
      });
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
