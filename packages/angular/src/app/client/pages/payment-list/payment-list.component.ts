import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var jQuery: any;
import _ from 'lodash';
import {AuthService} from 'src/app/user/services/auth.service';
import Swal from 'sweetalert2';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  // TODO: refactorizar esta linea de código.
  isAdmin: boolean = true;
  paymentList: any[];
  clientId: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.clientId = params.get('id');
      this.getPaymentList(this.clientId);
    });
  }

  // Obtiene la Lista de Pagos.
  private getPaymentList(id: string): void {
    this.paymentService.getPaymentList(id).subscribe(res => this.paymentList = res);
  }

  // Imprime el pago Seleccionado.
  printPayment(): void {
    const chks = jQuery('input:checkbox:checked');
    if (chks.length !== 1) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Seleccione un Historial de Pago!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.router.navigate(['/client/ticket', chks[0].value]);
    }
  }

  // Borra el Pago Seleccionado.
  deletePayment(): void {
    const chks = jQuery('input:checkbox:checked');
    if (chks.length <= 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Seleccione un Historial de Pago!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        title: `¿Estás seguro de borrar?`,
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          _.forEach(chks, (val) => {
            this.paymentService.delete(val.value).subscribe(res => {
            });
          });
          this.getPaymentList(this.clientId);
          Swal.fire(
            'Eliminado!',
            'Los registros an sido eliminado.',
            'success'
          );
        }
      });
    }
  }

}
