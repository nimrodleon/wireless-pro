import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var jQuery: any;
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {AuthService} from 'src/app/user/services/auth.service';
import {ServicePlan} from '../../../system/interfaces/service-plan';
import {ServicePlanService} from '../../../system/services/service-plan.service';
import {Service} from '../../interfaces/service';
import {ServiceService} from '../../services/service.service';
import {environment} from 'src/environments/environment';
import {DeviceService} from '../../../devices/services/device.service';

@Component({
  selector: 'app-add-client-service',
  templateUrl: './add-client-service.component.html',
  styleUrls: ['./add-client-service.component.scss']
})
export class AddClientServiceComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  clientId: string;

  @Input()
  service: Service;

  @Output()
  sendService = new EventEmitter<Service>();

  @Output()
  sendDeleteService = new EventEmitter<boolean>();

  servicePlanList: ServicePlan[];
  // TODO: refactorizar esta line de código.
  isAdmin: boolean;

  // baseURL para select2.
  baseURL: string = environment.baseUrl + 'devices';

  constructor(private servicePlanService: ServicePlanService,
              private serviceService: ServiceService, private authService: AuthService,
              private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.servicePlanService.getServicePlans().subscribe(res => {
      this.servicePlanList = res;
    });
    jQuery('#app-add-client-service').on('shown.bs.modal', () => {
      jQuery('select[name="accessPoint"]').select2({
        theme: 'bootstrap4',
        minimumInputLength: 4,
        ajax: {
          url: this.baseURL + '/v1/select2/s'
        }
      });
      // Preselecting options in an remotely-sourced.
      jQuery('select[name="accessPoint').val(null).trigger('change');
      if (this.service._id) {
        if (this.service.accessPoint) {
          this.deviceService.getDevice(this.service.accessPoint).subscribe(res => {
            const option = new Option(res.name + ' - ' + res.ipAddress, res._id, true, true);
            jQuery('select[name="accessPoint').append(option).trigger('change');
          });
        }
      }
    });
  }

  // Envia un Evento para guardar el servicio.
  saveChanges(): void {
    this.service.client = this.clientId;
    if (this.service._id === undefined) {
      this.service.createdAt = moment().format('YYYY-MM-DD');
    }
    this.service.accessPoint = jQuery('select[name="accessPoint"]').val();
    this.sendService.emit(this.service);
    jQuery('#app-add-client-service').modal('hide');
  }

  // delete current service.
  deleteService(): void {
    if (this.service) {
      Swal.fire({
        title: 'Seguro de borrar esté Servicio?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceService.paymentsCount(this.service._id)
            .subscribe(res => {
              if (res > 0) {
                Swal.fire(
                  'No se pudo borrar?',
                  'Existe mas de un pago asociado a este registro?',
                  'warning'
                );
              } else {
                this.serviceService.delete(this.service._id)
                  .subscribe(res => {
                    this.sendDeleteService.emit(true);
                    jQuery('#app-add-client-service').modal('hide');
                  });
              }
            });
        }
      });
    }
  }

}
