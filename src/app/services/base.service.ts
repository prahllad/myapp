import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from './cookie.service';
@Injectable({
  providedIn: 'root'
})
export class BaseService extends CookieService {
  protected apiUrl: String;
  protected httpHeaders: HttpHeaders;
  constructor() {
    super();
    this.apiUrl = environment.API;
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }
  protected getHeaders() {
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.readCookie('token');
    if (token) {
      this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `JWT ${token}`);
    }
    return {headers: this.httpHeaders};
  }
  protected postOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected getOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected putOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected deleteOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected patchOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected extractData(httpResponse: HttpResponse<Object>) {
    return httpResponse['data'] || {};
  }
  protected handleError(httpErrorResponse: HttpErrorResponse) {
    return throwError(httpErrorResponse['error'].error || {});
  }
}
