import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { AuthService } from "../services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AuthGuard } from "../services/auth-guard.service";
import { AuthLoginGuard } from "../services/login-guard.service";

@NgModule({
  declarations: [HeaderComponent],
  imports: [AppRoutingModule, HttpClientModule, CommonModule],
  exports: [HeaderComponent, AppRoutingModule, HttpClientModule],
  providers: [AuthService, AuthGuard, AuthLoginGuard]
})
export class CoreModule {}
