import {Component, OnInit} from '@angular/core';
import {InstallationOrderDetailService, OrderMaterialService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {OrderMaterial} from '../../interfaces';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
  selector: 'app-installation-detail',
  templateUrl: './installation-detail.component.html',
  styleUrls: ['./installation-detail.component.scss']
})
export class InstallationDetailComponent implements OnInit {
  userModal: any;
  materialModal: any;
  itemMaterialModal: any;
  orderMaterial: OrderMaterial;

  constructor(
    private activatedRoute: ActivatedRoute,
    private installationOrderDetailService: InstallationOrderDetailService,
    private orderMaterialService: OrderMaterialService) {
  }

  ngOnInit(): void {
    // cargar datos orden de instalación.
    this.activatedRoute.paramMap.subscribe(params => {
      this.installationOrderDetailService.getInstallationOrder(params.get('id'));
    });
    // establecer formularios modales.
    this.userModal = new bootstrap.Modal(
      document.querySelector('#add-user-modal'));
    this.materialModal = new bootstrap.Modal(
      document.querySelector('#add-material-modal'));
    this.itemMaterialModal = new bootstrap.Modal(
      document.querySelector('#item-material-modal'));
  }

  // orden de instalación.
  get currentInstallationOrder() {
    return this.installationOrderDetailService.currentInstallationOrder;
  }

  // lista de materiales.
  get orderMaterials() {
    return this.installationOrderDetailService.orderMaterials;
  }

  // plan de servicio.
  get currentServicePlan() {
    return this.installationOrderDetailService.currentServicePlan;
  }

  // cliente actual.
  get currentClient() {
    return this.installationOrderDetailService.currentClient;
  }

  // técnico actual.
  get userTechnical() {
    return this.installationOrderDetailService.userTechnical;
  }

  // Editar item material.
  editItemMaterial(id: string): void {
    this.orderMaterialService.getMaterial(id).subscribe(result => {
      this.orderMaterial = result;
      this.itemMaterialModal.show();
    });
  }

  // Cerrar modal agregar técnico.
  hideUserModal(value: boolean): void {
    if (value === true) {
      this.userModal.hide();
    }
  }

  // Cerrar modal agregar material.
  hideMaterialModal(value: boolean): void {
    if (value === true) {
      this.materialModal.hide();
    }
  }

  // Cerrar modal editar item tabla.
  hideItemMaterialModal(value: boolean): void {
    if (value === true) {
      this.installationOrderDetailService.getOrderMaterials(this.currentInstallationOrder._id);
      this.itemMaterialModal.hide();
    }
  }

  // Comprobar existencia de usuario.
  userNotExist(): boolean {
    return this.currentInstallationOrder.userId === undefined
      || this.currentInstallationOrder.userId === '';
  }

  // Borrar el técnico actual.
  deleteUserTechnical(e): void {
    e.preventDefault();
    delete this.currentInstallationOrder.userId;
  }

}
