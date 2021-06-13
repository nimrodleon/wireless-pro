import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var jQuery: any;
import _ from 'lodash';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {Client, Payment} from '../../interfaces';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  client: Client;
  @Input()
  serviceList: any[];
  @Input()
  payment: Payment;
  @Input()
  currentService: any;
  @Output()
  sendPayment = new EventEmitter<Payment>();
  @Output()
  sendPrintReceipt = new EventEmitter<boolean>();
  // @Output()
  // sendServiceId = new EventEmitter<string>();
  // Local variables.
  printReceipt: boolean = false;
  // enableService: boolean = false;

  // Class constructor.
  constructor() {
  }

  ngOnInit(): void {
    jQuery('#app-payment-modal').on('shown.bs.modal', () => {
      this.printReceipt = false;
      console.log(this.currentService);
      this.changeAmount();
    });
  }

  // onchange for print receipt.
  onChange(checked: boolean): void {
    this.printReceipt = checked;
  }

  // onChange for Service.
  onChangeService(target: any): void {
    this.currentService = _.find(this.serviceList, {_id: target.value});
    console.log(this.currentService);
    this.changeAmount();
  }

  // change enable service var.
  // onChangeEnableService(checked: boolean): void {
  //   this.enableService = checked;
  // }

  // change amount value.
  changeAmount(): void {
    this.payment.amount = this.currentService.servicePlan.priceMonthly;
  }

  // Save change payment.
  saveChanges(): void {
    if (this.payment.amount === undefined
      || this.payment.amount <= 0) {
      Swal.fire(
        'Error?',
        'El monto debe ser mayor que cero?',
        'error'
      );
    } else {
      this.payment.client = this.client._id;
      this.payment.service = jQuery('#payment-service').val();
      this.payment.month = jQuery('#payment-month').val();
      this.payment.payment_method = jQuery('#payment-payment_method').val();
      this.payment.created_date = moment().format('YYYY-MM-DD');
      if (!this.editPayDate) {
        const service = _.find(this.serviceList, (o) => {
          return o._id == this.payment.service;
        });
        const day = moment(service.dateFrom).date();
        const month = parseInt(this.payment.month, 10) - 1;
        this.payment.payFrom = moment([this.payment.year, month, day]).format('YYYY-MM-DD');
        this.payment.payUp = moment([this.payment.year, month, day]).add(1, 'M').format('YYYY-MM-DD');
      }
      this.sendPayment.emit(this.payment);
      // if (this.enableService) {
      //   this.sendServiceId.emit(this.payment.service);
      // }
      this.sendPrintReceipt.emit(this.printReceipt);
      jQuery('#app-payment-modal').modal('hide');
    }
  }

  // enable date editing.
  editPayDate: boolean;

  editPaymentDate(checked: boolean): void {
    this.editPayDate = checked;
  }

  // seeMore(e): void {
  //   e.preventDefault();
  //   Swal.fire({
  //     title: `<strong>${this.currentService.servicePlan.name}</strong>`,
  //     html:
  //       'You can use <b>bold text</b>, ' +
  //       '<a href="//sweetalert2.github.io">links</a> ' +
  //       'and other HTML tags',
  //     showCloseButton: true,
  //   });
  // }

}
