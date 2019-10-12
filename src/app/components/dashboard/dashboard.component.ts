import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  user: any;
  fbButton:String = 'Connect to Facebook';
  gButton:String = 'Connect to Google';
  verify:string = 'none';
  constructor(private router: Router,
    private cookieService: CookieService,
    private userService: UserService) {
      this.user = {};
    }

  ngOnInit() {
    this.getUser();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  getUser() {
    this.userService.retriveUser().pipe(takeUntil(this.ngUnsubscribe)).subscribe((success) => {
      this.user = success;
      this.buttonStatus(success);
    }, (error) => {
      console.error('error: ', error);
    });

  }
  buttonStatus(success){
    if(success.facebookAuth && !success.facebookAuth.auth_active){
      this.fbButton = "Connect to Facebook"

    }
    else{
      this.fbButton = "Disconnect Facebook"
    }
    if(success.googleAuth && !success.googleAuth.auth_active){
      this.gButton = 'Connect to Google'
    }
    else{
      this.gButton = 'Disconnect Google'

    }
  }
  sociaLink(type){
    if(this.user.facebookAuth.auth_active && type==='facebook')
    this.userService.socialLink({'type':type}).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
      console.log(success);
      this.user = success;
      this.buttonStatus(success);
    });
    else if(this.user.googleAuth.auth_active && type==='google'){
      this.userService.socialLink({'type':type}).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
        console.log(success);
      this.buttonStatus(success);

      });
    }
    else{
      this.userService.getAuthLink(type,true).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
        const newWindow = window.open(success.link, '_self');


      })
    }
      

  }

  logout() {
    this.cookieService.eraseCookie('token');
    this.router.navigateByUrl('/login');
  }
  sendCode(phone:HTMLInputElement,code:HTMLInputElement){
    let obj ={
      phone:phone.value,
      code:code?code.value:null
    }
    this.verify = 'block';
    this.userService.sendCode(obj).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success)=>{
      if(success.phone){
        this.verify = 'none';
        this.user = success;
      }
    })
  }

}
