import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var bootstrap: any;
import {WorkOrderDetailService, OrderMaterialService} from '../../services';
import {OrderMaterial} from '../../interfaces';
import {Service} from 'src/app/client/interfaces';
import {ServiceService} from 'src/app/client/services';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {
  userModal: any;
  materialModal: any;
  itemMaterialModal: any;
  orderMaterial: OrderMaterial;
  // ============================================================
  titleService: string;
  currentService: Service;
  serviceModal: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workOrderDetailService: WorkOrderDetailService,
    private orderMaterialService: OrderMaterialService,
    private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    // cargar datos orden de instalación.
    this.activatedRoute.paramMap.subscribe(params => {
      this.workOrderDetailService.getWorkOrder(params.get('id'));
    });
    // establecer formularios modales.
    this.userModal = new bootstrap.Modal(
      document.querySelector('#add-user-modal'));
    this.materialModal = new bootstrap.Modal(
      document.querySelector('#add-material-modal'));
    this.itemMaterialModal = new bootstrap.Modal(
      document.querySelector('#item-material-modal'));
    this.serviceModal = new bootstrap.Modal(
      document.querySelector('#service-modal'));
  }

  // orden de instalación.
  get currentWorkOrder() {
    return this.workOrderDetailService.currentWorkOrder;
  }

  // lista de materiales.
  get orderMaterials() {
    return this.workOrderDetailService.orderMaterials;
  }

  // plan de servicio.
  get currentServicePlan() {
    return this.workOrderDetailService.currentServicePlan;
  }

  // cliente actual.
  get currentClient() {
    return this.workOrderDetailService.currentClient;
  }

  // técnico actual.
  get userTechnical() {
    return this.workOrderDetailService.userTechnical;
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
      this.changeStatusWorkOrder('EN PROCESO');
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
      this.workOrderDetailService.getOrderMaterials(this.currentWorkOrder._id);
      this.itemMaterialModal.hide();
    }
  }

  // Comprobar existencia de usuario.
  userNotExist(): boolean {
    return this.currentWorkOrder.userId === undefined
      || this.currentWorkOrder.userId === '';
  }

  // Borrar el técnico actual.
  deleteUserTechnical(e): void {
    e.preventDefault();
    delete this.currentWorkOrder.userId;
  }

  // cambiar estado de la orden de trabajo.
  changeStatusWorkOrder(status: string): void {
    let _orderInstallation = this.currentWorkOrder;
    _orderInstallation.statusOrder = status;
    this.workOrderDetailService.currentWorkOrder = _orderInstallation;
    // actualizar orden de instalación.
    this.workOrderDetailService.updateWorkOrder();
  }

  // Habilitar orden de trabajo.
  enableWorkOrder(): void {
    this.changeStatusWorkOrder('EN PROCESO');
  }

  // Finalizar orden de trabajo.
  finishWorkOrder(): void {
    this.changeStatusWorkOrder('FINALIZADO');
  }

  // agregar servicio.
  addServiceClick(event: any): void {
    event.preventDefault();
    this.titleService = 'Agregar Servicio';
    this.currentService = this.serviceService.defaultValues();
    this.currentService.clientId = this.currentClient._id;
    this.currentService.address = this.currentWorkOrder.address;
    this.currentService.city = this.currentWorkOrder.city;
    this.currentService.region = this.currentWorkOrder.region;
    this.serviceModal.show();
  }

  // cerrar modal servicio.
  hideServiceModal(value: boolean): void {
    if (value === true) {
      this.serviceModal.hide();
      this.router.navigate(['/client/detail',
        this.currentClient._id]).then(() => {
        console.info('Service added!');
      });
    }
  }

}
