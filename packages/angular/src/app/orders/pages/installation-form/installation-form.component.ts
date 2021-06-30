import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var bootstrap: any;
import {environment} from '../../../../environments/environment';
import {InstallationOrderService} from '../../services';
import {ServicePlan} from '../../../system/interfaces';
import {Client} from '../../../client/interfaces';
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
    _id: [null],
    clientId: [''],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    region: ['', [Validators.required]],
    typeInstallation: ['', [Validators.required]],
    servicePlanId: ['', [Validators.required]],
    costInstallation: [0, [Validators.required, Validators.min(1)]],
    amount: [0, [Validators.required, Validators.min(1)]],
  });
  servicePlanList: ServicePlan[];
  currentClientSelected: Client;
  selectClientModal: any;
  addClientModal: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private installationOrderService: InstallationOrderService) {
    // Cargar valores por defecto.
    this.installationOrder = this.installationOrderService.orderDefaultValues();
    this.currentClientSelected = this.installationOrderService.clientDefaultValues();
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
    // Suscripción al formulario.
    this.installationOrderForm.valueChanges
      .subscribe(values => this.installationOrder = values);
    // Lista de planes de servicio.
    this.installationOrderService.getServicePlans()
      .subscribe(result => {
        this.servicePlanList = result;
      });
    // Modal buscar clientes.
    this.selectClientModal = new bootstrap.Modal(
      document.querySelector('#selectClientModal'));
    // Modal agregar cliente.
    this.addClientModal = new bootstrap.Modal(
      document.querySelector('#app-client-form-modal'));
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.installationOrderForm.controls[field].errors
      && this.installationOrderForm.controls[field].touched;
  }

  // Seleccionar cliente.
  selectClientClick(): void {
    this.installationOrder.clientId = jQuery('#searchClient').val();
    if (this.installationOrder.clientId !== '') {
      // Cargar cliente seleccionado.
      this.installationOrderService.getClientById(this.installationOrder.clientId)
        .subscribe(result => {
          this.currentClientSelected = result;
          // Cargar dirección del cliente al formulario.
          delete this.installationOrder.address;
          this.installationOrderForm.reset({
            address: this.currentClientSelected.fullAddress,
            ...this.installationOrder,
          });
        });
      // Cerrar modal buscar cliente.
      this.selectClientModal.hide();
    }
  }

  // botón agregar cliente.
  addClientClick(): void {
    this.currentClientSelected = this.installationOrderService.clientDefaultValues();
    this.addClientModal.show();
  }

  // Guardar Clientes.
  createClient(data: Client): void {
    delete data._id;
    this.installationOrderService.addClient(data)
      .subscribe(result => {
        // actualizar cliente seleccionado.
        this.currentClientSelected = result;
        this.installationOrder.clientId = this.currentClientSelected._id;
        // Cargar dirección del cliente al formulario.
        delete this.installationOrder.address;
        this.installationOrderForm.reset({
          address: this.currentClientSelected.fullAddress,
          ...this.installationOrder,
        });
        // Cerrar modal agregar cliente.
        this.addClientModal.hide();
      });
  }

  // Guardar orden de instalación.
  saveChanges(): void {
    // validar cliente seleccionado.
    if (this.installationOrder.clientId === '') {
      Swal.fire('Seleccionar un Cliente!');
    } else {
      // cuando existe un cliente seleccionado.
      if (this.installationOrderForm.invalid) {
        this.installationOrderForm.markAllAsTouched();
        return;
      }
      // Guardar datos, sólo si es válido el formulario.
      console.log(this.installationOrderForm.value);
      if (this.installationOrder._id === null) {
        delete this.installationOrder._id;
        this.installationOrderService.addOrder(this.installationOrder)
          .subscribe(result => {
            this.router.navigate(['/installation_orders/ticket', result._id])
              .then(() => console.info('Imprimir Ticket!!'));
          });
      } else {
        console.log('Actualizar orden de instalación...');
      }
    }
  }

}
