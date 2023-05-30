import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AuthService } from 'src/app/user/services';
import { MikrotikService, MkMigrateService } from '../../services';
import { Mikrotik } from '../../interfaces';
import { Sweetalert2 } from '../../../global/interfaces';

@Component({
  selector: 'app-mikrotik-list',
  templateUrl: './mikrotik-list.component.html'
})
export class MikrotikListComponent implements OnInit {
  mikrotikModal: any;
  staticBackdrop: any;
  currentMikrotik: Mikrotik;
  mikrotikList: Array<Mikrotik> = new Array<Mikrotik>();
  editMode: boolean = false;
  title: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private mkMigrateService: MkMigrateService,
    private mikrotikService: MikrotikService) {
    this.currentMikrotik = this.mikrotikService.defaultValues();
  }

  ngOnInit(): void {
    // Establecer modal mikrotik form.
    this.mikrotikModal = new bootstrap.Modal('#mikrotik-form');
    this.staticBackdrop = new bootstrap.Modal('#staticBackdrop');
    // obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe(async (result: any) => {
      if (result !== this.roles.ROLE_ADMIN) {
        await this.router.navigate(['/system']);
      }
    });
    this.getMikrotikList();
  }

  // tamaño de servicios.
  get servicesLength() {
    return this.mkMigrateService.servicesLength;
  }

  // Lista de permisos.
  get roles() {
    return this.authService.roles;
  }

  // Lista de mikrotik.
  private getMikrotikList(): void {
    this.mikrotikService.getMikrotikList()
      .subscribe(result => {
        this.mikrotikList = result;
      });
  }

  // Agregar Mikrotik.
  addMikrotikClick(): void {
    this.editMode = false;
    this.title = 'Agregar Mikrotik';
    this.currentMikrotik = this.mikrotikService.defaultValues();
    this.mikrotikModal.show();
  }

  // Editar mikrotik.
  editMikrotik(id: string): void {
    this.editMode = true;
    this.title = 'Editar Mikrotik';
    this.mikrotikService.getMikrotikById(id).subscribe(result => {
      this.currentMikrotik = result;
      this.mikrotikModal.show();
    });
  }

  // Cerrar modal mikrotik form.
  hideMikrotik(value: boolean): void {
    if (value) {
      this.getMikrotikList();
      this.mikrotikModal.hide();
    }
  }

  // migrar servicios del mikrotik.
  servicesMigrate(id: string): void {
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        this.mkMigrateService.mikrotikMigrate(id, this.staticBackdrop);
      }
    });
  }

}
