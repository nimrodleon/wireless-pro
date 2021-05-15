import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {TramoService} from '../tramo.service';
import {Tramo} from '../tramo.model';
import {AuthService} from '../../user/auth.service';

@Component({
  selector: 'app-tramo-list',
  templateUrl: './tramo-list.component.html',
  styleUrls: ['./tramo-list.component.scss']
})
export class TramoListComponent implements OnInit {
  tramos: Array<any>;
  query: string = '';
  titleModal: string;
  currentTramo: Tramo;
  // Permisos para Administrar el módulo.
  isRedes: boolean = false;

  constructor(private tramoService: TramoService,
              private authService: AuthService) {
    this.tramos = Array<any>();
    this.currentTramo = new Tramo();
  }

  ngOnInit(): void {
    this.getTramos();
    this.authService.isRedes()
      .subscribe(res => this.isRedes = res);
  }

  private getTramos(): void {
    this.tramoService.getTramos(this.query)
      .subscribe(res => this.tramos = res);
  }

  saveChanges(tramo: Tramo) {
    if (tramo._id === undefined) {
      this.tramoService.create(tramo)
        .subscribe(res => this.getTramos());
    } else {
      this.tramoService.update(tramo)
        .subscribe(res => this.getTramos());
    }
  }

  addTramo(): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      this.titleModal = 'Agregar Tramo';
      this.currentTramo = new Tramo();
      jQuery('#app-tramo-modal').modal('show');
    }
  }

  editTramo(id: string): void {
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
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
    if (!this.isRedes) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
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
          this.tramoService.countDevices(id)
            .subscribe(res => {
              if (res > 0) {
                Swal.fire(
                  'No se pudo borrar?',
                  'Existe mas de un equipo asociado a este registro?',
                  'warning'
                );
              } else {
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
      });
    }
  }

  onSearch(): void {
    this.getTramos();
  }

}
