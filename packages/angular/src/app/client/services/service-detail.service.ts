import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Sweetalert2} from 'src/app/global/interfaces';
import {Client, Service} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {ServiceService} from './service.service';
import {ClientService} from './client.service';
import {ServicePlanService} from '../../system/services';
import {AuthService} from '../../user/services';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {
  private _serviceId: string = '';
  private _currentService: Service;
  private _currentClient: Client;
  private _currentServicePlan: ServicePlan;

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService,
    private clientService: ClientService,
    private servicePlanService: ServicePlanService,) {
    // establecer valores por defecto.
    this._currentService = this.serviceService.defaultValues();
    this._currentClient = this.clientService.defaultValues();
    this._currentServicePlan = this.servicePlanService.defaultValues();
  }

  // obtener id del servicio.
  get serviceId() {
    return this._serviceId;
  }

  // establecer el id del servicio.
  set serviceId(value: string) {
    this._serviceId = value;
  }

  // rol administrador.
  get roleIsAdmin() {
    return this.authService.roleIsAdmin();
  }

  // rol de redes.
  get roleIsNetwork() {
    return this.authService.roleIsNetwork();
  }

  // rol de caja.
  get roleIsCash() {
    return this.authService.roleIsCash();
  }

  // servicio actual.
  get currentService(): Service {
    return this._currentService;
  }

  // cliente actual.
  get currentClient(): Client {
    return {...this._currentClient};
  }

  // plan de servicio actual.
  get currentServicePlan(): ServicePlan {
    return {...this._currentServicePlan};
  }

  // ============================================================

  // cargar valores por defecto.
  public getCurrentService(serviceId: string | any): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.serviceService.getServiceById(serviceId)
      .subscribe(service => {
        this._currentService = service;
        this.clientService.getClientById(service.clientId)
          .subscribe(result => {
            this._currentClient = result;
            this.servicePlanService.getServicePlan(service.servicePlanId)
              .subscribe(result => {
                this._currentServicePlan = result;
                subject.next(true);
              });
          });
      });
    return subject.asObservable();
  }

  // borrar servicio actual.
  public async deleteService(serviceId: string) {
    this.serviceService.deleteService(serviceId).subscribe(() => {
      Sweetalert2.deleteSuccess();
    });
  }

  // cambiar estado del servicio.
  public changeStatusService(id: string, status: string): Observable<Service> {
    return this.serviceService.changeStatusService(id, status);
  }

}
