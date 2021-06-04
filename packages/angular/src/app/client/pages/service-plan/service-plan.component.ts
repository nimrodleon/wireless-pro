import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import _ from 'lodash';
import {AuthService} from 'src/app/user/services/auth.service';
import Swal from 'sweetalert2';
import {ServicePlan} from '../../interfaces/service-plan';
import {ServicePlanService} from '../../services/service-plan.service';

@Component({
  selector: 'app-service-plan',
  templateUrl: './service-plan.component.html',
  styleUrls: ['./service-plan.component.scss']
})
export class ServicePlanComponent implements OnInit {
  // TODO: refactorizar esta linea de código.
  isAdmin: boolean;
  servicePlanList: ServicePlan[];
  servicePlan: ServicePlan = new ServicePlan();
  titleModal: string = '';
  query: string = '';

  constructor(private servicePlanService: ServicePlanService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getServicePlanList();
  }

  private getServicePlanList(): void {
    this.servicePlanService.getServicePlans(this.query)
      .subscribe(servicesPlan => this.servicePlanList = servicesPlan);
  }

  addServicePlan(): void {
    this.titleModal = 'Agregar Plan de Servicio';
    this.servicePlan = new ServicePlan();
    jQuery('#app-service-plan-modal').modal('show');
  }

  editServicePlan(id: string): void {
    this.titleModal = 'Editar Plan de Servicio';
    this.servicePlanService.getServicePlan(id).subscribe(res => {
      this.servicePlan = res;
      jQuery('#app-service-plan-modal').modal('show');
    });
  }

  // Ordenar servicePlanList.
  private orderName: string = 'asc';

  onOrderName(event: any): void {
    event.preventDefault();
    this.orderName = this.orderName == 'asc' ? 'desc' : 'asc';
    let objTmp = _.orderBy(this.servicePlanList, ['name'], [this.orderName]);
    this.servicePlanList = objTmp;
  }

  setServicePlan(servicePlan: ServicePlan): void {
    if (servicePlan._id === undefined) {
      this.servicePlanService.create(servicePlan).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plan de Servicio ' + res.name + ' registrado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.servicePlanList.push(res);
      });
    } else {
      this.servicePlanService.update(servicePlan).subscribe(res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plan de Servicio ' + res.name + ' Actualizado!',
          showConfirmButton: false,
          timer: 1500
        });
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
    if (!this.isAdmin) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
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
        if (result.value) {
          this.servicePlanService.countServices(id).subscribe(res => {
            if (res.count > 0) {
              Swal.fire(
                'No se pudo borrar?',
                'Existe mas de un servicio asociado a este registro?',
                'warning'
              );
            } else {
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
      });
    }
  }

  onSearch(): void {
    this.getServicePlanList();
  }

}
