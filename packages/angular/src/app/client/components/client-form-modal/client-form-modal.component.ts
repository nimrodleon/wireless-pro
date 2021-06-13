import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var jQuery: any;
import {Client} from '../../interfaces';
import {Coverage} from '../../../system/interfaces';
import {CoverageService} from '../../../system/services';

@Component({
  selector: 'app-client-form-modal',
  templateUrl: './client-form-modal.component.html',
  styleUrls: ['./client-form-modal.component.scss']
})
export class ClientFormModalComponent implements OnInit {
  @Input() title: string;
  @Input() client: Client;
  @Output() sendClient = new EventEmitter<Client>();
  @Input() editMode: boolean;
  coverages: Coverage[];

  constructor(private coverageService: CoverageService) {
  }

  ngOnInit(): void {
    jQuery('#app-client-form-modal').on('show.bs.modal', e => {
      this.getCoverages();
    });
  }

  // Optiene la lista áreas de cobertura.
  private getCoverages(): void {
    this.coverageService.getCoverages().subscribe(res => this.coverages = res);
  }

  // Envia los datos de cliente para guardar en la base de datos.
  saveChanges(): void {
    this.sendClient.emit(this.client);
    jQuery('#app-client-form-modal').modal('hide');
  }

  /**
   * Establece el cliente como rural.
   * @param checked type
   */
  onChange(checked: any): void {
    if (checked === true) {
      this.client.type = 'R';
    } else {
      this.client.type = 'U';
    }
  }

  // Archivar Cliente.
  onArchiveClient(): void {
    this.client.is_active = false;
    this.sendClient.emit(this.client);
    jQuery('#app-client-form-modal').modal('hide');
  }

  // Habilitar Cliente.
  onEnableClient(): void {
    this.client.is_active = true;
    this.sendClient.emit(this.client);
    jQuery('#app-client-form-modal').modal('hide');
  }

}
