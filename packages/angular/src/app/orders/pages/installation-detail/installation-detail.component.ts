import {Component, OnInit} from '@angular/core';
import {InstallationOrderDetailService} from '../../services';
import {ActivatedRoute} from '@angular/router';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
  selector: 'app-installation-detail',
  templateUrl: './installation-detail.component.html',
  styleUrls: ['./installation-detail.component.scss']
})
export class InstallationDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private installationOrderDetailService: InstallationOrderDetailService) {
  }

  ngOnInit(): void {
    // cargar datos orden de instalación.
    this.activatedRoute.paramMap.subscribe(params => {
      this.installationOrderDetailService.getInstallationOrder(params.get('id'));
    });
  }

  // orden de instalación.
  get currentInstallationOrder() {
    return this.installationOrderDetailService.currentInstallationOrder;
  }

  // plan de servicio.
  get currentServicePlan() {
    return this.installationOrderDetailService.currentServicePlan;
  }

  // cliente actual.
  get currentClient() {
    return this.installationOrderDetailService.currentClient;
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
