import {Injectable} from '@angular/core';
import {BitWorkerService} from './bit-worker.service';
import {MikrotikService} from './mikrotik.service';
import {ServicePlanService} from './service-plan.service';

@Injectable({
  providedIn: 'root'
})
export class MkMigrateService {
  constructor(
    private mikrotikService: MikrotikService,
    private servicePlanService: ServicePlanService,
    private bitWorkerService: BitWorkerService) {
  }

  // migrar servicios del mikrotik.
  public mikrotikMigrate(id: string): void {
    this.mikrotikService.getServicesList(id).subscribe(result => {
      const services = Array.from(result);
      const timer = setInterval(async () => {
        if (services.length > 0) {
          const currentService = services[0];
          this.bitWorkerService.addService(currentService._id)
            .subscribe(result => {
              if (result.ok) {
                console.log(`migración exitosa #${services.length}`);
              } else {
                console.log(`migración errónea #${services.length}`);
              }
            });
        }
        if (services.length === 0) {
          console.log('migración completada!');
          clearInterval(timer);
        }
        services.shift();
      }, 4000);
    });
  }

  // migrar servicios por tarifa.
  public servicePlanMigrate(id: string): void {
    this.servicePlanService.getServicesList(id).subscribe(result => {
      const services = Array.from(result);
      console.log('iniciando actualización');
      const timer = setInterval(async () => {
        if (services.length > 0) {
          const currentService = services[0];
          this.bitWorkerService.changeServicePlan(currentService._id, id)
            .subscribe(result => {
              if (result.ok) {
                console.log(`actualización exitosa #${services.length}`);
              } else {
                console.log(`actualización errónea #${services.length}`);
              }
            });
        }
        if (services.length === 0) {
          console.log('actualización completada!');
          clearInterval(timer);
        }
        services.shift();
      }, 4000);
    });
  }

}
