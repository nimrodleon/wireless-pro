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

  // Obtener usuario autentificado.
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseURL + '/profile/currentUser');
  }

  // Lista de usuarios.
  getUsers(status: any = false): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('status', status);
    return this.http.get<User[]>(this.baseURL, {params: params});
  }

  // buscar usuario formato select2.
  getUsersWithSelect2(term: string): Observable<any> {
    return this.http.get(this.baseURL + `/select2/q?term=${term}`);
  }

  // obtener usuario por id.
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }

  // registrar usuario.
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL, user);
  }

  // actualizar datos del usuario.
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseURL}/${user._id}`, user);
  }

  // actualizar datos del usuario desde la sección profile.
  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/${user._id}`, user);
  }

  // cambiar contraseña.
  changePasswordUser(user_id: string, passwd: any): Observable<any> {
    return this.http.post(`${this.baseURL}/${user_id}/change-password`, passwd);
  }

  // borrar usuario por id.
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
