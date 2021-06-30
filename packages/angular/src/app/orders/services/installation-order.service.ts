import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ServicePlanService} from '../../system/services';
import {Order} from '../interfaces';
import {Observable} from 'rxjs';
import {ServicePlan} from '../../system/interfaces';
import {Client} from '../../client/interfaces';
import {ClientService} from '../../client/services';

@Injectable({
  providedIn: 'root'
})
export class InstallationOrderService {
  private baseURL: string = environment.baseUrl + 'installation_orders';

  constructor(
    private http: HttpClient,
    private servicePlanService: ServicePlanService,
    private clientService: ClientService) {
  }

  // Valores por defecto.
  orderDefaultValues(): Order {
    return {
      _id: undefined,
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

  // Valores por defecto cliente.
  clientDefaultValues(): Client {
    return this.clientService.clientDefaultValues();
  }

  // Obtener datos del cliente por id.
  getClientById(id): Observable<Client> {
    return this.clientService.getClient(id);
  }

  // Agregar cliente.
  addClient(data: Client): Observable<Client> {
    return this.clientService.create(data);
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
