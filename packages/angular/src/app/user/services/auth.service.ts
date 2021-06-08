import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {Roles} from '../interfaces/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = environment.baseUrl + 'users';

  constructor(private http: HttpClient, private router: Router) {
  }

  get roles(): Roles {
    return {
      ROLE_ADMIN: 'ROLE_ADMIN',
      ROLE_NETWORK: 'ROLE_NETWORK',
      ROLE_CASH: 'ROLE_CASH',
      ROLE_USER: 'ROLE_USER'
    };
  }

  login(user: any): any {
    return this.http.post(this.baseURL + '/login', user);
  }

  getRoles(): any {
    return this.http.get(this.baseURL + '/profile/roles');
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(() => {
      console.info('[logout]');
    });
  }

}
