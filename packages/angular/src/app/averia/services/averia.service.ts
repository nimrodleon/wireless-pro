import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Averia} from '../interfaces/averia';
import {ClientService} from '../../client/services';
import {Client} from '../../client/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AveriaService {
  private baseURL: string = environment.baseUrl + 'averias';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private clientService: ClientService) {
  }

  getAverias(archived: any, search: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('archived', archived);
    params = params.append('search', search);
    return this.http.get(this.baseURL, {params: params});
  }

  // Lista de averias.
  getAveria(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + id);
  }

  // Lista de averias por servicio.
  getAveriasByServiceId(serviceId: string): Observable<Averia[]> {
    return this.http.get<Averia[]>(`${this.baseURL}/${serviceId}/service`);
  }

  // registrar averia.
  create(averia: Averia): Observable<Averia> {
    return this.http.post<Averia>(this.baseURL, averia);
  }

  // actualizar averia.
  update(averia: Averia): Observable<Averia> {
    return this.http.patch<Averia>(this.baseURL + '/' + averia._id, averia);
  }

  // borrar averia.
  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id);
  }

  // obtener cliente por id.
  getClientById(clientId: string): Observable<Client> {
    return this.clientService.getClientById(clientId);
  }

  // averia form group.
  formGroup(): FormGroup {
    return this.fb.group({
      _id: [null],
      averia: [''],
      client: [''],
      user: [''],
      status: [''],
      priority: [''],
      archived: [false],
      createdAt: [moment().format('YYYY-MM-DD, hh:mm:ss A')],
      year: [moment().format('YYYY')],
      month: [moment().format('MM')],
      day: [moment().format('DD')],
      origin: [''],
      solution: [''],
    });
  }

  // Valor por defecto.
  defaultValues(): Averia {
    return {
      _id: undefined,
      averia: '',
      client: '',
      user: '',
      status: '',
      priority: '',
      archived: false,
      createdAt: '',
      year: '',
      month: '',
      day: '',
      origin: '',
      solution: ''
    };
  }

}
