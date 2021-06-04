import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Averia} from '../interfaces/averia';

@Injectable({
  providedIn: 'root'
})
export class AveriaService {
  private baseURL: string = environment.baseUrl + 'averias';

  constructor(private http: HttpClient) {
  }

  getAverias(archived: any, search: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('archived', archived);
    params = params.append('search', search);
    return this.http.get(this.baseURL, {params: params});
  }

  getAveria(id: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + id);
  }

  create(averia: Averia): Observable<Averia> {
    return this.http.post<Averia>(this.baseURL, averia);
  }

  update(averia: Averia): Observable<Averia> {
    return this.http.patch<Averia>(this.baseURL + '/' + averia._id, averia);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id);
  }

}
