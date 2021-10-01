import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
declare var bootstrap: any;
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import {ServicePlan} from '../../interfaces';
import {MkMigrateService, ServicePlanService} from '../../services';
import {Sweetalert2} from '../../../global/interfaces';

@Component({
  selector: 'app-service-plan',
  templateUrl: './service-plan.component.html',
  styleUrls: ['./service-plan.component.scss']
})
export class ServicePlanComponent implements OnInit {
  staticBackdrop: any;
  servicePlanList: Array<ServicePlan> = new Array<ServicePlan>();
  servicePlan: ServicePlan;
  titleModal: string = '';
  query: string = '';

  constructor(
    private mkMigrateService: MkMigrateService,
    private servicePlanService: ServicePlanService,) {
    this.servicePlan = this.servicePlanService.defaultValues();
  }

  ngOnInit(): void {
    this.getServicePlanList();
    // Establecer modal con bootstrap.
    this.staticBackdrop = new bootstrap.Modal(document.querySelector('#staticBackdrop'));
  }

  // tamaño de servicios.
  get servicesLength() {
    return this.mkMigrateService.servicesLength;
  }

  private getServicePlanList(): void {
    this.servicePlanService.getServicePlans(this.query)
      .subscribe(servicesPlan => this.servicePlanList = servicesPlan);
  }

  addServicePlan(): void {
    this.titleModal = 'Agregar Plan de Servicio';
    this.servicePlan = this.servicePlanService.defaultValues();
    jQuery('#app-service-plan-modal').modal('show');
  }

  editServicePlan(id: string): void {
    this.titleModal = 'Editar Plan de Servicio';
    this.servicePlanService.getServicePlan(id).subscribe(res => {
      this.servicePlan = res;
      jQuery('#app-service-plan-modal').modal('show');
    });
  }

  setServicePlan(servicePlan: ServicePlan): void {
    if (servicePlan._id === undefined) {
      this.servicePlanService.create(servicePlan).subscribe(res => {
        this.servicePlanList.push(res);
      });
    } else {
      this.servicePlanService.update(servicePlan).subscribe(res => {
        _.forEach(this.servicePlanList, (item, key) => {
          if (item._id == res._id) {
            this.servicePlanList[key] = res;
          }
        });
      });
    }
  }

  // delete service-plan.
  deleteServicePlan(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de borrar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicePlanService.delete(id).subscribe(res => {
          this.getServicePlanList();
          Swal.fire(
            'Borrado!',
            'El registro ha sido borrado.',
            'success'
          );
        });
      }
    });
  }

  onSearch(): void {
    this.getServicePlanList();
  }

  // migrar servicios del mikrotik.
  servicesMigrate(id: string): void {
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        this.mkMigrateService.servicePlanMigrate(id, this.staticBackdrop);
      }
    });
  }

}
