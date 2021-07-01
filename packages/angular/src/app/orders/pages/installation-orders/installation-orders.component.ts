import {Component, OnInit} from '@angular/core';
import {InstallationOrderService} from '../../services';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-installation-orders',
  templateUrl: './installation-orders.component.html',
  styleUrls: ['./installation-orders.component.scss']
})
export class InstallationOrdersComponent implements OnInit {
  installationOrders: any[];
  query: FormControl = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    private installationOrderService: InstallationOrderService) {
  }

  ngOnInit(): void {
    // Cargar ordenes de instalación.
    this.getInstallationOrders(this.query.value);
  }

  // Cargar lista de ordenes de instalación.
  private getInstallationOrders(query: string): void {
    this.installationOrderService.getInstallationOrders(query)
      .subscribe(result => this.installationOrders = result);
  }

  // Buscar ordenes de instalación.
  installationOrdersLoad(e: any): void {
    e.preventDefault();
    this.getInstallationOrders(this.query.value);
  }

}
