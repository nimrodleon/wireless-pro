import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Coverage} from '../interfaces/coverage';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {
  private baseURL: string = environment.baseUrl + 'coverages';

  constructor(private http: HttpClient) {
  }

  getCoverages(query: string = ''): Observable<Array<Coverage>> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get<Array<Coverage>>(this.baseURL, {params: params});
  }

  getCoverage(id: string): Observable<Coverage> {
    return this.http.get<Coverage>(`${this.baseURL}/${id}`);
  }

  create(coverage: Coverage): Observable<Coverage> {
    return this.http.post<Coverage>(this.baseURL, coverage);
  }

  update(coverage: Coverage): Observable<Coverage> {
    return this.http.patch<Coverage>(`${this.baseURL}/${coverage._id}`, coverage);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  totalClients(): Observable<any> {
    return this.http.get(this.baseURL + '/report/total');
  }

}
