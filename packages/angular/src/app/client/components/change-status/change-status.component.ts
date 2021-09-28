import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {Sweetalert2} from 'src/app/global/interfaces';
import {BitWorkerService, ServicePlanService} from 'src/app/system/services';
import {OutagesService, ServiceDetailService} from '../../services';
import {AuthService} from 'src/app/user/services';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent implements OnInit {
  workerActivityList: Array<any> = new Array<any>();
  workerActivityYear: FormControl = this.fb.control(moment().format('YYYY'));
  currentRole: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private bitWorkerService: BitWorkerService,
    private servicePlanService: ServicePlanService,
    private serviceDetailService: ServiceDetailService,
    private outagesService: OutagesService) {
  }

  ngOnInit(): void {
    // carga el rol actual del usuario.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
    // lista de actividades del mikrotik.
    this.getWorkerActivityListClick();
  }

  // id del servicio actual.
  get serviceId() {
    return this.serviceDetailService.serviceId;
  }

  // lista de roles.
  get roles() {
    return this.authService.roles;
  }

  // rol de caja.
  get roleIsCash() {
    return this.serviceDetailService.roleIsCash;
  }

  // rol de redes.
  get roleIsNetwork() {
    return this.serviceDetailService.roleIsNetwork;
  }

  // botón cargar lista estado de cambios.
  getWorkerActivityListClick(): void {
    this.getWorkerActivityList(this.serviceId, this.workerActivityYear.value);
  }

  // Lista de estado de cambios.
  private getWorkerActivityList(serviceId: string, year: string): void {
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
    return this.serviceDetailService.changeStatusService(this.serviceId, status);
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
  enableServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.roleIsCash.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
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
          const status = option === 'HST' ? 'HST' : 'HABILITADO';
          this.changeStatusService(status)
            .subscribe(() => {
              this.bitWorkerService.updateService(this.serviceId)
                .subscribe(async (result) => {
                  if (!result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    this.bitWorkerService.createWorkerActivity({
                      serviceId: this.serviceId,
                      task: 'HABILITAR SERVICIO',
                      typeOperation: option,
                      remark: this.getOperationDescription(option)
                    }).subscribe(() => {
                      this.getWorkerActivityListClick();
                    });
                    this.serviceDetailService.getCurrentService(this.serviceId)
                      .subscribe(result => console.log(result));
                    await Sweetalert2.messageSuccess();
                  }
                });
            });
        }
      }
    });
  }

  // Suspender servicio.
  suspendServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.roleIsCash.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
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
          this.changeStatusService('SUSPENDIDO')
            .subscribe(() => {
              this.bitWorkerService.updateService(this.serviceId)
                .subscribe(async (result) => {
                  if (!result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    this.bitWorkerService.createWorkerActivity({
                      serviceId: this.serviceId,
                      task: 'SUSPENDER SERVICIO',
                      typeOperation: option,
                      remark: this.getOperationDescription(option)
                    }).subscribe(() => {
                      this.getWorkerActivityListClick();
                    });
                    this.serviceDetailService.getCurrentService(this.serviceId)
                      .subscribe(result => console.log(result));
                    await Sweetalert2.messageSuccess();
                  }
                });
            });
        }
      }
    });
  }

  // Cambiar plan de servicio.
  async changeServicePlanInBitWorker(event: any) {
    event.preventDefault();
    this.roleIsCash.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
        this.getServicePlan()
          .subscribe(async (result) => {
            const {value: tarifa} = await Swal.fire({
              title: 'PLANES DE SERVICIO',
              input: 'select',
              inputOptions: {...result},
              inputPlaceholder: 'Seleccione una opción',
              showCancelButton: true,
              cancelButtonText: 'Cancelar'
            });
            if (tarifa) {
              this.bitWorkerService.changeServicePlan(this.serviceId, tarifa)
                .subscribe(async (result) => {
                  if (!result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    this.getWorkerActivityListClick();
                    this.serviceDetailService.getCurrentService(this.serviceId)
                      .subscribe(result => console.info(result));
                    await Sweetalert2.messageSuccess();
                  }
                });
            }
          });
      }
    });
  }

  // Registrar servicio.
  registerServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.roleIsNetwork.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
        Sweetalert2.messageConfirm().then(result => {
          if (result.isConfirmed) {
            this.bitWorkerService.addService(this.serviceId)
              .subscribe(async (result) => {
                if (!result.ok) {
                  await Sweetalert2.errorMessage();
                } else {
                  this.bitWorkerService.createWorkerActivity({
                    serviceId: this.serviceId,
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
    });
  }

  // Actualizar servicio.
  updateServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.roleIsNetwork.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
        Sweetalert2.messageConfirm().then(result => {
          if (result.isConfirmed) {
            this.bitWorkerService.updateService(this.serviceId)
              .subscribe(async (result) => {
                if (!result.ok) {
                  await Sweetalert2.errorMessage();
                } else {
                  this.bitWorkerService.createWorkerActivity({
                    serviceId: this.serviceId,
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
    });
  }

  // Borrar servicio.
  deleteServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.roleIsNetwork.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
        Sweetalert2.deleteConfirm().then(result => {
          if (result.isConfirmed) {
            this.bitWorkerService.deleteService(this.serviceId)
              .subscribe(async (result) => {
                if (!result.ok) {
                  await Sweetalert2.errorMessage();
                } else {
                  this.bitWorkerService.createWorkerActivity({
                    serviceId: this.serviceId,
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
    });
  }

  // ====================================================================================================

  async cortesAntiguos(event: any) {
    event.preventDefault();
    this.outagesService.getOutages(this.serviceId)
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
