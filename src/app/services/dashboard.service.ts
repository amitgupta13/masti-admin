import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { throttleTime } from "rxjs/operators";
const BACKEND_URL = environment.apiUrl;

@Injectable()
export class DashboardService {
  private productsChanged = new BehaviorSubject([]);
  private products = [];
  theEnd = false;

  constructor(private http: HttpClient) {}

  getProducts(offset?, limit?, term?, sort?, order?) {
    term = term ? term : "";
    sort = sort ? sort : "name";
    order = order ? order : 1;
    offset = offset ? offset : 0;
    limit = limit ? limit : 20;
    return this.http
      .get<any>(
        `${BACKEND_URL}?skip=${offset}&limit=${limit}&search=${term}&order=${order}&sort=${sort}`
      )
      .pipe(throttleTime(500));
  }

  lessProducts(offset?, limit?, term?, sort?, order?) {
    this.getProducts(offset, limit, term, sort, order).subscribe(data => {
      this.products = [...data];
      this.productsChanged.next(this.products.slice());
    });
  }

  getBatch(e, limit, offset, end, total) {
    if (this.theEnd) {
      return;
    }
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.getProducts(offset, limit).subscribe(data => {
        if (!data.length) {
          this.theEnd = true;
        }
        this.products = [...this.products, ...data];
        let unique = this.products.reduce((acc, cur) => {
          const id = cur._id;
          const data = cur;
          return { ...acc, [id]: data };
        }, {});
        this.products = Object.values(unique);
        this.productsChanged.next(this.products.slice());
      });
    }
  }

  getProductListenerSub() {
    return this.productsChanged.asObservable();
  }

  search(search) {
    return this.products.filter(obj => {
      return obj.name.toLowerCase().indexOf(search) >= 0;
    });
  }

  remove(id) {
    this.http
      .delete(`${BACKEND_URL}/${id}`, { responseType: "text" })
      .subscribe(
        _ => {
          this.products = this.products.filter(prod => prod._id !== id);
          this.productsChanged.next(this.products.slice());
        },
        err => {
          console.log({ err });
        }
      );
    // return this.products;
  }
}
