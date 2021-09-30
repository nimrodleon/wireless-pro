import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ServicePlan} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicePlanService {
  private baseURL: string = environment.baseUrl + 'service-plans';

  constructor(private http: HttpClient) {
  }

  getServicePlans(query: string = ''): Observable<ServicePlan[]> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get<ServicePlan[]>(this.baseURL, {params: params});
  }

  getServicePlansActive(clientId: string): Observable<ServicePlan[]> {
    return this.http.get<ServicePlan[]>(`${this.baseURL}/${clientId}/active`);
  }

  getServicePlan(id: string): Observable<ServicePlan> {
    return this.http.get<ServicePlan>(`${this.baseURL}/${id}`);
  }

  create(servicePlan: ServicePlan): Observable<ServicePlan> {
    return this.http.post<ServicePlan>(this.baseURL, servicePlan);
  }

  update(servicePlan: ServicePlan): Observable<ServicePlan> {
    return this.http.patch<ServicePlan>(`${this.baseURL}/${servicePlan._id}`, servicePlan);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // total servicios habilitados/suspendidos del mikrotik.
  totalStatusServices(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}/totalStatusServices`);
  }

  // countServices(id: string): Observable<any> {
  //   return this.http.get(this.baseURL + '/' + id + '/count/services');
  // }
  //
  // totalClients(): Observable<any> {
  //   return this.http.get(this.baseURL + '/report/total');
  // }

  // Valores por defecto.
  defaultValues(): ServicePlan {
    return {
      _id: undefined,
      name: '',
      priceMonthly: 0,
      downloadSpeed: '',
      uploadSpeed: ''
    };
  }

}
