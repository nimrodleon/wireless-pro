import {Injectable} from '@html/core';
import {BitWorkerService} from './bit-worker.service';
import {MikrotikService} from './mikrotik.service';
import {ServicePlanService} from './service-plan.service';

@Injectable({
  providedIn: 'root'
})
export class MkMigrateService {
  private _servicesLength: number = -1;

  constructor(
    private mikrotikService: MikrotikService,
    private servicePlanService: ServicePlanService,
    private bitWorkerService: BitWorkerService) {
  }

  // tamaño del array servicios.
  get servicesLength(): number {
    return this._servicesLength;
  }

  // migrar servicios del mikrotik.
  public mikrotikMigrate(id: string, modal: any): void {
    this._servicesLength = -1;
    this.mikrotikService.getServicesList(id).subscribe(result => {
      modal.show();
      console.log('iniciando actualización');
      const services = Array.from(result);
      const timer = setInterval(async () => {
        if (services.length > 0) {
          const currentService = services[0];
          this.bitWorkerService.addService(currentService._id)
            .subscribe(result => {
              if (result.ok) {
                this._servicesLength = services.length;
                console.log(`migración #${services.length} exitosa`);
              } else {
                this._servicesLength = services.length;
                console.log(`migración #${services.length} errónea`);
              }
            });
        }
        if (services.length === 0) {
          console.log('migración completada!');
          modal.hide();
          clearInterval(timer);
        }
        services.shift();
      }, 5000);
    });
  }

  // migrar servicios por tarifa.
  public servicePlanMigrate(id: string, modal: any): void {
    this._servicesLength = -1;
    this.servicePlanService.getServicesList(id).subscribe(result => {
      modal.show();
      console.log('iniciando actualización');
      const services = Array.from(result);
      const timer = setInterval(async () => {
        if (services.length > 0) {
          const currentService = services[0];
          this.bitWorkerService.changeServicePlan(currentService._id, id)
            .subscribe(result => {
              if (result.ok) {
                this._servicesLength = services.length;
                console.log(`actualización #${services.length} exitosa`);
              } else {
                this._servicesLength = services.length;
                console.log(`actualización #${services.length} errónea`);
              }
            });
        }
        if (services.length === 0) {
          console.log('actualización completada!');
          modal.hide();
          clearInterval(timer);
        }
        services.shift();
      }, 10000);
    });
  }

}
