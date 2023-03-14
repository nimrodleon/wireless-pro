import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import * as moment from 'moment';
import {PaymentService} from '../../services';

@Component({
  selector: 'app-payment-daily',
  templateUrl: './payment-daily.component.html'
})
export class PaymentDailyComponent implements OnInit {
  paymentList: Array<any> = new Array<any>();
  queryInput: FormControl = this.fb.control(moment().format('YYYY-MM-DD'));
  paymentMethodInput: FormControl = this.fb.control('CAJA');

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.generarReporteClick();
  }

  // cargar reporte de pagos diario.
  generarReporteClick(): void {
    this.paymentService.reportePagosDiario(this.queryInput.value, this.paymentMethodInput.value)
      .subscribe(result => this.paymentList = result);
  }

}
