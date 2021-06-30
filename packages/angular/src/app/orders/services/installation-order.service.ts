import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ServicePlanService} from '../../system/services';
import {Order} from '../interfaces';
import {Observable} from 'rxjs';
import {ServicePlan} from '../../system/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstallationOrderService {
  private baseURL: string = environment.baseUrl + 'installation_orders';

  constructor(
    private http: HttpClient,
    private servicePlanService: ServicePlanService) {
  }

  // Valores por defecto.
  orderDefaultValues(): Order {
    return {
      clientId: '',
      address: '',
      city: '',
      region: '',
      typeInstallation: '',
      servicePlanId: '',
      costInstallation: 0,
      amount: 0,
      statusOrder: 'PENDIENTE'
    };
  }

  // Lista de planes de servicio.
  getServicePlans(): Observable<ServicePlan[]> {
    return this.servicePlanService.getServicePlans('');
  }

  // registrar orden de instalación.
  addOrder(data: Order): Observable<Order> {
    return this.http.post<Order>(this.baseURL, data);
  }

}
