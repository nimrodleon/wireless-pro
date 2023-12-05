import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientDetailService } from '../../services';
import { Client, Service } from '../../interfaces';
import { WorkOrderService } from 'src/app/orders/services';
import { WorkOrder } from 'src/app/orders/interfaces';
import { AuthService } from 'src/app/user/services';
import { Sweetalert2 } from 'src/app/global/interfaces';

declare const bootstrap: any;

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit {
  serviceModal: any;
  clientModal: any;
  currentService: Service;
  titleService: string = '';
  titleClient: string = '';
  installationOrderList: Array<WorkOrder> = new Array<WorkOrder>();
  // ============================================================
  currentRole: string = '';

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
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
    // vincular modal servicio.
    this.serviceModal = new bootstrap.Modal('#service-modal');
    // vincular modal cliente.
    this.clientModal = new bootstrap.Modal('#client-form-modal');
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
  public async addServiceModalClick() {
    if (this.currentRole !== this.roles.redes) {
      await Sweetalert2.accessDeniedGeneric();
    } else {
      this.titleService = 'Agregar Servicio';
      this.currentService = this.clientDetailService.serviceDefaultValues();
      this.currentService.clientId = this.currentClient._id;
      this.serviceModal.show();
    }
  }

  // borrar cliente actual.
  public async deleteClientClick() {
    if (this.currentRole !== this.roles.admin) {
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
  public async editServiceModalClick(id: string) {
    if (this.currentRole !== this.roles.redes) {
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
  public hideServiceModal(value: boolean): void {
    if (value) {
      this.clientDetailService.getServiceList(this.currentClient._id);
      this.serviceModal.hide();
    }
  }

  // abrir modal editar cliente.
  public editClientModalClick(e: any): void {
    e.preventDefault();
    this.titleClient = 'Editar Cliente';
    this.clientModal.show();
  }

  // actualizar datos del cliente.
  public updateClient(client: Client): void {
    this.clientModal.hide();
    this.clientDetailService.updateClient(client);
  }

}
