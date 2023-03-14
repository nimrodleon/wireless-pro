import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import {AuthService} from 'src/app/user/services';
import {AveriaService} from '../../services/averia.service';
import {Averia} from '../../interfaces/averia';

declare var bootstrap: any;

@Component({
  selector: 'app-averia-list',
  templateUrl: './averia-list.component.html',
  styleUrls: ['./averia-list.component.scss']
})
export class AveriaListComponent implements OnInit {
  averias: Array<Averia>;
  titleModal: string = '';
  currentAveria: Averia;
  currentRole: string = '';
  // ============================================================
  queryInput: FormControl = this.fb.control('');
  averiaModal: any;
  attendAveriaModal: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private averiaService: AveriaService) {
    this.averias = new Array<Averia>();
    this.currentAveria = this.averiaService.defaultValues();
  }

  ngOnInit(): void {
    this.getAveriaList();
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe((res: string) => this.currentRole = res);
    // vincular averia modal.
    this.averiaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-modal'));
    // vincular modal atender averia.
    this.attendAveriaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-attend'));
  }

  get roles() {
    return this.authService.roles;
  }

  // carga las averias.
  private getAveriaList(): void {
    this.averiaService.getAverias(this.queryInput.value)
      .subscribe(res => this.averias = res);
  }

  // Guarda las averias.
  saveChange(averia: Averia): void {
    if (averia._id !== undefined) {
      this.averiaService.update(averia)
        .subscribe(() => {
          this.getAveriaList();
          this.averiaModal.hide();
          this.attendAveriaModal.hide();
        });
    }
  }

  // buscar averias.
  searchAverias(e: any): void {
    e.preventDefault();
    this.getAveriaList();
  }

  // abrir modal para editar.
  editAveriaClick(id: string): void {
    this.averiaService.getAveria(id).subscribe(res => {
      this.currentAveria = res;
      this.titleModal = 'Editar Averia';
      this.averiaModal.show();
    });
  }

  // delete averia.
  deleteAveriaClick(id: string): void {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
        'error'
      );
    } else {
      Swal.fire({
        title: 'Seguro de borrar?',
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
            this.getAveriaList();
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
  attendAveriaClick(id: string): void {
    this.averiaService.getAveria(id).subscribe(res => {
      this.currentAveria = res;
      this.attendAveriaModal.show();
    });
  }

  // archivar averia.
  archivedAveriaClick(e: any, id: string): void {
    e.preventDefault();
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
              this.getAveriaList();
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
