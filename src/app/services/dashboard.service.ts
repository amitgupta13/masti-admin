import { Injectable } from "@angular/core";
import * as faker from "faker";
import { Subject } from "rxjs";
import * as uuid from "uuid";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
const BACKEND_URL = environment.apiUrl;

@Injectable()
export class DashboardService {
  private productsChanged = new Subject();
  private products = Array(5)
    .fill(1)
    .map(_ => {
      return {
        id: uuid(),
        image: `https://robohash.org/${faker.name.findName()}`,
        name: faker.name.findName(),
        description: faker.hacker.phrase(),
        price: faker.commerce.price()
      };
    });

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.products.slice();
  }

  getProductsInf(offset, limit) {
    return this.http.get<any>(`${BACKEND_URL}?skip=${offset}&limit=${limit}`);
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
    this.products = this.products.filter(prod => prod.id !== id);
    this.productsChanged.next(this.products.slice());
    return this.products;
  }
}
