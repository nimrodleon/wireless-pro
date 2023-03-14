import {Injectable} from '@html/core';
import {CanActivate, Router} from '@html/router';
import {AuthService} from './user/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
