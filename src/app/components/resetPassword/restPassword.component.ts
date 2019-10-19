import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'reset-password',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})
export class restPasswordComponent implements OnInit, OnDestroy {
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
  
  resetPassword(){
    this.userService.setPassword(this.loginForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
        alert('password reset succesfully');
        this.router.navigateByUrl(`/login`);
    },(error)=>{
        alert('Something wrong');

    });
  }
}
