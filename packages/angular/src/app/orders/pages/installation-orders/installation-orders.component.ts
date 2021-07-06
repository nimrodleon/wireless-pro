import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import {InstallationOrderService} from '../../services';
import {AuthService} from 'src/app/user/services';

@Component({
  selector: 'app-installation-orders',
  templateUrl: './installation-orders.component.html',
  styleUrls: ['./installation-orders.component.scss']
})
export class InstallationOrdersComponent implements OnInit {
  installationOrders: any[];
  query: FormControl = this.fb.control('');
  currentRole: string;

  constructor(
    private fb: FormBuilder,
    private installationOrderService: InstallationOrderService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // Cargar ordenes de instalación.
    this.getInstallationOrders(this.query.value);
    // Obtener el rol del usuario autentificado.
    this.authService.getRoles().subscribe(result => this.currentRole = result);
  }

  // Lista de roles.
  get roles() {
    return this.authService.roles;
  }

  // Cargar lista de ordenes de instalación.
  private getInstallationOrders(query: string): void {
    this.installationOrderService.getInstallationOrders(query)
      .subscribe(result => this.installationOrders = result);
  }

  // Buscar ordenes de instalación.
  installationOrdersLoad(e: any): void {
    e.preventDefault();
    this.getInstallationOrders(this.query.value);
  }

  // borrar orden de instalación.
  deleteOrderInstallation(id: string): void {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
        'error'
      );
    } else {
      Swal.fire({
        title: '¿Estás seguro de borrar?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.installationOrderService.deleteOrder(id)
            .subscribe(() => {
              this.getInstallationOrders(this.query.value);
            });
        }
      });
    }
  }

}
