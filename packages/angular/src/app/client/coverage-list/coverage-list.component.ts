import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import _ from 'lodash';
import {AuthService} from 'src/app/user/auth.service';
import Swal from 'sweetalert2';
import {Coverage} from '../coverage.model';
import {CoverageService} from '../coverage.service';

@Component({
  selector: 'app-coverage-list',
  templateUrl: './coverage-list.component.html',
  styleUrls: ['./coverage-list.component.scss']
})
export class CoverageListComponent implements OnInit {
  coverages: Coverage[];
  isAdmin: boolean;
  titleModal: string;
  currentCoverage: Coverage = new Coverage();
  query: string = '';

  constructor(private coverageService: CoverageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getCoverages();
    this.authService.isAdmin().subscribe(res => this.isAdmin = res);
  }

  // Optiene las áreas de cobertura.
  private getCoverages(): void {
    this.coverageService.getCoverages(this.query)
      .subscribe(res => this.coverages = res);
  }

  // Optiene una área cobertura.
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
    if (!this.isAdmin) {
      Swal.fire(
        'Oops...',
        'Necesitas permisos para esta Operación!',
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
      }).then((result) => {
        if (result.value) {
          this.coverageService.countClients(id).subscribe(res => {
            if (res.count > 0) {
              Swal.fire(
                'No se pudo borrar?',
                'Existe mas de un cliente asociado a este registro?',
                'warning'
              );
            } else {
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

  // Envia una área de covertura para almacenar en la base de datos.
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
