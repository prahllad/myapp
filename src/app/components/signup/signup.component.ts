import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  error: Object;
  byAuth:Boolean = false;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private title: Title,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService) {
      this.title.setTitle('Signup');
      this.error = null;
  }
  ngOnInit() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      if(params.type){
        this.byAuth = true;
      }
      this.initSignupForm(params.email,params.name);
    }, (error) => {
      console.error('params:   ', error);
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  initSignupForm(email: string = null , name:String = null) {
    console.log('email: ', email);
    this.signupForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(email?email:'', Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  signup() {
    if (this.signupForm.valid && !this.byAuth) {
      
      let element = document.getElementById('signup');
      element['value'] = 'Processing......'
      this.userService.register(this.signupForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success) => {
        console.log('success:::::::::::: ', success);
        this.cookieService.writeCookie('token', success.token, 2);
        this.router.navigateByUrl('/dashboard');
      }, (error) => {
        this.error = error;
      });
    }
    else{
      this.userService.setPassword(this.signupForm.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
        this.cookieService.writeCookie('token', success.token, 2);
        this.router.navigateByUrl('/dashboard');
      }),(error)=>{
      
      }
    }
  }
}
