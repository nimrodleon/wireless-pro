import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './user/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']).then(() => {
      console.info('[Unauthorized]');
    });
    return false;
  }

}
