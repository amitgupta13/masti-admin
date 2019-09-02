import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "../services/auth-guard.service";

const dashboardRoutes: Routes = [{ path: "", component: DashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)]
})
export class DashboardRoutingModule {}
