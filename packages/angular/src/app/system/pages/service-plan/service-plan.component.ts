import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import _ from 'lodash';
import Swal from 'sweetalert2';
import {AuthService} from 'src/app/user/services/auth.service';
import {ServicePlan} from '../../interfaces';
import {ServicePlanService} from '../../services';

@Component({
  selector: 'app-service-plan',
  templateUrl: './service-plan.component.html',
  styleUrls: ['./service-plan.component.scss']
})
export class ServicePlanComponent implements OnInit {
  servicePlanList: ServicePlan[];
  servicePlan: ServicePlan = {
    _id: undefined,
    name: '',
    priceMonthly: 0,
    downloadSpeed: '',
    uploadSpeed: '',
  };
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
    this.servicePlan = {
      _id: undefined,
      name: '',
      priceMonthly: 0,
      downloadSpeed: '',
      uploadSpeed: '',
    };
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

}
