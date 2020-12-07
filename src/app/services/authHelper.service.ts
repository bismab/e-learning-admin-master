import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  jwthelper = new JwtHelperService();
  constructor() { }

  isLoggedin() {
    let token = this.getAuthToken;

    if (!token) return false;

    //let expirationDate=jwthelper.getTokenExpirationDate(token);
    let isExpired = this.jwthelper.isTokenExpired(token);
    if (isExpired) {
      this.removeAuthToken();
    }
    return !isExpired;
    // return tokenNotExpired();
  }

  get currentUser() {
    let token = this.getAuthToken;
    if (!token) return null;
    return this.jwthelper.decodeToken(token);
  }

  logOut() {
    this.removeAuthToken();
  }

  get getAuthToken() {
    return localStorage.getItem('aeldat');
  }

  set setAuthToken(token) {
    localStorage.setItem('aeldat', token);
  }

  removeAuthToken() {
    localStorage.removeItem('aeldat');
  }

}
