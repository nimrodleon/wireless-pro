import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import _ from 'lodash';
import {AuthService} from 'src/app/user/services/auth.service';
import Swal from 'sweetalert2';
import {Coverage} from '../../interfaces/coverage';
import {CoverageService} from '../../services/coverage.service';

@Component({
  selector: 'app-coverage-list',
  templateUrl: './coverage-list.component.html',
  styleUrls: ['./coverage-list.component.scss']
})
export class CoverageListComponent implements OnInit {
  coverages: Coverage[];
  titleModal: string;
  currentCoverage: Coverage = new Coverage();
  query: string = '';
  currentRole: string;

  constructor(
    private authService: AuthService,
    private coverageService: CoverageService) {
  }

  get roles() {
    return this.authService.roles;
  }

  ngOnInit(): void {
    this.getCoverages();
    // Obtener el rol del usuario autentificado.
    this.authService.getRoles().subscribe(res => this.currentRole = res);
  }

  // Obtiene las áreas de cobertura.
  private getCoverages(): void {
    this.coverageService.getCoverages(this.query)
      .subscribe(res => this.coverages = res);
  }

  // Obtiene una área cobertura.
  private getCoverage(id: string): void {
    this.coverageService.getCoverage(id).subscribe(res => this.currentCoverage = res);
  }

  // Ordenar coverages.
  private orderName: string = 'asc';

  onOrderName(event: any): void {
    event.preventDefault();
    this.orderName = this.orderName == 'asc' ? 'desc' : 'asc';
    let objTmp = _.orderBy(this.coverages, ['name'], [this.orderName]);
    this.coverages = objTmp;
  }

  deleteCoverage(id: string): void {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
        'error'
      );
    } else {
      // Borrar el usuario tiene permisos.
      Swal.fire({
        title: '¿Estás seguro de borrar?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.coverageService.delete(id).subscribe(res => {
            this.getCoverages();
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

  // Open Modal Coverage.
  onCreate(): void {
    this.titleModal = 'Agregar área cobertura';
    this.currentCoverage = new Coverage();
    jQuery('#app-coverage-modal').modal('show');
  }

  // Abre el modal área cobertura en modo edición.
  onEdit(id: string): void {
    this.titleModal = 'Editar área cobertura';
    this.getCoverage(id);
    jQuery('#app-coverage-modal').modal('show');
  }

  // Envía una área de cobertura para almacenar en la base de datos.
  onSave(coverage: Coverage): void {
    if (coverage._id == undefined) {
      this.coverageService.create(coverage).subscribe(res => {
        this.coverages.push(res);
      });
    } else {
      this.coverageService.update(coverage).subscribe(res => {
        _.forEach(this.coverages, (item, key) => {
          if (item._id == res._id) {
            this.coverages[key] = res;
          }
        });
      });
    }
  }

  onSearch(): void {
    this.getCoverages();
  }

}
