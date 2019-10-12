import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  protected user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) {
    super();
  }
  checkUserExist(email: string) {
    const url = `${this.apiUrl}/user/${email}`;
    return this.httpClient.get(url, this.getOptions()).pipe(map(this.extractData), catchError(this.handleError));
  }
  login(credentials: Object) {
    const url = `${this.apiUrl}/user/signin`;
    return this.httpClient.post(url, credentials, this.postOptions()).pipe(map(this.extractData), catchError(this.handleError));
  }
  register(user: Object) {
    const url = `${this.apiUrl}/user/signup`;
    return this.httpClient.post(url, user, this.postOptions()).pipe(map(this.extractData), catchError(this.handleError));
  }
  retriveUser() {
    const url = `${this.apiUrl}/user`;
    return this.httpClient.get(url, this.getOptions()).pipe(map(this.extractData), catchError(this.handleError));
  }
  setUser(user) {
    this.user.next(user);
  }
  getUser() {
    return this.user.asObservable();
  }
  getAuthLink(type, authGaurd = false) {
    const url = `${this.apiUrl}/auth/loginlink/` + type

    if (authGaurd) {
      return this.httpClient.post(url, { authGaurd: true }, this.postOptions()).pipe(map(this.extractData), catchError(this.handleError));

    }
    else {
      return this.httpClient.get(url).pipe(map(this.extractData), catchError(this.handleError));

    }
  }
  authSignin(data) {
    const url = `${this.apiUrl}/auth/user`;
    return this.httpClient.post(url, data).pipe(map(this.extractData), catchError(this.handleError));
  }
  connectProfile(data) {
    const url = `${this.apiUrl}/social/profile`;
    return this.httpClient.post(url, data ,this.postOptions()).pipe(map(this.extractData), catchError(this.handleError));
  }
  setPassword(data) {
    const url = `${this.apiUrl}/setPassword`;
    return this.httpClient.post(url, data).pipe(map(this.extractData), catchError(this.handleError));
  }
  socialLink(data) {
    const url = `${this.apiUrl}/disconnect/auth`;
    return this.httpClient.post(url, data, this.postOptions()).pipe(map(this.extractData), catchError(this.handleError));

  }
  sendCode(data){
    const url = `${this.apiUrl}/sendcode`;
    return this.httpClient.post(url, data, this.postOptions()).pipe(map(this.extractData), catchError(this.handleError));

  }
  phonelogin(data) {
    const url = `${this.apiUrl}/login/phone`;
    return this.httpClient.post(url, data).pipe(map(this.extractData), catchError(this.handleError));
  }
}
