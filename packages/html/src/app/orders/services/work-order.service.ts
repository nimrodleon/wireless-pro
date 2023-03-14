import {Injectable} from '@html/core';
import {HttpClient, HttpParams} from '@html/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ServicePlanService} from '../../system/services';
import {ClientService} from '../../client/services';
import {UserService} from '../../user/services';
import {WorkOrder} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {Client} from '../../client/interfaces';
import {User} from '../../user/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private baseURL: string = environment.baseUrl + 'work_orders';

  constructor(
    private http: HttpClient,
    private servicePlanService: ServicePlanService,
    private userService: UserService,
    private clientService: ClientService) {
  }

  // Valores por defecto cliente.
  clientDefaultValues(): Client {
    return this.clientService.defaultValues();
  }

  // Valores por defecto service-plan.
  servicePlanDefaultValues(): ServicePlan {
    return this.servicePlanService.defaultValues();
  }

  // Obtener datos del cliente por id.
  getClientById(id: string): Observable<Client> {
    return this.clientService.getClientById(id);
  }

  // Obtener datos del usuario.
  getUserById(id: string): Observable<User> {
    return this.userService.getUserById(id);
  }

  // Agregar cliente.
  addClient(data: Client): Observable<Client> {
    return this.clientService.createClient(data);
  }

  // Lista de planes de servicio.
  getServicePlans(): Observable<ServicePlan[]> {
    return this.servicePlanService.getServicePlans('');
  }

  // Obtener plan de servicio por id.
  getServicePlanById(id: string): Observable<ServicePlan> {
    return this.servicePlanService.getServicePlan(id);
  }

  // Lista de ordenes de trabajo.
  getWorkOrders(query: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get(this.baseURL, {params});
  }

  // Lista ordenes de trabajo por mes y año.
  getWorkOrdersByYearMonth(query: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', query.search);
    return this.http.get(`${this.baseURL}/${query.year}/${query.month}/report`, {params});
  }

  // Obtener orden de trabajo por id.
  getWorkOrderById(id: any): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(`${this.baseURL}/${id}`);
  }

  // Obtener orden de trabajo por id del cliente.
  getWorkOrderByClientId(id: string | any): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(`${this.baseURL}/${id}/client`);
  }

  // registrar orden de instalación.
  addOrder(data: WorkOrder): Observable<WorkOrder> {
    delete data.createdAt;
    return this.http.post<WorkOrder>(this.baseURL, data);
  }

  // actualizar orden de instalación.
  updateOrder(data: WorkOrder): Observable<WorkOrder> {
    return this.http.patch<WorkOrder>(`${this.baseURL}/${data._id}`, data);
  }

  // borrar orden de instalación.
  deleteOrder(id: string): Observable<WorkOrder> {
    return this.http.delete<WorkOrder>(`${this.baseURL}/${id}`);
  }

  // Valores por defecto.
  defaultValues(): WorkOrder {
    return {
      _id: undefined,
      userId: undefined,
      clientId: '',
      description: '',
      address: '',
      city: '',
      region: '',
      typeTask: '',
      servicePlanId: '',
      total: 0,
      amount: 0,
      statusOrder: 'PENDIENTE',
      createdAt: undefined,
    };
  }

}
