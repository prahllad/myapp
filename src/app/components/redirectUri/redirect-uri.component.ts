import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect-uri.component.html'
})
export class RedirectUri implements OnInit {
  signupForm: FormGroup;
  error: Object;
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
      this.getUser(params);
    }, (error) => {
      console.error('params:   ', error);
    });
  }
  getUser(data){
    this.userService.authSignin(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((params)=>{
        console.log(params);
        if(params.token){
          this.cookieService.writeCookie('token', params.token, 2);
        this.router.navigateByUrl('/dashboard');
        }
        else
        this.router.navigateByUrl(`/signup?email=${params.email}&name=${params.name}&type=auth`);
    },(error)=>{
       this.router.navigateByUrl('/login');
      console.error(error);
    });

  }
  
}
