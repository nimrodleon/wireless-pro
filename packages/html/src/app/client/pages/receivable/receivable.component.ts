import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import * as moment from 'moment';
import {ServiceService} from '../../services';

@Component({
  selector: 'app-receivable',
  templateUrl: './receivable.component.html'
})
export class ReceivableComponent implements OnInit {
  serviceList: Array<any> = new Array<any>();
  queryInput: UntypedFormControl = this.fb.control(moment().format('YYYY-MM-DD'));
  paymentTypeInput: UntypedFormControl = this.fb.control('PRE');

  constructor(
    private fb: UntypedFormBuilder,
    private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.cargarReporteClick();
  }

  // generar reporte clientes por cobrar.
  cargarReporteClick(): void {
    this.serviceService.reporteClientesPorCobrar(this.queryInput.value, this.paymentTypeInput.value)
      .subscribe(result => this.serviceList = result);
  }

}
