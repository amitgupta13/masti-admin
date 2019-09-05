import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ProductItemComponent } from "./product-item/product-item.component";
import { FilterPipe } from "../pipes/filter.pipe";

@NgModule({
  declarations: [DashboardComponent, ProductItemComponent, FilterPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ScrollingModule
  ]
})
export class DashboardModule {}
