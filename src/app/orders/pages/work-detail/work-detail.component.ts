import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {WorkOrderDetailService, OrderMaterialService} from "../../services";
import {OrderMaterial} from "../../interfaces";

declare const bootstrap: any;

@Component({
  selector: "app-work-detail",
  templateUrl: "./work-detail.component.html"
})
export class WorkDetailComponent implements OnInit {
  userModal: any;
  materialModal: any;
  itemMaterialModal: any;
  orderMaterial: OrderMaterial;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workOrderDetailService: WorkOrderDetailService,
    private orderMaterialService: OrderMaterialService) {
    this.orderMaterial = this.orderMaterialService.defaultValues();
  }

  ngOnInit(): void {
    // cargar datos orden de instalación.
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.workOrderDetailService.getWorkOrder(params.get("id"));
      });
    // establecer formularios modales.
    this.userModal = new bootstrap.Modal("#add-user-modal");
    this.materialModal = new bootstrap.Modal("#add-material-modal");
    this.itemMaterialModal = new bootstrap.Modal("#item-material-modal");
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
      this.changeStatusWorkOrder("EN PROCESO");
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
      || this.currentWorkOrder.userId === "";
  }

  // Borrar el técnico actual.
  deleteUserTechnical(e: any): void {
    e.preventDefault();
    // @ts-ignore
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
    this.changeStatusWorkOrder("EN PROCESO");
  }

  // Finalizar orden de trabajo.
  finishWorkOrder(): void {
    this.changeStatusWorkOrder("FINALIZADO");
  }

}
