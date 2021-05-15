import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {Material} from '../material.model';
import {MaterialService} from '../material.service';
import {AuthService} from '../../user/auth.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  titleModal: string;
  materials: Material[];
  currentMaterial: Material;
  isAdmin: boolean = false;
  // Query Values.
  query: string = '';

  constructor(private materialService: MaterialService,
              private authService: AuthService) {
    this.currentMaterial = new Material();
  }

  ngOnInit(): void {
    this.getMaterials();
    this.authService.isAdmin()
      .subscribe(res => this.isAdmin = res);
  }

  private getMaterials(): void {
    this.materialService.getMaterials(this.query)
      .subscribe(res => this.materials = res);
  }

  addMaterial(): void {
    this.titleModal = 'Nuevo Material';
    this.currentMaterial = new Material();
    jQuery('#app-material-modal').modal('show');
  }

  editMaterial(id: string): void {
    this.materialService.getMaterial(id).subscribe(res => {
      this.titleModal = 'Editar Material';
      this.currentMaterial = res;
      jQuery('#app-material-modal').modal('show');
    });
  }

  saveChanges(material: Material): void {
    if (material._id === undefined) {
      this.materialService.create(material).subscribe(res => {
        this.getMaterials();
      });
    } else {
      this.materialService.update(material).subscribe(res => {
        this.getMaterials();
      });
    }
  }

  // delete material.
  deleteMaterial(id: string): void {
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
          this.materialService.countTaskMaterials(id).subscribe(res => {
            if (res.count > 0) {
              Swal.fire(
                'No se pudo borrar?',
                'Existe mas de un item de Tarea asociado a este registro?',
                'warning'
              );
            } else {
              this.materialService.delete(id).subscribe(res => {
                this.getMaterials();
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

  // Search Query
  onSearch(): void {
    this.getMaterials();
  }

}
