import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ProductItemComponent } from "./product-item/product-item.component";

@NgModule({
  declarations: [DashboardComponent, ProductItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ScrollingModule
  ]
})
export class DashboardModule {}
