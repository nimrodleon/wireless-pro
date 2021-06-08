import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = environment.baseUrl + 'users';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(user: any): Observable<any> {
    return this.http.post(this.baseURL + '/login', user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getPermission(): any {
    this.getCurrentUser().subscribe(res => {
      console.log(res);
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(() => {
      console.info('[logout]');
    });
  }

  private getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseURL + '/profile/currentUser');
  }

}
