import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Client} from '../interfaces';
import {ClientService} from './client.service';
import Swal from 'sweetalert2';
import {AuthService} from '../../user/services';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailService {
  private _currentClient: Client;
  private _currentRole: string;

  constructor(
    private router: Router,
    private clientService: ClientService,
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

  // Obtener el rol del usuario autentificado.
  getRoles(): void {
    this.authService.getRoles()
      .subscribe(res => this._currentRole = res);
  }

  // establecer cliente actual.
  getClient(id: string): void {
    this.clientService.getClient(id)
      .subscribe(res => this._currentClient = res);
  }

  // actualizar datos del cliente.
  updateClient(client: Client): void {
    this.clientService.update(client)
      .subscribe(res => this._currentClient = res);
  }

  // borrar cliente.
  deleteClient(id: string): void {
    this.clientService.delete(id).subscribe(res => {
      Swal.fire(
        'Eliminado!',
        'El Cliente a sido eliminado.',
        'success'
      );
      this.router.navigate(['/client']);
    });
  }

}
