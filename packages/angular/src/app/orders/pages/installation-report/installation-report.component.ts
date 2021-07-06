import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {InstallationOrderService} from '../../services';
import Swal from 'sweetalert2';
import {AuthService} from '../../../user/services';

interface IQueryForm {
  year: string;
  month: string;
  search: string;
}

@Component({
  selector: 'app-installation-report',
  templateUrl: './installation-report.component.html',
  styleUrls: ['./installation-report.component.scss']
})
export class InstallationReportComponent implements OnInit {
  installationOrders: any[];
  queryData: IQueryForm = {
    year: moment().format('YYYY'),
    month: moment().format('MM'),
    search: ''
  };
  queryForm: FormGroup = this.fb.group({
    year: [moment().format('YYYY')],
    month: [moment().format('MM')],
    search: ['']
  });
  currentRole: string;

  constructor(
    private fb: FormBuilder,
    private installationOrderService: InstallationOrderService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // Subscripción del formulario.
    this.queryForm.valueChanges.subscribe(values => this.queryData = values);
    // Cargar lista ordenes de instalación.
    this.getInstallationOrders();
    // Obtener el rol del usuario autentificado.
    this.authService.getRoles().subscribe(result => this.currentRole = result);
  }

  // Lista de roles.
  get roles() {
    return this.authService.roles;
  }

  // Cargar lista de ordenes de instalación.
  private getInstallationOrders(): void {
    this.installationOrderService.getInstallationOrdersByYearMonth(this.queryData)
      .subscribe(result => this.installationOrders = result);
  }

  // Buscar ordenes de instalación.
  searchSubmit(): void {
    this.getInstallationOrders();
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
              this.getInstallationOrders();
            });
        }
      });
    }
  }

}
