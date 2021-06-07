import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tower} from '../interfaces/tower';

@Injectable({
  providedIn: 'root'
})
export class TowerService {
  private baseURL: string = environment.baseUrl + 'tower';

  constructor(private http: HttpClient) {
  }

  getTowers(search: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get(this.baseURL, {params: params});
  }

  getTower(id: string): Observable<Tower> {
    return this.http.get<Tower>(this.baseURL + '/' + id);
  }

  create(tower: Tower): Observable<Tower> {
    return this.http.post<Tower>(this.baseURL, tower);
  }

  update(tower: Tower): Observable<Tower> {
    return this.http.patch<Tower>(this.baseURL + '/' + tower._id, tower);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id);
  }

  getCoverages(): Observable<any> {
    return this.http.get(this.baseURL + '/coverages/all');
  }

  getTowersV1(): Observable<Tower[]> {
    return this.http.get<Tower[]>(this.baseURL + '/v1/all');
  }

  countDevices(id: string): Observable<number> {
    return this.http.get<number>(this.baseURL + '/' + id + '/count');
  }

}
