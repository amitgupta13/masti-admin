import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NewProductComponent } from "./new-product/new-product.component";

const dashboardRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "new", component: NewProductComponent },
  { path: "edit/:id", component: NewProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
