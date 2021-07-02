import {Injectable} from '@angular/core';
import {InstallationOrderService} from './installation-order.service';
import {InstallationOrder} from '../interfaces';
import {ServicePlan} from '../../system/interfaces';
import {Client} from '../../client/interfaces';
import {User} from '../../user/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstallationOrderDetailService {
  private _currentInstallationOrder: InstallationOrder;
  private _currentServicePlan: ServicePlan;
  private _currentClient: Client;
  private _userTechnical: User;

  constructor(
    private installationOrderService: InstallationOrderService) {
  }

  // retornar cliente actual.
  get currentClient(): Client {
    return this._currentClient;
  }

  // retornar orden de instalación actual.
  get currentInstallationOrder(): InstallationOrder {
    return this._currentInstallationOrder;
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
    this._currentInstallationOrder.userId = user._id;
  }

  // cargar orden de instalación.
  getInstallationOrder(id: string): void {
    this.installationOrderService.getInstallationOrderById(id)
      .subscribe(result => {
        this._currentInstallationOrder = result;
        this.installationOrderService.getClientById(result.clientId)
          .subscribe(result => this._currentClient = result);
        this.installationOrderService.getServicePlanById(result.servicePlanId)
          .subscribe(result => this._currentServicePlan = result);
        this.installationOrderService.getUserById(result.userId)
          .subscribe(result => this._userTechnical = result);
      });
  }

  // actualizar orden de instalación.
  updateInstallationOrder(): void {
    this.installationOrderService.updateOrder(this._currentInstallationOrder)
      .subscribe(result => this._currentInstallationOrder = result);
  }


}
