import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {InstallationOrderService} from '../../services';

interface IQueryForm {
  year: string;
  month: string;
  search: string;
}

@Component({
  selector: 'app-installation-report',
  templateUrl: './installation-report.component.html',
  styleUrls: ['./installation-report.component.scss']
})
export class InstallationReportComponent implements OnInit {
  installationOrders: any[];
  queryData: IQueryForm = {
    year: moment().format('YYYY'),
    month: moment().format('MM'),
    search: ''
  };
  queryForm: FormGroup = this.fb.group({
    year: [moment().format('YYYY')],
    month: [moment().format('MM')],
    search: ['']
  });

  constructor(
    private fb: FormBuilder,
    private installationOrderService: InstallationOrderService) {
  }

  ngOnInit(): void {
    // Subscripción del formulario.
    this.queryForm.valueChanges.subscribe(values => this.queryData = values);
    // Cargar lista ordenes de instalación.
    this.getInstallationOrders();
  }

  // Cargar lista de ordenes de instalación.
  private getInstallationOrders(): void {
    this.installationOrderService.getInstallationOrdersByYearMonth(this.queryData)
      .subscribe(result => this.installationOrders = result);
  }

  // Buscar ordenes de instalación.
  searchSubmit(): void {
    this.getInstallationOrders();
  }

}
