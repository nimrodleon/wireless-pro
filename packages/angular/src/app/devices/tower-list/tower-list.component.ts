import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {Tower} from '../tower.model';
import {TowerService} from '../tower.service';
import {AuthService} from '../../user/services/auth.service';

@Component({
  selector: 'app-tower-list',
  templateUrl: './tower-list.component.html',
  styleUrls: ['./tower-list.component.scss']
})
export class TowerListComponent implements OnInit {
  titleModal: string = '';
  query: string = '';
  currentTower: Tower = new Tower();
  towers: Array<any> = new Array<any>();
  // Permisos para administrar módulo.
  isRedes: boolean = false;

  // Constructor de la Clase.
  constructor(private towerService: TowerService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    jQuery(() => {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    this.getTowers();
    this.authService.isRedes()
      .subscribe(res => this.isRedes = res);
  }

  private getTowers(): void {
    this.towerService.getTowers(this.query)
      .subscribe(res => this.towers = res);
  }

  addTower(): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      this.titleModal = 'Agregar Torre';
      this.currentTower = new Tower();
      jQuery('#app-tower-modal').modal('show');
    }
  }

  editTower(id: string): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
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
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
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
        if (result.value) {
          this.towerService.countDevices(id)
            .subscribe(res => {
              if (res > 0) {
                Swal.fire(
                  'No se pudo borrar?',
                  'Existe mas de un equipo asociado a este registro?',
                  'warning'
                );
              } else {
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
      });
    }
  }

}
