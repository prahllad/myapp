import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-protected-redirect',
  templateUrl: './protected-redirectUri.html'
})
export class proRedirectUri implements OnInit {
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
      this.connectProfile(params);
    }, (error) => {
      console.error('params:   ', error);
    });
  }
  connectProfile(data){
    this.userService.connectProfile(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data)=>{
        this.router.navigateByUrl('/dashboard')
        
    },(error)=>{
      console.error(error);
    });

  }
  
}
