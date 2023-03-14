import {Injectable} from '@html/core';
import {HttpClient} from '@html/common/http';
import {Router} from '@html/router';
import {Observable, Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Roles} from '../interfaces';

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

  getToken(): any {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(() => {
      console.info('[logout]');
    });
  }

  // es un rol administrador.
  roleIsAdmin(): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.getRoles().subscribe((currentRole: string) => {
      subject.next(currentRole === this.roles.ROLE_ADMIN);
    });
    return subject.asObservable();
  }

  // es un rol red.
  roleIsNetwork(): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.getRoles().subscribe((currentRole: string) => {
      subject.next(currentRole === this.roles.ROLE_NETWORK);
    });
    return subject.asObservable();
  }

  // es un rol de caja.
  roleIsCash(): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.getRoles().subscribe((currentRole: string) => {
      subject.next(currentRole === this.roles.ROLE_CASH);
    });
    return subject.asObservable();
  }

}
