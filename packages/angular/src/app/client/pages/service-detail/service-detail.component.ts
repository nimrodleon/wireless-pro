import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

declare var bootstrap: any;
import {BitWorkerService} from 'src/app/system/services';
import {AuthService} from 'src/app/user/services';
import {Sweetalert2} from 'src/app/global/interfaces';
import {ServiceDetailService} from '../../services';
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
    private bitWorkerService: BitWorkerService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceDetailService.getCurrentService(params.get('id'));
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
      this.serviceModal.show();
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
      this.serviceDetailService.getCurrentService(this.currentService._id);
      this.serviceModal.hide();
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
      this.getPaymentList();
      this.serviceDetailService.getCurrentService(this.currentService._id);
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

  // Lista de estado de cambios.
  private getWorkerActivityList(serviceId: string, year: string): void {
    this.bitWorkerService.getWorkerActivities(serviceId, year).subscribe(result => {
      this.workerActivityList = result;
    });
  }

  // botón cargar lista estado de cambios.
  getWorkerActivityListClick(): void {
    this.getWorkerActivityList(this.currentService._id, this.workerActivityYear.value);
  }

  // Habilitar servicio.
  enableServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.bitWorkerService.createWorkerActivity({
      serviceId: this.currentService._id,
      task: 'HABILITAR SERVICIO',
      remark: '-'
    }).subscribe(() => {
      this.getWorkerActivityListClick();
    });
  }

  // Suspender servicio.
  suspendServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.bitWorkerService.createWorkerActivity({
      serviceId: this.currentService._id,
      task: 'SUSPENDER SERVICIO',
      remark: '-'
    }).subscribe(() => {
      this.getWorkerActivityListClick();
    });
  }

  // Cambiar plan de servicio.
  changeServicePlanInBitWorker(event: any): void {
    event.preventDefault();
    this.bitWorkerService.createWorkerActivity({
      serviceId: this.currentService._id,
      task: 'CAMBIAR PLAN DE SERVICIO',
      remark: '-'
    }).subscribe(() => {
      this.getWorkerActivityListClick();
    });
  }

  // Registrar servicio.
  registerServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.bitWorkerService.createWorkerActivity({
      serviceId: this.currentService._id,
      task: 'REGISTRAR SERVICIO',
      remark: '-'
    }).subscribe(() => {
      this.getWorkerActivityListClick();
    });
  }

  // Borrar servicio.
  deleteServiceInBitWorker(event: any): void {
    event.preventDefault();
    this.bitWorkerService.createWorkerActivity({
      serviceId: this.currentService._id,
      task: 'BORRAR SERVICIO',
      remark: '-'
    }).subscribe(() => {
      this.getWorkerActivityListClick();
    });
  }

}
