import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var jQuery: any;
declare var bootstrap: any;
import {environment} from '../../../../environments/environment';
import {InstallationOrderService} from '../../services';
import {ServicePlan} from '../../../system/interfaces';
import {Order} from '../../interfaces';

@Component({
  selector: 'app-installation-form',
  templateUrl: './installation-form.component.html',
  styleUrls: ['./installation-form.component.scss']
})
export class InstallationFormComponent implements OnInit {
  private baseURL: string = environment.baseUrl;
  installationOrder: Order;
  installationOrderForm: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    region: ['', [Validators.required]],
    typeInstallation: ['', [Validators.required]],
    servicePlanId: ['', [Validators.required]],
    costInstallation: [0, [Validators.required]],
    amount: [0, [Validators.required]],
  });
  servicePlanList: ServicePlan[];
  selectClientModal: any;

  constructor(
    private fb: FormBuilder,
    private installationOrderService: InstallationOrderService) {
    this.installationOrder = this.installationOrderService.orderDefaultValues();
  }

  ngOnInit(): void {
    // Select2 buscador de clientes.
    jQuery('#searchClient').select2({
      theme: 'bootstrap4',
      placeholder: 'BUSCAR CLIENTE',
      dropdownParent: jQuery('#selectClientModal'),
      ajax: {
        url: this.baseURL + 'clients/select2/s',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    });
    // Lista de planes de servicio.
    this.installationOrderService.getServicePlans()
      .subscribe(result => {
        this.servicePlanList = result;
      });
    // Modal buscar clientes.
    this.selectClientModal = new bootstrap.Modal(
      document.querySelector('#selectClientModal'));
  }

  // Seleccionar cliente.
  selectClientClick(): void {
    this.installationOrder.clientId = jQuery('#searchClient').val();
    if (this.installationOrder.clientId !== '') {
      this.selectClientModal.hide();
    }
  }

}
