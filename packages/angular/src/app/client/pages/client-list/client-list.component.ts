import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import {Router} from '@angular/router';
import {Client} from '../../interfaces/client';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: any[];
  currentClient: Client = new Client();
  titleModal: string = '';
  editMode: boolean = false;
  // Campos del Buscador.
  status: boolean = true;
  query: any = {search: '', page: 0};

  constructor(private clientService: ClientService, private router: Router) {
  }

  ngOnInit(): void {
    this.getClients(this.query);
  }

  // Se Ejecuta desde el Buscador.
  onSearch(): void {
    this.query.page = 0;
    this.getClients(this.query);
  }

  // Actualiza el Valor de Status.
  onChangeStatus(checked: boolean) {
    this.status = checked;
  }

  // Obtiene la Lista de Clientes.
  private getClients(query: any): void {
    this.clientService.getClients(query, this.status)
      .subscribe(res => {
        console.log(res);
        this.clients = res;
        this.query.nPages = res.nPages;
        this.query.page = res.page;
        console.log(this.query);
      });
  }

  showModal(): void {
    this.editMode = false;
    this.titleModal = 'Agregar Cliente';
    this.currentClient = new Client();
    jQuery('#app-client-form-modal').modal('show');
  }

  // Guarda los datos del Cliente.
  saveChanges(client: Client): void {
    if (client._id === undefined) {
      this.clientService.create(client).subscribe(client => {
        this.router.navigate(['/client/detail', client._id]);
      });
    } else {
      this.clientService.update(client).subscribe(res => {
        this.getClients(this.query);
      });
    }
  }

}
