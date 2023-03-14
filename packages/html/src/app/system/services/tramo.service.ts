import {Injectable} from '@html/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams} from '@html/common/http';
import {Observable} from 'rxjs';
import {Tramo} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TramoService {
  private baseURL: string = environment.baseUrl + 'tramo';

  constructor(private http: HttpClient) {
  }

  getTramos(search: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get(this.baseURL, {params: params});
  }

  getTramo(id: string): Observable<Tramo> {
    return this.http.get<Tramo>(this.baseURL + '/' + id);
  }

  create(tramo: Tramo): Observable<Tramo> {
    return this.http.post<Tramo>(this.baseURL, tramo);
  }

  update(tramo: Tramo): Observable<Tramo> {
    return this.http.patch<Tramo>(this.baseURL + '/' + tramo._id, tramo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id);
  }

  getCoverages(): Observable<any> {
    return this.http.get(this.baseURL + '/coverages/all');
  }

  getTramosV1(): Observable<Tramo[]> {
    return this.http.get<Tramo[]>(this.baseURL + '/v1/all');
  }

  // countDevices(id: string): Observable<number> {
  //   return this.http.get<number>(this.baseURL + '/' + id + '/count');
  // }

  // valores por defecto.
  defaultValues(): Tramo {
    return {
      _id: undefined,
      tramo: '',
      coverage: ''
    };
  }

}
