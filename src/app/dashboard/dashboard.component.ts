import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterContentChecked
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
export class DashboardComponent
  implements OnInit, AfterContentChecked, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  products;
  private sub: Subscription;
  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  constructor(private dashboardService: DashboardService) {}

  ngAfterContentChecked() {}

  ngOnInit() {
    // this.products = this.dashboardService.getProducts();
    // this.sub = this.dashboardService
    //   .getProductListenerSub()
    //   .subscribe(products => {
    //     this.products = products;
    //   });

    const batchMap = this.offset.pipe(
      throttleTime(500),
      switchMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    // this.infinite = batchMap.pipe(map(v => Object.values(v)));
    batchMap.pipe(map(v => Object.values(v))).subscribe(data => {
      this.products = data;
    });
  }

  getBatch(offset) {
    console.log("sfafsafaf", { offset });
    return this.dashboardService.getProductsInf(offset, this.batch).pipe(
      tap(arr => (arr.length ? null : (this.theEnd = true))),
      map(arr => {
        return arr.reduce((acc, cur) => {
          const id = cur._id;
          const data = cur;
          return { ...acc, [id]: data };
        }, {});
      })
    );
  }

  nextBatch(e, offset) {
    console.log({ offset });
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  searchList(e) {
    this.products = this.dashboardService.search(e.target.value);
  }

  passFilter(term) {
    return term.value;
  }

  deleteProduct(id) {
    this.products = this.dashboardService.remove(id);
    this.products = [...this.products];
  }

  trackByIdx(i) {
    return i;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
