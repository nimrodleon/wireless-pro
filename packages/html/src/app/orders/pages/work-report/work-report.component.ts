import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import {WorkOrderService} from '../../services';
import {AuthService} from 'src/app/user/services';

interface IQueryForm {
  year: string;
  month: string;
  search: string;
}

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.component.html'
})
export class WorkReportComponent implements OnInit {
  workOrders: Array<any> = new Array<any>();
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
  currentRole: string = '';

  constructor(
    private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // Subscripción del formulario.
    this.queryForm.valueChanges.subscribe(values => this.queryData = values);
    // Cargar lista ordenes de trabajo.
    this.getWorkOrders();
    // Obtener el rol del usuario autentificado.
    this.authService.getRoles().subscribe((result: string) => this.currentRole = result);
  }

  // Lista de roles.
  get roles() {
    return this.authService.roles;
  }

  // Cargar lista de ordenes de trabajo.
  private getWorkOrders(): void {
    this.workOrderService.getWorkOrdersByYearMonth(this.queryData)
      .subscribe(result => this.workOrders = result);
  }

  // Buscar ordenes de trabajo.
  searchSubmit(): void {
    this.getWorkOrders();
  }

  // borrar orden de trabajo.
  deleteWorkOrder(id: string): void {
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
          this.workOrderService.deleteOrder(id)
            .subscribe(() => {
              this.getWorkOrders();
            });
        }
      });
    }
  }

}
