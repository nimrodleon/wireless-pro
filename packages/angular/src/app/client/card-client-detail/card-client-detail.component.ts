import { Component, Input, OnInit } from '@angular/core';
declare var jQuery: any;
import { Client } from '../client.model';

@Component({
  selector: 'app-card-client-detail',
  templateUrl: './card-client-detail.component.html',
  styleUrls: ['./card-client-detail.component.scss']
})
export class CardClientDetailComponent implements OnInit {
  @Input() client: Client;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Abre un modal de edición.
   * @param e Evento del link
   */
  openClientModal(e: any): void {
    e.preventDefault();
    jQuery('#app-client-form-modal').modal('show');
  }

}
