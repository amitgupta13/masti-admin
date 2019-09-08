import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Subscription } from "rxjs";
import { DashboardService } from "../services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  viewport: CdkVirtualScrollViewport;
  products = [];
  private sub: Subscription;
  limit = 20;
  offset = 0;
  term;
  sort = "updatedAt";
  order = -1;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.resetProducts();
    this.sub = this.dashboardService.getProductListenerSub().subscribe(data => {
      this.products = [...data];
    });
  }

  nextBatch(e, offset) {
    if (this.dashboardService.theEnd) {
      return;
    }
    this.offset = offset;
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    this.dashboardService.getBatch(
      e,
      this.limit,
      this.offset,
      end,
      total,
      this.term,
      this.sort,
      this.order
    );
  }

  searchList(e) {
    this.term = e.target.value;
    this.dashboardService.search(
      this.offset,
      this.limit,
      this.term,
      this.sort,
      this.order
    );
  }

  deleteProduct(id) {
    this.dashboardService.remove(id);
    if (this.products.length <= 20) {
      const limit = 20 - this.offset;
      this.dashboardService.lessProducts(
        this.offset,
        limit,
        this.term,
        this.sort,
        this.order
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
