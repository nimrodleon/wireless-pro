import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import {Router} from '@angular/router';
import {Client} from '../../interfaces';
import {ClientService} from '../../services';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: any[];
  currentClient: Client;
  titleModal: string = '';
  // Campos del Buscador.
  status: boolean = true;
  search: string = '';

  constructor(
    private clientService: ClientService,
    private router: Router) {
    this.currentClientDefaultValues();
  }

  ngOnInit(): void {
    this.getClients(this.search);
  }

  // Se Ejecuta desde el Buscador.
  onSearch(): void {
    this.getClients(this.search);
  }

  // Actualiza el Valor de Status.
  onChangeStatus(checked: boolean) {
    this.status = checked;
  }

  // Obtiene la Lista de Clientes.
  private getClients(query: any): void {
    this.clientService.getClients(query, this.status)
      .subscribe(res => {
        this.clients = res;
      });
  }

  // valor por defecto cliente.
  private currentClientDefaultValues(): void {
    this.currentClient = this.clientService.defaultValues();
  }

  showModal(): void {
    this.titleModal = 'Agregar Cliente';
    this.currentClientDefaultValues();
    jQuery('#app-client-form-modal').modal('show');
  }

  // Guarda los datos del Cliente.
  saveChanges(client: Client): void {
    if (client._id === undefined) {
      this.clientService.create(client).subscribe(client => {
        this.router.navigate(['/client/detail', client._id]);
      });
    }
  }

}
