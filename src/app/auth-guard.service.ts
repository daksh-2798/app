import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService , private router : Router) { }

  canActivate(route , state : RouterStateSnapshot)
  {
    // let user = this.auth.appUser$.pipe(map(user => {
    //     if(user) return true;
  
    //     this.router.navigate(['/login'],{
    //       queryParams :{ returnUrl : state.url}
    //     });
    //     return false;
    //   }));
    //   console.log('userAuthGuard', user);
    //return true;
    return this.auth.user$.pipe(map(user => {
      if(user) return true;

      this.router.navigate(['/login'],{
        queryParams :{ returnUrl : state.url}
      });
      return false;
    }));
  }
}
