import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import * as moment from 'moment';
import {ServiceService} from '../../services';

@Component({
  selector: 'app-receivable',
  templateUrl: './receivable.component.html',
  styleUrls: ['./receivable.component.scss']
})
export class ReceivableComponent implements OnInit {
  serviceList: Array<any>;
  queryInput: FormControl = this.fb.control(moment().format('YYYY-MM-DD'));
  paymentTypeInput: FormControl = this.fb.control('PRE');

  constructor(
    private fb: FormBuilder,
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
