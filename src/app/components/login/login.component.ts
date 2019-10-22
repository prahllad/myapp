import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  userForm: FormGroup;
  error: Object;
  isUserExist: boolean;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private title: Title,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService) {
      this.title.setTitle('Login');
      this.error = null;
      this.isUserExist = false;
  }
  ngOnInit() {
    this.initLoginForm();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  initLoginForm(email: string = null) {
    this.loginForm = new FormGroup({
      email: new FormControl(email, Validators.required),
      password: new FormControl(null, Validators.required)
    });
    this.userForm = new FormGroup({
      email: new FormControl(email, Validators.required)
    });
  }
  login() {
    let userAgent = navigator.userAgent;
    if (this.loginForm.valid) {
      this.loginForm.value['userAgent'] = userAgent;
      this.userService.login(this.loginForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success) => {
        this.cookieService.writeCookie('token', success.token, 2);
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        this.error = error;
      });
    }
  }
  checkUserExist() {
    if (this.userForm.valid) {
      this.userService.checkUserExist(this.userForm.value.email).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success) => {
        console.log('userExist', success);
        this.initLoginForm(success.email);
        this.isUserExist = true;
      }, (error) => {
        console.log(error);
        this.router.navigateByUrl(`/signup?email=${this.userForm.value.email}`);
      });
    }
  }
  authLogin(type){
    this.userService.getAuthLink(type).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
       window.open(success.link,'_self');
    },(error)=>{
         console.log(error);
    })
  }
}
