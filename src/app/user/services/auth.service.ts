import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {environment} from "src/environments/environment";
import {Roles} from "../interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseURL: string = environment.baseUrl + "users";

  constructor(private http: HttpClient, private router: Router) {
  }

  get roles(): Roles {
    return {
      admin: "ROL_ADMIN",
      redes: "ROL_REDES",
      cajero: "ROL_CAJERO",
    };
  }

  login(user: any): any {
    return this.http.post(this.baseURL + "/login", user);
  }

  getRoles(): any {
    return this.http.get(this.baseURL + "/profile/roles");
  }

  loggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): any {
    return localStorage.getItem("token");
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]).then(() => {
      console.info("[logout]");
    });
  }

  // es un rol administrador.
  isRolAdmin(): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.getRoles().subscribe((currentRole: string) => {
      subject.next(currentRole === this.roles.admin);
    });
    return subject.asObservable();
  }

  // es un rol red.
  isRolRedes(): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.getRoles().subscribe((currentRole: string) => {
      subject.next(currentRole === this.roles.redes);
    });
    return subject.asObservable();
  }

  // es un rol de caja.
  isRolCajero(): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.getRoles().subscribe((currentRole: string) => {
      subject.next(currentRole === this.roles.cajero);
    });
    return subject.asObservable();
  }

}
