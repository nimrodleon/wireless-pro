import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var bootstrap: any;
import {environment} from 'src/environments/environment';
import {WorkOrderService} from '../../services';
import {ServicePlan} from 'src/app/system/interfaces';
import {Client} from 'src/app/client/interfaces';
import {WorkOrder} from '../../interfaces';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit {
  private baseURL: string = environment.baseUrl;
  workOrder: WorkOrder;
  workOrderForm: FormGroup = this.fb.group({
    _id: [null],
    clientId: [''],
    description: [''],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    region: ['', [Validators.required]],
    typeTask: ['', [Validators.required]],
    servicePlanId: ['', [Validators.required]],
    total: [0, [Validators.required, Validators.min(0)]],
    amount: [0, [Validators.required, Validators.min(0)]],
    statusOrder: ['PENDIENTE']
  });
  servicePlanList: Array<ServicePlan> = new Array<ServicePlan>();
  currentClientSelected: Client;
  selectClientModal: any;
  addClientModal: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workOrderService: WorkOrderService) {
    // Cargar valores por defecto.
    this.workOrder = this.workOrderService.defaultValues();
    this.currentClientSelected = this.workOrderService.clientDefaultValues();
  }

  ngOnInit(): void {
    // cargar datos orden de instalación modo edición.
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.workOrderService.getWorkOrderById(params.get('id'))
          .subscribe(result => {
            this.workOrderForm.reset({...result});
            this.workOrderService.getClientById(result.clientId)
              .subscribe(result => this.currentClientSelected = result);
          });
      }
    });
    // Select2 buscador de clientes.
    jQuery('#searchClient').select2({
      theme: 'bootstrap-5',
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
    this.workOrderForm.valueChanges
      .subscribe(values => this.workOrder = values);
    // Lista de planes de servicio.
    this.workOrderService.getServicePlans()
      .subscribe(result => {
        this.servicePlanList = result;
      });
    // Modal buscar clientes.
    this.selectClientModal = new bootstrap.Modal(
      document.querySelector('#selectClientModal'));
    // Modal agregar cliente.
    this.addClientModal = new bootstrap.Modal(
      document.querySelector('#client-form-modal'));
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.workOrderForm.controls[field].errors
      && this.workOrderForm.controls[field].touched;
  }

  // Seleccionar cliente.
  selectClientClick(): void {
    this.workOrder.clientId = jQuery('#searchClient').val();
    if (this.workOrder.clientId !== '') {
      // Cargar cliente seleccionado.
      this.workOrderService.getClientById(this.workOrder.clientId)
        .subscribe(result => {
          this.currentClientSelected = result;
          // Cargar dirección del cliente al formulario.
          // @ts-ignore
          delete this.workOrder.address;
          this.workOrderForm.reset(/* @ts-ignore */{
            address: this.currentClientSelected.fullAddress,
            ...this.workOrder,
          });
        });
      // Cerrar modal buscar cliente.
      this.selectClientModal.hide();
    }
  }

  // botón agregar cliente.
  addClientClick(): void {
    this.currentClientSelected = this.workOrderService.clientDefaultValues();
    this.addClientModal.show();
  }

  // Guardar Clientes.
  createClient(data: Client): void {
    delete data._id;
    this.workOrderService.addClient(data)
      .subscribe(result => {
        // actualizar cliente seleccionado.
        this.currentClientSelected = result;
        this.workOrder.clientId = this.currentClientSelected._id;
        // Cargar dirección del cliente al formulario.
        // @ts-ignore
        delete this.workOrder.address;
        this.workOrderForm.reset(/* @ts-ignore */{
          address: this.currentClientSelected.fullAddress,
          ...this.workOrder,
        });
        // Cerrar modal agregar cliente.
        this.addClientModal.hide();
      });
  }

  // Guardar orden de instalación.
  saveChanges(): void {
    // validar cliente seleccionado.
    if (this.workOrder.clientId === '') {
      Swal.fire('Seleccionar un Cliente!');
    } else {
      // cuando existe un cliente seleccionado.
      if (this.workOrderForm.invalid) {
        this.workOrderForm.markAllAsTouched();
        return;
      }
      // Guardar datos, sólo si es válido el formulario.
      if (this.workOrder._id === null) {
        // @ts-ignore
        delete this.workOrder._id;
        this.workOrderService.addOrder(this.workOrder)
          .subscribe(result => {
            this.router.navigate(['/work_orders/ticket', result._id])
              .then(() => console.info('Imprimir Ticket!!'));
          });
      } else {
        this.workOrderService.updateOrder(this.workOrder).subscribe(result => {
          this.router.navigate(['/work_orders/detail', result._id])
            .then(() => console.info('Orden de Instalación actualizada!'));
        });
      }
    }
  }

}
