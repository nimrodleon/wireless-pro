import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';

declare var jQuery: any;
import {AuthService} from 'src/app/user/services';
import {AveriaService} from '../../services/averia.service';
import {Averia} from '../../interfaces/averia';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-averia-list',
  templateUrl: './averia-list.component.html',
  styleUrls: ['./averia-list.component.scss']
})
export class AveriaListComponent implements OnInit {
  // query: string = '';
  // archived: boolean = false;
  averias: Array<any> = new Array<any>();
  titleModal: string;
  currentAveria: Averia;
  currentRole: string;
  // ============================================================
  queryInput: FormControl = this.fb.control('');
  archivedSwitch: FormControl = this.fb.control(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private averiaService: AveriaService) {
    this.currentAveria = this.averiaService.defaultValues();
  }

  ngOnInit(): void {
    this.getAveriaList();
    // Obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe(res => this.currentRole = res);
  }

  get roles() {
    return this.authService.roles;
  }

  // carga las averias.
  private getAveriaList(): void {
    this.averiaService.getAverias(this.archivedSwitch.value, this.queryInput.value)
      .subscribe(res => this.averias = res);
  }

  // abre el modal averia.
  addAveria(): void {
    this.titleModal = 'Agregar Averia';
    this.currentAveria = this.averiaService.defaultValues();
    jQuery('#app-averia-modal').modal('show');
  }

  // Guarda las averias.
  saveChange(averia: Averia): void {
    if (averia._id === undefined) {
      console.log(averia);
      this.averiaService.create(averia).subscribe(res => this.getAveriaList());
    } else {
      this.averiaService.update(averia).subscribe(res => this.getAveriaList());
    }
  }

  // buscar averias.
  searchAverias(e: any): void {
    e.preventDefault();
    this.getAveriaList();
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
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
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
  onAttendAveria(id: string): void {
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
