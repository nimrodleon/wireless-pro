import {Injectable} from '@angular/core';
import {Client, Service} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {ServiceService} from './service.service';
import {ClientService} from './client.service';
import {ServicePlanService} from '../../system/services';
import {Averia} from '../../averia/interfaces/averia';
import {AveriaService} from '../../averia/services/averia.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {
  private _currentService: Service;
  private _currentClient: Client;
  private _currentServicePlan: ServicePlan;
  // ============================================================
  private _averiaList: Array<Averia>;
  private _currentAveria: Averia;

  constructor(
    private serviceService: ServiceService,
    private clientService: ClientService,
    private servicePlanService: ServicePlanService,
    private averiaService: AveriaService) {
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
    return this._averiaList;
  }

  // averia actual.
  get currentAveria(): Averia {
    return this._currentAveria;
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

  // cargar lista de averias.
  getAveriaList(serviceId: string, year: string): void {
    this.averiaService.getAveriasByServiceId(serviceId, year)
      .subscribe(result => this._averiaList = result);
  }

  // cargar averia por id.
  getAveriaById(id: string): void {
    this.averiaService.getAveria(id)
      .subscribe(result => this._currentAveria = result);
  }

  // establecer valor por defecto averia actual.
  setDefaultValueAveria(): void {
    this._currentAveria = this.averiaService.defaultValues();
  }


}
