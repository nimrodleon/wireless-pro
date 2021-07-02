import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ServicePlanService} from '../../system/services';
import {ClientService} from '../../client/services';
import {UserService} from '../../user/services';
import {InstallationOrder} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {Client} from '../../client/interfaces';
import {User} from '../../user/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstallationOrderService {
  private baseURL: string = environment.baseUrl + 'installation_orders';

  constructor(
    private http: HttpClient,
    private servicePlanService: ServicePlanService,
    private userService: UserService,
    private clientService: ClientService) {
  }

  // Valores por defecto.
  orderDefaultValues(): InstallationOrder {
    return {
      _id: undefined,
      userId: undefined,
      clientId: '',
      address: '',
      city: '',
      region: '',
      typeInstallation: '',
      servicePlanId: '',
      costInstallation: 0,
      amount: 0,
      statusOrder: 'PENDIENTE',
      createdAt: undefined,
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

  // Obtener datos del usuario.
  getUserById(id): Observable<User> {
    return this.userService.getUser(id);
  }

  // Agregar cliente.
  addClient(data: Client): Observable<Client> {
    return this.clientService.create(data);
  }

  // Lista de planes de servicio.
  getServicePlans(): Observable<ServicePlan[]> {
    return this.servicePlanService.getServicePlans('');
  }

  // Obtener plan de servicio por id.
  getServicePlanById(id: string): Observable<ServicePlan> {
    return this.servicePlanService.getServicePlan(id);
  }

  // Lista de ordenes de instalación.
  getInstallationOrders(query: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get(this.baseURL, {params});
  }

  // Obtener orden de instalación por id.
  getInstallationOrderById(id): Observable<InstallationOrder> {
    return this.http.get<InstallationOrder>(`${this.baseURL}/${id}`);
  }

  // registrar orden de instalación.
  addOrder(data: InstallationOrder): Observable<InstallationOrder> {
    delete data.createdAt;
    return this.http.post<InstallationOrder>(this.baseURL, data);
  }

  // actualizar orden de instalación.
  updateOrder(data: InstallationOrder): Observable<InstallationOrder> {
    return this.http.patch<InstallationOrder>(`${this.baseURL}/${data._id}`, data);
  }

}
