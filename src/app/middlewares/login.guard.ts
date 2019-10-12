import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cookieService.readCookie('token')) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
