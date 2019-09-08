import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NewProductComponent } from "./new-product/new-product.component";

@NgModule({
  declarations: [DashboardComponent, NewProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ScrollingModule,
    FormsModule
  ]
})
export class DashboardModule {}
