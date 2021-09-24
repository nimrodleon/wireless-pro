import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Sweetalert2} from 'src/app/global/interfaces';
import {Client, Payment, Service} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {ServiceService} from './service.service';
import {ClientService} from './client.service';
import {ServicePlanService} from '../../system/services';
import {Averia} from '../../averia/interfaces/averia';
import {AveriaService} from '../../averia/services/averia.service';
import {PaymentService} from './payment.service';
import {AuthService} from '../../user/services';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailService {
  private _currentService: Service;
  private _currentClient: Client;
  private _currentServicePlan: ServicePlan;
  // ============================================================

  // // ============================================================
  // private _averiaList: Array<Averia> = new Array<Averia>();
  // private _currentAveria: Averia;
  // // ============================================================
  // private _paymentList: Array<Payment> = new Array<Payment>();

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

  // servicio actual.
  get currentService(): Service {
    return {...this._currentService};
  }

  // cliente actual.
  get currentClient(): Client {
    return {...this._currentClient};
  }

  // plan de servicio actual.
  get currentServicePlan(): ServicePlan {
    return {...this._currentServicePlan};
  }

  // // Lista de averias.
  // get averiaList(): Array<Averia> {
  //   return this._averiaList;
  // }
  //
  // // averia actual.
  // get currentAveria(): Averia {
  //   return this._currentAveria;
  // }
  //
  // // lista de pagos.
  // get paymentList(): Array<Payment> {
  //   return this._paymentList;
  // }

  // ============================================================

  // cargar valores por defecto.
  getCurrentService(serviceId: string | any): Observable<boolean> {
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
  async deleteService(serviceId: string) {
    this.serviceService.deleteService(serviceId).subscribe(() => {
      Sweetalert2.deleteSuccess();
    });
  }

  // cambiar estado del servicio.
  changeStatusService(id: string, status: string): Observable<Service> {
    return this.serviceService.changeStatusService(id, status);
  }

  // ============================================================

  // // cargar lista de averias.
  // getAveriaList(serviceId: string | any, year: string | any): void {
  //   this.averiaService.getAveriasByServiceId(serviceId, year)
  //     .subscribe(result => this._averiaList = result);
  // }
  //
  // // cargar averia por id.
  // getAveriaById(id: string): void {
  //   this.averiaService.getAveria(id)
  //     .subscribe(result => this._currentAveria = result);
  // }
  //
  // // establecer valor por defecto averia actual.
  // setDefaultValueAveria(): void {
  //   this._currentAveria = this.averiaService.defaultValues();
  // }
  //
  // // registrar averia.
  // async createAveria(data: Averia) {
  //   this.averiaService.create(data)
  //     .subscribe(result => this._currentAveria = result);
  // }
  //
  // // actualizar averia.
  // async updateAveria(data: Averia) {
  //   this.averiaService.update(data)
  //     .subscribe(result => this._currentAveria = result);
  // }
  //
  // // borra averia.
  // deleteAveria(id: string): Observable<Averia> {
  //   return this.averiaService.delete(id);
  // }

  // ============================================================

  // // Lista de pagos.
  // getPaymentList(serviceId: string | any, year: string | any): void {
  //   this.paymentService.getPaymentList(serviceId, year)
  //     .subscribe(result => this._paymentList = result);
  // }
  //
  // // borrar pago.
  // deletePayment(id: string | any): Observable<Payment> {
  //   return this.paymentService.deletePayment(id);
  // }

}
