import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {AveriaService} from '../../services/averia.service';
import {Averia} from '../../interfaces/averia';
import {AuthService} from '../../../user/services/auth.service';

@Component({
  selector: 'app-averia-list',
  templateUrl: './averia-list.component.html',
  styleUrls: ['./averia-list.component.scss']
})
export class AveriaListComponent implements OnInit {
  query: string = '';
  archived: boolean = false;
  averias: Array<any> = new Array<any>();
  // Variables para el Modal.
  titleModal: string;
  currentAveria: Averia;
  // TODO: deprecado borrar esta linea al refactorizar.
  isAdmin: boolean = false;

  constructor(private averiaService: AveriaService,
              private authService: AuthService) {
    this.currentAveria = new Averia();
  }

  ngOnInit(): void {
    jQuery(() => {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    this.getAverias();
  }

  // carga las averias.
  private getAverias(): void {
    this.averiaService.getAverias(this.archived, this.query)
      .subscribe(res => this.averias = res);
  }

  // Checkbox cambiar estado.
  onChange(checked: boolean): void {
    this.archived = checked;
  }

  // abre el modal averia.
  addAveria(): void {
    this.titleModal = 'Agregar Averia';
    this.currentAveria = new Averia();
    jQuery('#app-averia-modal').modal('show');
  }

  // Guarda las averias.
  saveChange(averia: Averia): void {
    if (averia._id === undefined) {
      this.averiaService.create(averia).subscribe(res => this.getAverias());
    } else {
      this.averiaService.update(averia).subscribe(res => this.getAverias());
    }
  }

  // buscar averias.
  onSearch(): void {
    this.getAverias();
  }

  // abrir modal para editar.
  onEditAveria(id: string): void {
    this.averiaService.getAveria(id).subscribe(res => {
      this.currentAveria = res;
      this.titleModal = 'Editar Averia';
      jQuery('#app-averia-modal').modal('show');
    });
  }

  // delete averia.
  onDeleteAveria(id: string): void {
    if (!this.isAdmin) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
        'error'
      );
    } else {
      Swal.fire({
        title: 'Seguro de borrar esta Averia?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.averiaService.delete(id).subscribe(res => {
            this.getAverias();
            Swal.fire(
              'Borrado!',
              'La Averia ha sido borrado.',
              'success'
            );
          });
        }
      });
    }
  }

  // attend averia.
  onAttendAveria(event, id: string): void {
    event.preventDefault();
    this.averiaService.getAveria(id).subscribe(res => {
      this.currentAveria = res;
      // if (this.currentAveria.status === 'P') {
      //   this.currentAveria.status = 'E';
      // }
      jQuery('#app-averia-attend').modal('show');
    });
  }

  // archivar averia.
  onArchivedAveria(event, id: string): void {
    event.preventDefault();
    this.averiaService.getAveria(id).subscribe(res => {
      this.currentAveria = res;
      if (this.currentAveria.status !== 'F') {
        Swal.fire('Debe finalizar esta Averia!');
      } else {
        Swal.fire({
          title: 'Seguro de archivar esta Averia?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, archivalo!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.currentAveria.archived = true;
            this.averiaService.update(this.currentAveria).subscribe(res => {
              this.getAverias();
              Swal.fire(
                'Archivado!',
                'La averia ha sido archivado.',
                'success'
              );
            });
          }
        });
      }
    });
  }

}
