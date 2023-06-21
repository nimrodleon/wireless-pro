import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Client } from '../../interfaces';
import { ClientService, ServiceService } from '../../services';

declare const bootstrap: any;

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  clientList: Array<Client> = new Array<Client>();
  currentClient: Client;
  titleModal: string = '';
  queryInput: UntypedFormControl = this.fb.control('');
  clientModal: any;
  temporalServicesModal: any;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private clientService: ClientService,
    private serviceService: ServiceService) {
    this.currentClient = this.clientService.defaultValues();
  }

  ngOnInit(): void {
    this.getClientList(this.queryInput.value);
    // vincular modal cliente.
    this.clientModal = new bootstrap.Modal('#client-form-modal');
    // vincular modal servicios temporales.
    this.temporalServicesModal = new bootstrap.Modal('#temporal-services');
  }

  // Se Ejecuta desde el Buscador.
  searchClient(): void {
    this.getClientList(this.queryInput.value);
  }

  // Obtiene la Lista de Clientes.
  private getClientList(query: string): void {
    this.clientService.getClientList(query)
      .subscribe(res => {
        this.clientList = res;
      });
  }

  // Agregar cliente.
  addClientModal(event: any): void {
    event.preventDefault();
    this.titleModal = 'Agregar Cliente';
    this.currentClient = this.clientService.defaultValues();
    this.clientModal.show();
  }

  // Guarda los datos del Cliente.
  saveChanges(client: Client): void {
    if (client._id === null) {
      // @ts-ignore
      delete client._id;
      this.clientService.createClient(client)
        .subscribe(result => {
          this.clientModal.hide();
          this.router.navigate(['/client/detail', result._id])
            .then(() => console.info('Cliente Guardado!'));
        });
    }
  }

  // cargar servicios temporales.
  temporalServicesClick(event: any): void {
    event.preventDefault();
    this.temporalServicesModal.show();
  }

  // cerrar servicios temporales.
  hideTemporalService(value: boolean): void {
    if (value === true) {
      this.temporalServicesModal.hide();
    }
  }

  // exportar datos.
  async exportDataClick() {
    const { value: option } = await Swal.fire({
      title: 'EXPORTAR DATOS',
      input: 'select',
      inputOptions: {
        // 'E01': 'LISTADO DE CLIENTES',
        // 'E02': 'SERVICIOS POR ESTADO',
        'E03': 'SERVICIOS SIN REGISTRO DE PAGO',
      },
      inputPlaceholder: 'Seleccione una opción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    // Lista de clientes.
    // if (option && option === 'E01') {
    //   this.clientService.reporteListaDeClientes().subscribe(result => {
    //     let downloadURL = window.URL.createObjectURL(result);
    //     let link = document.createElement('a');
    //     link.href = downloadURL;
    //     link.download = 'lista-de-clientes.xlsx';
    //     link.click();
    //   });
    // }
    // Lista de servicios por estado.
    // if (option && option === 'E02') {
    //   this.serviceService.reporteServiciosPorEstado().subscribe(result => {
    //     let downloadURL = window.URL.createObjectURL(result);
    //     let link = document.createElement('a');
    //     link.href = downloadURL;
    //     link.download = 'servicios-por-estado.xlsx';
    //     link.click();
    //   });
    // }
    // Lista de servicios sin registro de pago.
    if (option && option === 'E03') {
      this.serviceService.reporteServicioSinRegistroDePago().subscribe(result => {
        let downloadURL = window.URL.createObjectURL(result);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'servicios-sin-registro-de-pago.xlsx';
        link.click();
      });
    }
  }

}
