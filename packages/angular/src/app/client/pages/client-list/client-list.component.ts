import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

declare var bootstrap: any;
import {Client} from '../../interfaces';
import {ClientService} from '../../services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clientList: Array<Client>;
  currentClient: Client;
  titleModal: string = '';
  queryInput: FormControl = this.fb.control('');
  clientModal: any;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router) {
    this.currentClient = this.clientService.defaultValues();
  }

  ngOnInit(): void {
    this.getClientList(this.queryInput.value);
    // vincular modal cliente.
    this.clientModal = new bootstrap.Modal(
      document.querySelector('#client-form-modal'));
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
      delete client._id;
      this.clientService.createClient(client)
        .subscribe(result => {
          this.clientModal.hide();
          this.router.navigate(['/client/detail', result._id])
            .then(() => console.info('Cliente Guardado!'));
        });
    }
  }

  // exportar datos.
  async exportDataClick() {
    const {value: option} = await Swal.fire({
      title: 'EXPORTAR DATOS',
      input: 'select',
      inputOptions: {
        'E01': 'LISTADO DE CLIENTES',
        'E02': 'SERVICIOS POR ESTADO',
        'E03': 'SERVICIOS SIN REGISTRO DE PAGO',
      },
      inputPlaceholder: 'Seleccione una opción',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
      // inputValidator: (value) => {
      //   return new Promise((resolve) => {
      //     if (value === 'oranges') {
      //       resolve()
      //     } else {
      //       resolve('You need to select oranges :)')
      //     }
      //   })
      // }
    });

    if (option) {
      Swal.fire(`You selected: ${option}`);
    }
  }

}
