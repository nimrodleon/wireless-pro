import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL: string = environment.baseUrl + 'users';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseURL + '/profile/currentUser');
  }

  getUsers(status: any = false): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('status', status);
    return this.http.get<User[]>(this.baseURL, {params: params});
  }

  getUsersWithSelect2(term): Observable<any> {
    return this.http.get(this.baseURL + `/select2/q?term=${term}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseURL}/${user._id}`, user);
  }

  changePasswordUser(user_id: string, passwd: any): Observable<any> {
    return this.http.post(`${this.baseURL}/${user_id}/change-password`, passwd);
  }

  deleteUser(user_id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${user_id}`);
  }

  dependency(id: string): Observable<number> {
    return this.http.get<number>(this.baseURL + '/' + id + '/dependency');
  }

  // configuración del formulario.
  formGroup(): FormGroup {
    return this.fb.group({
      _id: [null],
      fullName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
      suspended: [false],
    });
  }

  // usuario valores por defecto.
  defaultValues(): User {
    return {
      _id: undefined,
      fullName: '',
      userName: '',
      password: '',
      roles: '',
      email: '',
      avatar: '',
      suspended: false,
    };
  }

}
