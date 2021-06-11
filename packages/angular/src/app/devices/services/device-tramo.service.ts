import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceTramoService {
  private baseURL: string = environment.baseUrl + 'tramo';

  constructor(private http: HttpClient) {
  }

  getCoveragesByTramos(): Observable<any> {
    return this.http.get(this.baseURL + '/coverages/all');
  }

  getTramosByCoverage(id): Observable<any> {
    return this.http.get(this.baseURL + '/coverage/' + id);
  }
}
