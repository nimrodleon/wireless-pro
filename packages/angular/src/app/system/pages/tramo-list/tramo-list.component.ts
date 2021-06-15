import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {TramoService} from '../../services';
import {Tramo} from '../../interfaces';
import {AuthService} from '../../../user/services/auth.service';

@Component({
  selector: 'app-tramo-list',
  templateUrl: './tramo-list.component.html',
  styleUrls: ['./tramo-list.component.scss']
})
export class TramoListComponent implements OnInit {
  tramos: Array<any>;
  query: string = '';
  titleModal: string;
  currentRole: string;
  currentTramo: Tramo = {
    _id: '',
    tramo: '',
    coverage: '',
  };

  constructor(
    private tramoService: TramoService,
    private authService: AuthService) {
    this.tramos = Array<any>();
  }

  ngOnInit(): void {
    this.getTramos();
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe(res => this.currentRole = res);
  }

  get roles() {
    return this.authService.roles;
  }

  private getTramos(): void {
    this.tramoService.getTramos(this.query)
      .subscribe(res => this.tramos = res);
  }

  saveChanges(tramo: Tramo) {
    if (tramo._id === '') {
      this.tramoService.create(tramo)
        .subscribe(res => this.getTramos());
    } else {
      this.tramoService.update(tramo)
        .subscribe(res => this.getTramos());
    }
  }

  addTramo(): void {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      Swal.fire(
        'Información',
        'No tiene permisos para realizar esta tarea!',
        'error'
      );
    } else {
      this.titleModal = 'Agregar Tramo';
      this.currentTramo = {
        _id: '',
        tramo: '',
        coverage: '',
      };
      jQuery('#app-tramo-modal').modal('show');
    }
  }

  editTramo(id: string): void {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      Swal.fire(
        'Información',
        'No tiene permisos para realizar esta tarea!',
        'error'
      );
    } else {
      this.titleModal = 'Editar Tramo';
      this.tramoService.getTramo(id).subscribe(res => {
        this.currentTramo = res;
        jQuery('#app-tramo-modal').modal('show');
      });
    }
  }

  deleteTramo(id: string): void {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
        'error'
      );
    } else {
      Swal.fire({
        title: 'Seguro de borrar este Tramo?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.tramoService.delete(id)
            .subscribe(res => {
              this.getTramos();
              Swal.fire(
                'Borrado!',
                'El Tramo ha sido borrado.',
                'success'
              );
            });
        }
      });
    }
  }

  onSearch(): void {
    this.getTramos();
  }

}
