import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
const BACKEND_URL = `${environment.apiUrl}/admin/`;

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  apiError: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  signin(email: string, password: string) {
    this.http
      .post(
        `${BACKEND_URL}/signin`,
        { email, password },
        { responseType: "text" }
      )
      .subscribe(
        token => {
          this.isAuthenticated = true;
          this.token = token;
          this.authStatusListener.next(true);
          this.saveAuthData(this.token);
          this.router.navigate(["/dashboard"]);
        },
        error => {
          this.apiError = JSON.parse(error.error);
          this.authStatusListener.next(false);
        }
      );
  }

  private saveAuthData(token: string) {
    localStorage.setItem("token", token);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  autoAuthUser() {
    const token = this.getAuthData();
    if (!token) return;
    this.token = token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  getAuthData() {
    const token = localStorage.getItem("token");
    if (!token) return;
    return token;
  }

  private clearAuthdata() {
    localStorage.removeItem("token");
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthdata();
    this.router.navigate(["/"]);
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
}
