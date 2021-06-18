import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var jQuery: any;
import {Client} from '../../interfaces';

@Component({
  selector: 'app-client-form-modal',
  templateUrl: './client-form-modal.component.html',
  styleUrls: ['./client-form-modal.component.scss']
})
export class ClientFormModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  client: Client;
  @Output()
  updateClientEvent = new EventEmitter<Client>();
  infoAlert: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    // jQuery('#app-client-form-modal').on('show.bs.modal', e => {
    // });
  }

  // Envía los datos de cliente para guardar en la base de datos.
  saveChanges(): void {
    this.updateClientEvent.emit(this.client);
    jQuery('#app-client-form-modal').modal('hide');
  }

  // Archivar Cliente.
  onArchiveClient(): void {
    if (this.client._id === undefined) {
      this.changeInfoAlert();
    } else {
      this.client.is_active = false;
      this.updateClientEvent.emit(this.client);
      jQuery('#app-client-form-modal').modal('hide');
    }
  }

  // Habilitar Cliente.
  onEnableClient(): void {
    this.client.is_active = true;
    this.updateClientEvent.emit(this.client);
    jQuery('#app-client-form-modal').modal('hide');
  }

  //  Cambiar valor del infoAlert.
  changeInfoAlert(): void {
    this.infoAlert = !this.infoAlert;
  }

}
