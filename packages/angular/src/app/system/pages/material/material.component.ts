import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {Material} from '../../interfaces';
import {MaterialService} from '../../services';
import {AuthService} from '../../../user/services/auth.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  titleModal: string;
  materials: Material[];
  currentMaterial: Material = {
    _id: '', und: '', description: '', price: 0
  };
  query: string = '';
  currentRole: string;

  constructor(
    private authService: AuthService,
    private materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.getMaterials();
    // Obtener el rol del usuario autentificado.
    this.authService.getRoles().subscribe(res => this.currentRole = res);
  }

  get roles() {
    return this.authService.roles;
  }

  private getMaterials(): void {
    this.materialService.getMaterials(this.query)
      .subscribe(res => this.materials = res);
  }

  addMaterial(): void {
    this.titleModal = 'Nuevo Material';
    this.currentMaterial = {
      _id: '', und: '', description: '', price: 0
    };
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
    if (material._id === '') {
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
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      Swal.fire(
        'Información',
        'No es admin, no puede hacer esto!',
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
        if (result.isConfirmed) {
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
  }

  // Search Query
  onSearch(): void {
    this.getMaterials();
  }

}
