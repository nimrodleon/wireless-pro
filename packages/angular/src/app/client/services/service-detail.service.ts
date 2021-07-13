import {Injectable} from '@angular/core';
import {Client, Service} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {ServiceService} from './service.service';
import {ClientService} from './client.service';
import {ServicePlanService} from '../../system/services';
import {Averia} from '../../averia/interfaces/averia';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {
  private _currentService: Service;
  private _currentClient: Client;
  private _currentServicePlan: ServicePlan;
  // ============================================================
  private _averiaList: Array<Averia>;

  constructor(
    private serviceService: ServiceService,
    private clientService: ClientService,
    private servicePlanService: ServicePlanService) {
    // establecer valores por defecto.
    this._currentService = this.serviceService.defaultValues();
    this._currentClient = this.clientService.defaultValues();
    this._currentServicePlan = this.servicePlanService.defaultValues();
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

  // Lista de averias.
  get averiaList(): Array<Averia> {
    return
  }

  // cargar valores por defecto.
  getCurrentService(serviceId: string): void {
    this.serviceService.getServiceById(serviceId).subscribe(result => {
      this._currentService = result;
      this.clientService.getClientById(result.clientId)
        .subscribe(result => this._currentClient = result);
      this.servicePlanService.getServicePlan(result.servicePlanId)
        .subscribe(result => this._currentServicePlan = result);
    });
  }


}
