import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DashboardService } from "src/app/services/dashboard.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.css"]
})
export class NewProductComponent implements OnInit {
  newProduct: FormGroup;
  id: string;
  mode = "create";
  heading = "Add Product";
  product;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.newProduct = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ])
    });
    this.route.paramMap.subscribe(param => {
      if (param.has("id")) {
        this.mode = "edit";
        this.heading = "Edit Product";
        this.id = param.get("id");
        this.dashboardService.getProduct(this.id).subscribe(data => {
          this.product = {
            name: data.name,
            description: data.description,
            price: data.price
          };
          this.newProduct.setValue({
            ...this.product
          });
        });
      } else {
        this.mode = "create";
        this.product = null;
        this.heading = "Add Product";
        this.id = null;
      }
    });
  }

  onSubmit() {
    if (this.newProduct.invalid) return;
    if (this.mode === "create") {
      this.dashboardService.addProduct(this.newProduct.value).subscribe(_ => {
        this.router.navigate(["dashboard"]);
      });
    } else {
      this.dashboardService
        .editProduct(this.id, this.newProduct.value)
        .subscribe(_ => {
          this.router.navigate(["dashboard"]);
        });
    }
  }
}
