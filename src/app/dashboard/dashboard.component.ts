import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from "@angular/core";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import {
  map,
  tap,
  scan,
  mergeMap,
  throttleTime,
  switchMap
} from "rxjs/operators";
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
  private limitSub: Subscription;
  limit = 20;
  offset = 0;

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentChecked() {}

  ngOnInit() {
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
    this.dashboardService.getBatch(e, this.limit, this.offset, end, total);
  }

  searchList(e) {
    this.products = this.dashboardService.search(e.target.value);
  }

  passFilter(term) {
    return term.value;
  }

  deleteProduct(id) {
    console.log(this.products.length);
    this.dashboardService.remove(id);
    if (this.products.length < 20) {
      this.dashboardService.lessProducts(0, this.limit);
    }
    // this.products = [...this.products];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.limitSub.unsubscribe();
  }
}
