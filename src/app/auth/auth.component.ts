import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  error: string;
  private authListener: Subscription;
  private authChange: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl(null, Validators.required)
    });
    this.authListener = this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        if (isAuth) {
          this.error = "";
        }
        this.error = this.authService.apiError;
      });
    this.authChange = this.signinForm.statusChanges.subscribe(() => {
      this.error = "";
    });
  }

  onSubmit() {
    if (!this.signinForm.valid) {
      return;
    } else {
      this.authService.signin(
        this.signinForm.value.email,
        this.signinForm.value.password
      );
    }
  }

  ngOnDestroy() {
    this.authChange.unsubscribe();
    this.authListener.unsubscribe();
  }
}
