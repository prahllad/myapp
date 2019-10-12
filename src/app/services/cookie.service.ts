import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() {
  }
  writeCookie(name: String, value: String, days: any = 1) {
    if (name) {
      value = this.encrypt(value);
      const expDate = new Date();
      expDate.setTime(expDate.getTime() + (days * 24 * 60 * 60 * 1000));
      const expireIn = expDate.toUTCString();
      const domain = environment.APP_DOMAIN;
      document.cookie = `${name}=${value};expires=${expireIn};domain=${domain};path=/;`;
    }
  }
  readCookie(name: String) {
    const cookie = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookie ? this.decrypt(cookie.pop()) : null;
  }
  eraseCookie(name: string) {
    this.writeCookie(name, '', -1);
  }
  encrypt(text) {
    const cipherText = crypto.AES.encrypt(text, environment.SECRET);
    return cipherText;
  }
  decrypt(text) {
    try {
      const bytes = crypto.AES.decrypt(text.toString(), environment.SECRET);
      return bytes.toString(crypto.enc.Utf8);
    } catch (err) {
        return text;
    }
}
}
