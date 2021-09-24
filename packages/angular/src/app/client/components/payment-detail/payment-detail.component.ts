import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';

declare var bootstrap: any;
import {Sweetalert2} from 'src/app/global/interfaces';
import {PrintPayment, Service} from '../../interfaces';
import {ServiceDetailService, ServiceService} from '../../services';
import {AuthService} from 'src/app/user/services';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  @Input()
  currentService: Service;
  paymentYearInput: FormControl = this.fb.control(moment().format('YYYY'));
  paymentModal: any;
  titlePayment: string = '';
  currentRole: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private serviceService: ServiceService,
    private serviceDetailService: ServiceDetailService,) {
    this.currentService = this.serviceService.defaultValues();
  }

  ngOnInit(): void {
    // vincular modal pagos.
    this.paymentModal = new bootstrap.Modal(document.querySelector('#payment-modal'));
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // plan de servicio actual.
  get currentServicePlan() {
    return this.serviceDetailService.currentServicePlan;
  }

  // // lista de averias.
  // get paymentList() {
  //   return this.serviceDetailService.paymentList;
  // }
  //
  // // cargar lista de pagos.
  // getPaymentList(): void {
  //   this.serviceDetailService.getPaymentList(this.currentService._id, this.paymentYearInput.value);
  // }

  // obtener nombre del mes.
  // @ts-ignore
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
  // hidePaymentModal(print: PrintPayment): void {
  //   if (print.hideModal) {
  //     this.paymentModal.hide();
  //   }
  //   if (!print.printReceipt) {
  //     this.serviceDetailService.getCurrentService(this.currentService._id)
  //       .subscribe(() => this.getPaymentList());
  //   } else {
  //     this.router.navigate(['/client/ticket', print.paymentId])
  //       .then(() => console.info('Imprimir Ticket'));
  //   }
  // }

  // borrar pago de servicio.
  // @ts-ignore
  // async deletePayment() {
  //   let chkDel = document.querySelectorAll('#chkDel:checked');
  //   if (chkDel.length <= 0) {
  //     return Swal.fire({
  //       icon: 'error',
  //       title: 'Seleccione un Pago!',
  //       showConfirmButton: true,
  //     });
  //   }
  //   if (chkDel.length > 1) {
  //     return Swal.fire({
  //       icon: 'info',
  //       title: 'Seleccione solo un Pago!',
  //       showConfirmButton: true,
  //     });
  //   }
  //   if (this.currentRole !== this.roles.ROLE_ADMIN) {
  //     await Sweetalert2.accessDenied();
  //   } else {
  //     Sweetalert2.deleteConfirm().then(result => {
  //       if (result.isConfirmed) {
  //         let paymentId = chkDel[0].getAttribute('value');
  //         this.serviceDetailService.deletePayment(paymentId)
  //           .subscribe(() => {
  //             this.getPaymentList();
  //             Sweetalert2.deleteSuccess();
  //           });
  //       }
  //     });
  //   }
  // }

}
