import {Injectable} from '@html/core';
import {Router} from '@html/router';
import {Observable} from 'rxjs';
import {Sweetalert2} from 'src/app/global/interfaces';
import {Client, Service} from '../interfaces';
import {ClientService} from './client.service';
import {AuthService} from '../../user/services';
import {ServiceService} from './service.service';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailService {
  private _currentClient: Client;
  private _currentRole: string = '';
  private _serviceList: Array<Service> = new Array<Service>();

  constructor(
    private router: Router,
    private clientService: ClientService,
    private serviceService: ServiceService,
    private authService: AuthService) {
    // valores por defecto del cliente actual.
    this._currentClient = this.clientService.defaultValues();
  }

  // Lista de roles.
  get roles() {
    return this.authService.roles;
  }

  // rol del usuario autentificado.
  get currentRole(): string {
    return this._currentRole;
  }

  // devuelve el cliente actual.
  get currentClient(): Client {
    return this._currentClient;
  }

  // Lista de servicios.
  get serviceList(): Array<Service> {
    return this._serviceList;
  }

  // Obtener el rol del usuario autentificado.
  getRoles(): void {
    this.authService.getRoles()
      .subscribe((res: string) => this._currentRole = res);
  }

  // establecer cliente actual.
  getClient(id: string | any): void {
    this.clientService.getClientById(id)
      .subscribe(res => this._currentClient = res);
  }

  // actualizar datos del cliente.
  updateClient(client: Client): void {
    this.clientService.updateClient(client)
      .subscribe(res => this._currentClient = res);
  }

  // borrar cliente.
  deleteClient(id: string): void {
    this.clientService.deleteClient(id).subscribe(async () => {
      await Sweetalert2.deleteSuccess();
      await this.router.navigate(['/client']);
    });
  }

  // valor por defecto del servicio.
  serviceDefaultValues(): Service {
    return this.serviceService.defaultValues();
  }

  // obtener servicio por id.
  getServiceById(id: string): Observable<Service> {
    return this.serviceService.getServiceById(id);
  }

  // cargar lista de servicios.
  getServiceList(clientId: string | any): void {
    this.serviceService.getServices(clientId)
      .subscribe(result => this._serviceList = result);
  }

}
