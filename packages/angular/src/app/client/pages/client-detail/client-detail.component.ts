import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var bootstrap: any;
import {ClientDetailService} from '../../services';
import {Client, Service} from '../../interfaces';
import {WorkOrderService} from 'src/app/orders/services';
import {WorkOrder} from 'src/app/orders/interfaces';
import {AuthService} from 'src/app/user/services';
import {Sweetalert2} from 'src/app/global/interfaces';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  serviceModal: any;
  clientModal: any;
  currentService: Service;
  titleService: string;
  titleClient: string;
  installationOrderList: Array<WorkOrder>;
  // ============================================================
  currentRole: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientDetailService: ClientDetailService,
    private installationOrderService: WorkOrderService,
    private authService: AuthService) {
    this.currentService = this.clientDetailService.serviceDefaultValues();
  }

  ngOnInit(): void {
    // Cargar cliente actual.
    this.activatedRoute.paramMap.subscribe(params => {
      this.clientDetailService.getClient(params.get('id'));
      this.clientDetailService.getServiceList(params.get('id'));
      this.installationOrderService.getWorkOrderByClientId(params.get('id'))
        .subscribe(result => this.installationOrderList = result);
    });
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe(result => this.currentRole = result);
    // vincular modal servicio.
    this.serviceModal = new bootstrap.Modal(
      document.querySelector('#service-modal'));
    // vincular modal cliente.
    this.clientModal = new bootstrap.Modal(
      document.querySelector('#client-form-modal'));
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // Cliente actual.
  get currentClient() {
    return this.clientDetailService.currentClient;
  }

  // Lista de servicios.
  get serviceList() {
    return this.clientDetailService.serviceList;
  }

  // Agregar Servicio Modal.
  async addServiceModalClick() {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      await Sweetalert2.accessDeniedGeneric();
    } else {
      this.titleService = 'Agregar Servicio';
      this.currentService = this.clientDetailService.serviceDefaultValues();
      this.currentService.clientId = this.currentClient._id;
      this.serviceModal.show();
    }
  }

  // borrar cliente actual.
  async deleteClientClick() {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      await Sweetalert2.accessDenied();
    } else {
      Sweetalert2.deleteConfirm().then(result => {
        if (result.isConfirmed) {
          this.clientDetailService.deleteClient(this.currentClient._id);
        }
      });
    }
  }

  // editar servicio modal.
  async editServiceModalClick(id: string) {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      await Sweetalert2.accessDeniedGeneric();
    } else {
      this.titleService = 'Editar Servicio';
      this.clientDetailService.getServiceById(id)
        .subscribe(result => {
          this.currentService = result;
          this.serviceModal.show();
        });
    }
  }

  // cerrar venta modal servicios.
  hideServiceModal(value: boolean): void {
    if (value === true) {
      this.clientDetailService.getServiceList(this.currentClient._id);
      this.serviceModal.hide();
    }
  }

  // abrir modal editar cliente.
  editClientModalClick(e: any): void {
    e.preventDefault();
    this.titleClient = 'Editar Cliente';
    this.clientModal.show();
  }

  // actualizar datos del cliente.
  updateClient(client: Client): void {
    this.clientModal.hide();
    this.clientDetailService.updateClient(client);
  }

}
