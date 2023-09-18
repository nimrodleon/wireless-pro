import {Injectable} from '@angular/core';
import {WorkOrderService} from './work-order.service';
import {OrderMaterialService} from './order-material.service';
import {WorkOrder, OrderMaterial} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {Client} from '../../client/interfaces';
import {User} from '../../user/interfaces';
import {UserService} from '../../user/services';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderDetailService {
  private _currentWorkOrder: WorkOrder;
  private _orderMaterials: Array<OrderMaterial> = new Array<OrderMaterial>();
  private _currentServicePlan: ServicePlan;
  private _currentClient: Client;
  private _userTechnical: User;

  constructor(
    private workOrderService: WorkOrderService,
    private orderMaterialService: OrderMaterialService,
    private userService: UserService) {
    this._currentWorkOrder = this.workOrderService.defaultValues();
    this._currentServicePlan = this.workOrderService.servicePlanDefaultValues();
    this._currentClient = this.workOrderService.clientDefaultValues();
    this._userTechnical = this.userService.defaultValues();
  }

  // retornar cliente actual.
  get currentClient(): Client {
    return this._currentClient;
  }

  // retornar orden de instalación actual.
  get currentWorkOrder(): WorkOrder {
    return this._currentWorkOrder;
  }

  // Cambiar valor de la orden de instalación.
  set currentWorkOrder(data: WorkOrder) {
    this._currentWorkOrder = data;
  }

  // retornar materiales de ordenes de instalación.
  get orderMaterials(): Array<OrderMaterial> {
    return this._orderMaterials;
  }

  // retornar plan de servicio.
  get currentServicePlan(): ServicePlan {
    return this._currentServicePlan;
  }

  // retornar técnico.
  get userTechnical(): User {
    return this._userTechnical;
  }

  // Cargar datos del técnico.
  setUserTechnical(user: User): void {
    this._userTechnical = user;
    this._currentWorkOrder.userId = user._id;
  }

  // Agregar material a la lista.
  addOrderMaterial(data: OrderMaterial): void {
    this._orderMaterials.push(data);
  }

  // cargar orden de trabajo.
  getWorkOrder(id: string | any): void {
    this.workOrderService.getWorkOrderById(id)
      .subscribe(result => {
        this._currentWorkOrder = result;
        this.workOrderService.getClientById(result.clientId)
          .subscribe(result => this._currentClient = result);
        this.workOrderService.getServicePlanById(result.servicePlanId)
          .subscribe(result => this._currentServicePlan = result);
        this.workOrderService.getUserById(result.userId)
          .subscribe(result => this._userTechnical = result);
      });
    // cargar lista de materiales.
    this.getOrderMaterials(id);
  }

  // cargar lista de materiales.
  getOrderMaterials(id: string): void {
    this.orderMaterialService.getMaterials(id)
      .subscribe(result => this._orderMaterials = result);
  }

  // actualizar orden de trabajo.
  updateWorkOrder(): void {
    this.workOrderService.updateOrder(this._currentWorkOrder)
      .subscribe(result => this._currentWorkOrder = result);
  }

}
