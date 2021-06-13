import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {Tower} from '../../interfaces';
import {TowerService} from '../../services';
import {AuthService} from '../../../user/services/auth.service';

@Component({
  selector: 'app-tower-list',
  templateUrl: './tower-list.component.html',
  styleUrls: ['./tower-list.component.scss']
})
export class TowerListComponent implements OnInit {
  titleModal: string = '';
  query: string = '';
  currentTower: Tower;
  towers: Array<any> = new Array<any>();
  currentRole: string;

  // Constructor de la Clase.
  constructor(
    private authService: AuthService,
    private towerService: TowerService) {
  }

  ngOnInit(): void {
    jQuery(() => {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    this.getTowers();
    // Obtener el rol del usuario autentificado.
    this.authService.getRoles()
      .subscribe(res => this.currentRole = res);
  }

  get roles() {
    return this.authService.roles;
  }

  private getTowers(): void {
    this.towerService.getTowers(this.query)
      .subscribe(res => this.towers = res);
  }

  addTower(): void {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      Swal.fire(
        'Información',
        'No tiene permisos para realizar esta tarea!',
        'error'
      );
    } else {
      this.titleModal = 'Agregar Torre';
      this.currentTower = null;
      jQuery('#app-tower-modal').modal('show');
    }
  }

  editTower(id: string): void {
    if (this.currentRole !== this.roles.ROLE_NETWORK) {
      Swal.fire(
        'Información',
        'No tiene permisos para realizar esta tarea!',
        'error'
      );
    } else {
      this.titleModal = 'Editar Torre';
      this.towerService.getTower(id).subscribe(res => {
        this.currentTower = res;
        jQuery('#app-tower-modal').modal('show');
      });
    }
  }

  saveChanges(tower: Tower): void {
    console.log(tower);
    if (tower._id === undefined) {
      this.towerService.create(tower)
        .subscribe(res => this.getTowers());
    } else {
      this.towerService.update(tower)
        .subscribe(res => this.getTowers());
    }
  }

  onSearch(): void {
    this.getTowers();
  }

  deleteTower(id: string): void {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
        'error'
      );
    } else {
      Swal.fire({
        title: 'Seguro de borrar la torre?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.towerService.delete(id).subscribe(res => {
            this.getTowers();
            Swal.fire(
              'Borrado!',
              'El registro ha sido borrado.',
              'success'
            );
          });
        }
      });
    }
  }

}
