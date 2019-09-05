import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { AuthService } from "../services/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "../services/auth-guard.service";
import { AuthLoginGuard } from "../services/login-guard.service";
import { DashboardService } from "../services/dashboard.service";
import { AuthInterceptor } from "../interceptors/auth.interceptor";

@NgModule({
  declarations: [HeaderComponent],
  imports: [AppRoutingModule, HttpClientModule, CommonModule],
  exports: [HeaderComponent, AppRoutingModule, HttpClientModule],
  providers: [
    AuthService,
    AuthGuard,
    AuthLoginGuard,
    DashboardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule {}
