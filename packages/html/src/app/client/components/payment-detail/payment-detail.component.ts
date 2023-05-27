import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Sweetalert2} from 'src/app/global/interfaces';
import {Payment, PrintPayment} from '../../interfaces';
import {PaymentService, ServiceDetailService} from '../../services';
import * as moment from 'moment';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html'
})
export class PaymentDetailComponent implements OnInit {
  paymentYearInput: UntypedFormControl = this.fb.control(moment().format('YYYY'));
  paymentModal: any;
  titlePayment: string = '';
  // Lista de pagos del año actual.
  payments: Array<Payment> = new Array<Payment>();

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private paymentService: PaymentService,
    private serviceDetailService: ServiceDetailService,) {
  }

  ngOnInit(): void {
    // cargar lista de pagos.
    this.getPayments();
    // vincular modal pagos.
    this.paymentModal = new bootstrap.Modal(document.querySelector('#payment-modal'));
  }

  // id del servicio actual.
  get serviceId() {
    return this.serviceDetailService.serviceId;
  }

  // es rol admin.
  get roleIsAdmin() {
    return this.serviceDetailService.roleIsAdmin;
  }

  // rol de caja.
  get roleIsCash() {
    return this.serviceDetailService.roleIsCash;
  }

  // servicio actual.
  get currentService() {
    return this.serviceDetailService.currentService;
  }

  // plan de servicio actual.
  get currentServicePlan() {
    return this.serviceDetailService.currentServicePlan;
  }

  // cargar lista de pagos del año actual.
  public getPayments(): void {
    this.paymentService.getPaymentList(this.serviceId, this.paymentYearInput.value)
      .subscribe(result => this.payments = result);
  }

  // obtener nombre del mes.
  public getMonthName(value: string) {
    const month = {
      '01': 'ENERO',
      '02': 'FEBRERO',
      '03': 'MARZO',
      '04': 'ABRIL',
      '05': 'MAYO',
      '06': 'JUNIO',
      '07': 'JULIO',
      '08': 'AGOSTO',
      '09': 'SEPTIEMBRE',
      '10': 'OCTUBRE',
      '11': 'NOVIEMBRE',
      '12': 'DICIEMBRE'
    };
    // @ts-ignore
    return month[value];
  }

  // agregar pago.
  public addPaymentClick(): void {
    this.roleIsCash.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDeniedGeneric();
      } else {
        this.titlePayment = 'Agregar Pago de Servicio';
        this.paymentModal.show();
      }
    });
  }

  // cerrar modal de pagos.
  public async hidePaymentModal(print: PrintPayment) {
    if (print.hideModal) {
      this.paymentModal.hide();
    }
    if (!print.printReceipt) {
      this.serviceDetailService.getCurrentService(this.serviceId)
        .subscribe(() => this.getPayments());
    } else {
      await this.router.navigate(['/client/ticket', print.paymentId]);
    }
  }

  // borrar pago de servicio.
  public deletePayment(): any {
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
    this.roleIsAdmin.subscribe(async (result) => {
      if (!result) {
        await Sweetalert2.accessDenied();
      } else {
        Sweetalert2.deleteConfirm().then(result => {
          if (result.isConfirmed) {
            const paymentId: string = chkDel[0].getAttribute('value') || '';
            this.paymentService.deletePayment(paymentId).subscribe(() => {
              this.getPayments();
              Sweetalert2.deleteSuccess();
            });
          }
        });
      }
    });
  }

}
