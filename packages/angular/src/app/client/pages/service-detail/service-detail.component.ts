import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';

declare var bootstrap: any;
import {BitWorkerService, ServicePlanService} from 'src/app/system/services';
import {AuthService} from 'src/app/user/services';
import {Sweetalert2} from 'src/app/global/interfaces';
import {OutagesService, ServiceDetailService} from '../../services';
import {PrintPayment} from '../../interfaces';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  titleService: string;
  serviceModal: any;
  // ============================================================
  averiaYearInput: FormControl = this.fb.control(moment().format('YYYY'));
  titleAveria: string;
  averiaModal: any;
  attendAveriaModal: any;
  // ============================================================
  paymentYearInput: FormControl = this.fb.control(moment().format('YYYY'));
  paymentModal: any;
  titlePayment: string;
  // ============================================================
  currentRole: string;
  workerActivityList: Array<any>;
  workerActivityYear: FormControl = this.fb.control(moment().format('YYYY'));

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private serviceDetailService: ServiceDetailService,
    private authService: AuthService,
    private bitWorkerService: BitWorkerService,
    private servicePlanService: ServicePlanService,
    private outagesService: OutagesService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceDetailService.getCurrentService(params.get('id'))
        .subscribe(result => console.log(result));
      this.serviceDetailService.getAveriaList(params.get('id'), this.averiaYearInput.value);
      this.serviceDetailService.getPaymentList(params.get('id'), this.paymentYearInput.value);
      this.getWorkerActivityList(params.get('id'), this.workerActivityYear.value);
    });
    // vincular modal servicios.
    this.serviceModal = new bootstrap.Modal(
      document.querySelector('#service-modal'));
    // vincular modal averia.
    this.averiaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-modal'));
    // vincular modal atender averia.
    this.attendAveriaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-attend'));
    // vincular modal pagos.
    this.paymentModal = new bootstrap.Modal(
      document.querySelector('#payment-modal'));
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe(result => this.currentRole = result);
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // servicio actual.
  get currentService() {
    return this.serviceDetailService.currentService;
  }

  // cliente actual.
  get currentClient() {
    return this.serviceDetailService.currentClient;
  }

  // plan de servicio actual.
  get currentServicePlan() {
    return this.serviceDetailService.currentServicePlan;
  }

  // Lista de averias.
  get averiaList() {
    return this.serviceDetailService.averiaList;
  }

  // averia actual.
  get currentAveria() {
    return this.serviceDetailService.currentAveria;
  }

  // lista de averias.
  get paymentList() {
    return this.serviceDetailService.paymentList;
  }

  // editar servicio modal.
  async editServiceModal() {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      await Sweetalert2.accessDeniedGeneric();
    } else {
      this.titleService = 'Editar Servicio';
      this.serviceDetailService.getCurrentService(this.currentService._id)
        .subscribe(() => {
          this.serviceModal.show();
        });
    }
  }

  // borrar servicio actual.
  async deleteServiceClick(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      await Sweetalert2.accessDenied();
    } else {
      Sweetalert2.deleteConfirm().then(result => {
        if (result.isConfirmed) {
          this.serviceDetailService.deleteService(this.currentService._id);
        }
      });
    }
  }

  // cerrar modal servicios.
  hideServiceModal(value: boolean): void {
    if (value === true) {
      this.serviceDetailService.getCurrentService(this.currentService._id)
        .subscribe(() => this.serviceModal.hide());
    }
  }

  // cargar lista de averias.
  averiaListLoad(): void {
    this.serviceDetailService.getAveriaList(this.currentService._id, this.averiaYearInput.value);
  }

  // agregar averia.
  addAveriaClick(): void {
    this.titleAveria = 'Agregar Averia';
    this.serviceDetailService.setDefaultValueAveria();
    this.averiaModal.show();
  }

  // editar averia.
  editAveriaClick(id: string): void {
    this.titleAveria = 'Editar Averia';
    this.serviceDetailService.getAveriaById(id);
    this.averiaModal.show();
  }

  // atender averia.
  attendAveriaClick(id: string): void {
    this.serviceDetailService.getAveriaById(id);
    this.attendAveriaModal.show();
  }

  // guardar cambios averia.
  async saveChangeAveria(data: any) {
    if (data._id === undefined) {
      // registrar averia.
      data.client = this.currentClient._id;
      data.serviceId = this.currentService._id;
      await this.serviceDetailService.createAveria(data);
      this.averiaModal.hide();
      this.averiaListLoad();
    } else {
      // actualizar averia.
      await this.serviceDetailService.updateAveria(data);
      this.averiaModal.hide();
      this.attendAveriaModal.hide();
      this.averiaListLoad();
    }
  }

  // borrar averia.
  async deleteAveriaClick(id: string) {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      await Sweetalert2.accessDenied();
    } else {
      Sweetalert2.deleteConfirm().then(result => {
        if (result.isConfirmed) {
          this.serviceDetailService.deleteAveria(id).subscribe(() => {
            this.averiaListLoad();
            Sweetalert2.deleteSuccess();
          });
        }
      });
    }
  }

  // cargar lista de pagos.
  getPaymentList(): void {
    this.serviceDetailService.getPaymentList(this.currentService._id, this.paymentYearInput.value);
  }

  // obtener nombre del mes.
  getMonthName(value: string) {
    switch (value) {
      case '01':
        return 'ENERO';
      case '02':
        return 'FEBRERO';
      case '03':
        return 'MARZO';
      case '04':
        return 'ABRIL';
      case '05':
        return 'MAYO';
      case '06':
        return 'JUNIO';
      case '07':
        return 'JULIO';
      case '08':
        return 'AGOSTO';
      case '09':
        return 'SEPTIEMBRE';
      case '10':
        return 'OCTUBRE';
      case '11':
        return 'NOVIEMBRE';
      case '12':
        return 'DICIEMBRE';
    }
  }

  // agregar pago.
  async addPaymentClick() {
    if (this.currentRole !== this.roles.ROLE_CASH) {
      await Sweetalert2.accessDeniedGeneric();
    } else {
      this.titlePayment = 'Agregar Pago de Servicio';
      this.paymentModal.show();
    }
  }

  // cerrar modal de pagos.
  hidePaymentModal(print: PrintPayment): void {
    if (print.hideModal) {
      this.paymentModal.hide();
    }
    if (!print.printReceipt) {
      this.serviceDetailService.getCurrentService(this.currentService._id)
        .subscribe(() => this.getPaymentList());
    } else {
      this.router.navigate(['/client/ticket', print.paymentId])
        .then(() => console.info('Imprimir Ticket'));
    }
  }

  // borrar pago de servicio.
  async deletePayment() {
    let chkDel = document.querySelectorAll('#chkDel:checked');
    if (chkDel.length <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Seleccione un Pago!',
        showConfirmButton: true,
      });
    }
    if (chkDel.length > 1) {
      return Swal.fire({
        icon: 'info',
        title: 'Seleccione solo un Pago!',
        showConfirmButton: true,
      });
    }
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      await Sweetalert2.accessDenied();
    } else {
      Sweetalert2.deleteConfirm().then(result => {
        if (result.isConfirmed) {
          let paymentId = chkDel[0].getAttribute('value');
          this.serviceDetailService.deletePayment(paymentId)
            .subscribe(() => {
              this.getPaymentList();
              Sweetalert2.deleteSuccess();
            });
        }
      });
    }
  }

  // ====================================================================================================

  // botón cargar lista estado de cambios.
  getWorkerActivityListClick(): void {
    this.getWorkerActivityList(this.currentService._id, this.workerActivityYear.value);
  }

  // Lista de estado de cambios.
  private getWorkerActivityList(serviceId: string, year: string): void {
    this.bitWorkerService.getWorkerActivities(serviceId, year).subscribe(result => {
      this.workerActivityList = result;
    });
  }

  // valores del registro simpleQueue.
  private getSimpleQueueValues(disabled: string): any {
    return {
      name: this.currentService._id,
      target: this.currentService.ipAddress,
      maxLimit: `${this.currentServicePlan.uploadSpeed}/${this.currentServicePlan.downloadSpeed}`,
      limitAt: '0/0',
      comment: this.currentClient.fullName,
      disabled: disabled,
      mikrotikId: this.currentService.mikrotikId,
      serviceId: this.currentService._id
    };
  }

  // valores del registro arp.
  private getArpValues(interfaceId: string, disabled: string): Observable<any> {
    let subject = new Subject<any>();
    this.bitWorkerService.getInterfaceNameById(interfaceId).subscribe(interfaceName => {
      subject.next({
        address: this.currentService.ipAddress,
        macAddress: this.currentService.macAddress,
        interface: interfaceName,
        comment: this.currentClient.fullName,
        disabled: disabled,
        mikrotikId: this.currentService.mikrotikId,
        serviceId: this.currentService._id
      });
    });
    return subject.asObservable();
  }

  // valores planes de servicio.
  private getServicePlan(): Observable<any> {
    let subject = new Subject<any>();
    this.servicePlanService.getServicePlans()
      .subscribe(result => {
        let data = {};
        Array.from(result).forEach(item => {
          data[item._id] = item.name;
        });
        subject.next(data);
      });
    return subject.asObservable();
  }

  // cambiar estado del servicio.
  private changeStatusService(status: string): void {
    this.serviceDetailService.changeStatusService(this.currentService._id, status)
      .subscribe(() => {
        this.serviceDetailService.getCurrentService(this.currentService._id)
          .subscribe(result => console.log(result));
      });
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
    return remarkStatusChange[id];
  }

  // Habilitar servicio.
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
      let {mikrotikId, interfaceId} = this.currentService;
      this.bitWorkerService.getSimpleQueueById(mikrotikId, serviceId)
        .subscribe(async (data) => {
          if (!data.ok) {
            await Sweetalert2.errorMessage();
          } else {
            if (!interfaceId) return Sweetalert2.errorMessage();
            this.getArpValues(interfaceId, 'no').subscribe(arpData => {
              this.bitWorkerService.updateArpList(serviceId, arpData).subscribe(() => {
                this.bitWorkerService.updateSimpleQueue(serviceId, this.getSimpleQueueValues('no'))
                  .subscribe(() => {
                    Sweetalert2.messageSuccess();
                    this.bitWorkerService.createWorkerActivity({
                      serviceId: this.currentService._id,
                      task: 'HABILITAR SERVICIO',
                      typeOperation: option,
                      remark: this.getOperationDescription(option)
                    }).subscribe(() => {
                      this.getWorkerActivityListClick();
                    });
                    this.changeStatusService('HABILITADO');
                  });
              });
            });
          }
        });
    }
  }

  // Suspender servicio.
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
      let {mikrotikId, interfaceId} = this.currentService;
      this.bitWorkerService.getSimpleQueueById(mikrotikId, serviceId)
        .subscribe(async (data) => {
          if (!data.ok) {
            await Sweetalert2.errorMessage();
          } else {
            if (!interfaceId) return Sweetalert2.errorMessage();
            this.getArpValues(interfaceId, 'yes').subscribe(arpData => {
              this.bitWorkerService.updateArpList(serviceId, arpData).subscribe(() => {
                this.bitWorkerService.updateSimpleQueue(serviceId, this.getSimpleQueueValues('yes'))
                  .subscribe(() => {
                    Sweetalert2.messageSuccess();
                    this.bitWorkerService.createWorkerActivity({
                      serviceId: this.currentService._id,
                      task: 'SUSPENDER SERVICIO',
                      typeOperation: option,
                      remark: this.getOperationDescription(option)
                    }).subscribe(() => {
                      this.getWorkerActivityListClick();
                    });
                    this.changeStatusService('SUSPENDIDO');
                  });
              });
            });
          }
        });
    }
  }

  // Cambiar plan de servicio.
  async changeServicePlanInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_CASH) {
      return Sweetalert2.accessDeniedGeneric();
    }
    this.getServicePlan().subscribe(async (result) => {
      const {value: option} = await Swal.fire({
        title: 'PLANES DE SERVICIO',
        input: 'select',
        inputOptions: {...result},
        inputPlaceholder: 'Seleccione una opción',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      });
      if (option) {
        let {mikrotikId} = this.currentService;
        let serviceId = this.currentService._id;
        this.bitWorkerService.getSimpleQueueById(mikrotikId, serviceId)
          .subscribe(async (data) => {
            if (!data.ok) {
              await Sweetalert2.errorMessage();
            } else {
              // obtener el plan de servicio seleccionado.
              this.servicePlanService.getServicePlan(option)
                .subscribe(result => {
                  // cambiar el plan de servicio - del servicio actual.
                  this.serviceDetailService.changeServicePlan(serviceId, result._id)
                    .subscribe(async () => {
                      // volver a cargar el servicio actual.
                      this.serviceDetailService.getCurrentService(serviceId)
                        .subscribe(() => {
                          // actualizar datos en el router mikrotik.
                          let disabled = data.simpleQueue.disabled;
                          if (disabled === 'true' || disabled === 'false')
                            disabled = disabled === 'true' ? 'yes' : 'no';
                          this.bitWorkerService.updateSimpleQueue(serviceId, this.getSimpleQueueValues(disabled))
                            .subscribe(() => {
                              Sweetalert2.messageSuccess();
                              this.bitWorkerService.createWorkerActivity({
                                serviceId: this.currentService._id,
                                task: 'CAMBIAR PLAN DE SERVICIO',
                                typeOperation: '-',
                                remark: result.name,
                              }).subscribe(() => {
                                this.getWorkerActivityListClick();
                              });
                            });
                        });
                    });
                });
            }
          });
      }
    });
  }

  // Registrar servicio.
  async registerServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      return Sweetalert2.accessDeniedGeneric();
    }
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        // comprobar que el servicio no este registrado.
        let {mikrotikId, ipAddress, interfaceId} = this.currentService;
        if (!mikrotikId) return Sweetalert2.errorMessage();
        // comprobar que servicio no este registro.
        this.bitWorkerService.getArpListById(mikrotikId, this.currentService._id)
          .subscribe(async (result) => {
            if (result.ok) {
              await Sweetalert2.errorMessage();
            } else {
              // comprobar que la ip del servicio no este registro en el mikrotik.
              this.bitWorkerService.getArpListByIpAddress(mikrotikId, ipAddress)
                .subscribe(async (result) => {
                  if (result.ok) {
                    await Sweetalert2.errorMessage();
                  } else {
                    // registrar nuevo servicio.
                    if (!interfaceId) return Sweetalert2.errorMessage();
                    this.getArpValues(interfaceId, 'no').subscribe(data => {
                      this.bitWorkerService.createArpList(data).subscribe(() => {
                        this.bitWorkerService.createSimpleQueue(this.getSimpleQueueValues('no'))
                          .subscribe(() => {
                            Sweetalert2.messageSuccess();
                            this.bitWorkerService.createWorkerActivity({
                              serviceId: this.currentService._id,
                              task: 'REGISTRAR SERVICIO',
                              typeOperation: '-',
                              remark: '-'
                            }).subscribe(() => {
                              this.getWorkerActivityListClick();
                            });
                            this.changeStatusService('HABILITADO');
                          });
                      });
                    });
                  }
                });
            }
          });
      }
    });
  }

  // Actualizar servicio.
  async updateServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      return Sweetalert2.accessDeniedGeneric();
    }
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        let serviceId = this.currentService._id;
        let {mikrotikId, interfaceId} = this.currentService;
        if (!mikrotikId) return Sweetalert2.errorMessage();
        this.bitWorkerService.getArpListById(mikrotikId, serviceId)
          .subscribe(async (result) => {
            let {arpItem} = result;
            if (!result.ok) {
              await Sweetalert2.errorMessage();
            } else {
              if (!interfaceId) return Sweetalert2.errorMessage();
              this.getArpValues(interfaceId, arpItem.disabled).subscribe(data => {
                this.bitWorkerService.updateArpList(serviceId, data).subscribe(() => {
                  this.bitWorkerService.updateSimpleQueue(serviceId, this.getSimpleQueueValues(arpItem.disabled))
                    .subscribe(() => {
                      Sweetalert2.messageSuccess();
                      this.bitWorkerService.createWorkerActivity({
                        serviceId: this.currentService._id,
                        task: 'ACTUALIZAR SERVICIO',
                        typeOperation: '-',
                        remark: '-'
                      }).subscribe(() => {
                        this.getWorkerActivityListClick();
                      });
                    });
                });
              });
            }
          });
      }
    });
  }

  // Borrar servicio.
  async deleteServiceInBitWorker(event: any) {
    event.preventDefault();
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      return Sweetalert2.accessDeniedGeneric();
    }
    Sweetalert2.deleteConfirm().then(result => {
      if (result.isConfirmed) {
        let serviceId = this.currentService._id;
        let {mikrotikId} = this.currentService;
        if (!mikrotikId) return Sweetalert2.errorMessage();
        this.bitWorkerService.getArpListById(mikrotikId, serviceId)
          .subscribe(async (result) => {
            if (!result.ok) {
              await Sweetalert2.errorMessage();
            } else {
              this.bitWorkerService.deleteArpList(mikrotikId, serviceId)
                .subscribe(() => {
                  this.bitWorkerService.deleteSimpleQueue(mikrotikId, serviceId)
                    .subscribe(() => {
                      Sweetalert2.deleteSuccess();
                      this.bitWorkerService.createWorkerActivity({
                        serviceId: this.currentService._id,
                        task: 'BORRAR SERVICIO',
                        typeOperation: '-',
                        remark: '-'
                      }).subscribe(() => {
                        this.getWorkerActivityListClick();
                      });
                      this.changeStatusService('DESHABILITADO');
                    });
                });
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
