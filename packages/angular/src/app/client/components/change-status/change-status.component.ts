import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import * as moment from 'moment';
import {Observable, Subject} from 'rxjs';
import {Sweetalert2} from 'src/app/global/interfaces';
import {BitWorkerService, ServicePlanService} from 'src/app/system/services';
import Swal from 'sweetalert2';
import {Service} from '../../interfaces';
import {OutagesService, ServiceDetailService, ServiceService} from '../../services';
import {AuthService} from '../../../user/services';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  @Input()
  currentService: Service;
  workerActivityList: Array<any> = new Array<any>();
  workerActivityYear: FormControl = this.fb.control(moment().format('YYYY'));
  currentRole: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bitWorkerService: BitWorkerService,
    private servicePlanService: ServicePlanService,
    private serviceDetailService: ServiceDetailService,
    private serviceService: ServiceService,
    private outagesService: OutagesService) {
    // valor por defecto del servicio actual.
    this.currentService = this.serviceService.defaultValues();
  }

  ngOnInit(): void {
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }


  // botón cargar lista estado de cambios.
  getWorkerActivityListClick(): void {
    this.getWorkerActivityList(this.currentService._id, this.workerActivityYear.value);
  }

  // Lista de estado de cambios.
  private getWorkerActivityList(serviceId: string | any, year: string | any): void {
    this.bitWorkerService.getWorkerActivities(serviceId, year).subscribe(result => {
      this.workerActivityList = result;
    });
  }

  // valores planes de servicio.
  private getServicePlan(): Observable<any> {
    let subject = new Subject<any>();
    this.servicePlanService.getServicePlans()
      .subscribe(result => {
        let data = {};
        Array.from(result).forEach(item => {
          // @ts-ignore
          data[item._id] = item.name;
        });
        subject.next(data);
      });
    return subject.asObservable();
  }

  // cambiar estado del servicio.
  private changeStatusService(status: string): Observable<any> {
    return this.serviceDetailService.changeStatusService(this.currentService._id, status);
  }

  // obtener nota de operación.
  getOperationDescription(id: string) {
    let remarkStatusChange = {
      'HST': 'HABILITAR SERVICIO TEMPORAL',
      'N01': 'ACTIVACIÓN POR REGISTRO DE PAGO',
      'N02': 'ACTIVACIÓN A SOLICITUD DEL CLIENTE',
      'N03': 'CORTE POR FALTA DE PAGO',
      'N04': 'SUSPENSIÓN A SOLICITUD DEL CLIENTE'
    };
    // @ts-ignore
    return remarkStatusChange[id];
  }

  // Habilitar servicio.
  // @ts-ignore
  async enableServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_CASH) {
      return Sweetalert2.accessDeniedGeneric();
    }
    const {value: option} = await Swal.fire({
      title: 'HABILITAR SERVICIO',
      input: 'select',
      inputOptions: {
        'HST': 'HABILITAR SERVICIO TEMPORAL',
        'N01': 'ACTIVACIÓN POR REGISTRO DE PAGO',
        'N02': 'ACTIVACIÓN A SOLICITUD DEL CLIENTE',
      },
      inputPlaceholder: 'Seleccione una opción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    if (option) {
      let serviceId = this.currentService._id;
      const status = option === 'HST' ? 'HST' : 'HABILITADO';
      this.changeStatusService(status)
        .subscribe(() => {
          this.bitWorkerService.updateService(serviceId)
            .subscribe(async (result) => {
              if (!result.ok) {
                await Sweetalert2.errorMessage();
              } else {
                this.bitWorkerService.createWorkerActivity({
                  serviceId: this.currentService._id,
                  task: 'HABILITAR SERVICIO',
                  typeOperation: option,
                  remark: this.getOperationDescription(option)
                }).subscribe(() => {
                  this.getWorkerActivityListClick();
                });
                this.serviceDetailService.getCurrentService(this.currentService._id)
                  .subscribe(result => console.log(result));
                await Sweetalert2.messageSuccess();
              }
            });
        });
    }
  }

  // Suspender servicio.
  // @ts-ignore
  async suspendServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_CASH) {
      return Sweetalert2.accessDeniedGeneric();
    }
    const {value: option} = await Swal.fire({
      title: 'SUSPENSIÓN DE SERVICIO',
      input: 'select',
      inputOptions: {
        'N03': 'CORTE POR FALTA DE PAGO',
        'N04': 'SUSPENSIÓN A SOLICITUD DEL CLIENTE'
      },
      inputPlaceholder: 'Seleccione una opción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    if (option) {
      let serviceId = this.currentService._id;
      this.changeStatusService('SUSPENDIDO')
        .subscribe(() => {
          this.bitWorkerService.updateService(serviceId)
            .subscribe(async (result) => {
              if (!result.ok) {
                await Sweetalert2.errorMessage();
              } else {
                this.bitWorkerService.createWorkerActivity({
                  serviceId: this.currentService._id,
                  task: 'SUSPENDER SERVICIO',
                  typeOperation: option,
                  remark: this.getOperationDescription(option)
                }).subscribe(() => {
                  this.getWorkerActivityListClick();
                });
                this.serviceDetailService.getCurrentService(this.currentService._id)
                  .subscribe(result => console.log(result));
                await Sweetalert2.messageSuccess();
              }
            });
        });
    }
  }

  // Cambiar plan de servicio.
  // @ts-ignore
  async changeServicePlanInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_CASH) {
      return Sweetalert2.accessDeniedGeneric();
    }
    this.getServicePlan()
      .subscribe(async (result) => {
        const {value: option} = await Swal.fire({
          title: 'PLANES DE SERVICIO',
          input: 'select',
          inputOptions: {...result},
          inputPlaceholder: 'Seleccione una opción',
          showCancelButton: true,
          cancelButtonText: 'Cancelar'
        });
        if (option) {
          let serviceId = this.currentService._id;
          this.bitWorkerService.changeServicePlan(serviceId, option)
            .subscribe(result => {
              if (result.ok) {
                this.bitWorkerService.updateService(serviceId)
                  .subscribe(async (result) => {
                    if (!result.ok) {
                      await Sweetalert2.errorMessage();
                    } else {
                      this.servicePlanService.getServicePlan(option)
                        .subscribe(result => {
                          this.bitWorkerService.createWorkerActivity({
                            serviceId: this.currentService._id,
                            task: 'CAMBIAR PLAN DE SERVICIO',
                            typeOperation: '-',
                            remark: result.name,
                          }).subscribe(() => {
                            this.getWorkerActivityListClick();
                          });
                        });
                      this.serviceDetailService.getCurrentService(this.currentService._id)
                        .subscribe(result => console.log(result));
                      await Sweetalert2.messageSuccess();
                    }
                  });
              }
            });
        }
      });
  }

  // Registrar servicio.
  // @ts-ignore
  async registerServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      return Sweetalert2.accessDeniedGeneric();
    }
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        let serviceId = this.currentService._id;
        this.bitWorkerService.addService(serviceId)
          .subscribe(async (result) => {
            if (!result.ok) {
              await Sweetalert2.errorMessage();
            } else {
              this.bitWorkerService.createWorkerActivity({
                serviceId: this.currentService._id,
                task: 'REGISTRAR SERVICIO',
                typeOperation: '-',
                remark: '-'
              }).subscribe(() => {
                this.getWorkerActivityListClick();
              });
              await Sweetalert2.messageSuccess();
            }
          });
      }
    });
  }

  // Actualizar servicio.
  // @ts-ignore
  async updateServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      return Sweetalert2.accessDeniedGeneric();
    }
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        let serviceId = this.currentService._id;
        this.bitWorkerService.updateService(serviceId)
          .subscribe(async (result) => {
            if (!result.ok) {
              await Sweetalert2.errorMessage();
            } else {
              this.bitWorkerService.createWorkerActivity({
                serviceId: this.currentService._id,
                task: 'ACTUALIZAR SERVICIO',
                typeOperation: '-',
                remark: '-'
              }).subscribe(() => {
                this.getWorkerActivityListClick();
              });
              await Sweetalert2.messageSuccess();
            }
          });
      }
    });
  }

  // Borrar servicio.
  // @ts-ignore
  async deleteServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      return Sweetalert2.accessDeniedGeneric();
    }
    Sweetalert2.deleteConfirm().then(result => {
      if (result.isConfirmed) {
        let serviceId = this.currentService._id;
        this.bitWorkerService.deleteService(serviceId)
          .subscribe(async (result) => {
            if (!result.ok) {
              await Sweetalert2.errorMessage();
            } else {
              this.bitWorkerService.createWorkerActivity({
                serviceId: this.currentService._id,
                task: 'BORRAR SERVICIO',
                typeOperation: '-',
                remark: '-'
              }).subscribe(() => {
                this.getWorkerActivityListClick();
              });
              await Sweetalert2.deleteSuccess();
            }
          });
      }
    });
  }

  // ====================================================================================================

  async cortesAntiguos(event: any) {
    event.preventDefault();
    this.outagesService.getOutages(this.currentService._id)
      .subscribe(result => {
        let content: string = '';
        Array.from(result).forEach(item => {
          content += `
          <tr>
            <td>${item.description}</td>
            <td class="text-end">${item.status === 'A' ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>'}</td>
            <td>${item.createdAt}</td>
          </tr>
          `;
        });
        return Swal.fire({
          title: '<strong>LISTA DE CORTES</strong>',
          html: `<table class="table table-striped mb-0"><tbody>${content}</tbody></table>`
        });
      });
  }

}
