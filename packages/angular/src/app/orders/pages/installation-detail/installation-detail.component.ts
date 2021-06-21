import {Component, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-installation-detail',
  templateUrl: './installation-detail.component.html',
  styleUrls: ['./installation-detail.component.scss']
})
export class InstallationDetailComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // Agregar usuario.
  addUserClick(): void {
    jQuery('#add-user').modal('show');
  }

  // Agregar material.
  addMaterial(): void {
    jQuery('#add-material').modal('show');
  }

  // Editar item material.
  editItemMaterial(): void {
    jQuery('#item-material').modal('show');
  }

}
