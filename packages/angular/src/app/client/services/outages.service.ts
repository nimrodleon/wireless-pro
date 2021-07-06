import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Outage} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OutagesService {
  private baseURL: string = environment.baseUrl + 'services/outages';

  constructor(private http: HttpClient) {
  }

  /**
   * List outage history.
   * @param id serviceId
   */
  getOutages(id: string): Observable<Outage[]> {
    return this.http.get<Outage[]>(this.baseURL + '/' + id + '/service');
  }

  /**
   * Get service outage.
   * @param id
   */
  getOutage(id: string): Observable<Outage> {
    return this.http.get<Outage>(this.baseURL + '/' + id);
  }

  /**
   * Create Outage document.
   * @param outage
   */
  create(outage: Outage): Observable<Outage> {
    return this.http.post<Outage>(this.baseURL, outage);
  }

}
