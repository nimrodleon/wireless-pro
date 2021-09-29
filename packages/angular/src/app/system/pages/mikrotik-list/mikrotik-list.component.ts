import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare var bootstrap: any;
import {MikrotikService} from '../../services';
import {AuthService} from 'src/app/user/services';
import {Mikrotik} from '../../interfaces';

@Component({
  selector: 'app-mikrotik-list',
  templateUrl: './mikrotik-list.component.html',
  styleUrls: ['./mikrotik-list.component.scss']
})
export class MikrotikListComponent implements OnInit {
  mikrotikModal: any;
  currentMikrotik: Mikrotik;
  mikrotikFormData: Mikrotik;
  mikrotikList: Array<Mikrotik> = new Array<Mikrotik>();
  editMode: boolean = false;
  title: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private mikrotikService: MikrotikService) {
    this.currentMikrotik = this.mikrotikService.defaultValues();
    this.mikrotikFormData = this.mikrotikService.defaultValues();
  }

  ngOnInit(): void {
    // Establecer modal mikrotik form.
    this.mikrotikModal = new bootstrap.Modal(
      document.querySelector('#mikrotik-form'));
    // obtener rol del usuario autentificado.
    this.authService.getRoles().subscribe(async (result: any) => {
      if (result !== this.roles.ROLE_ADMIN) {
        await this.router.navigate(['/system']);
      }
    });
    this.getMikrotikList();
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
        // cargar primer elemento de la lista.
        if (result.length > 0) {
          this.loadCurrentMikrotik(result[0]._id);
        }
      });
  }

  // cargar mikrotik actual.
  loadCurrentMikrotik(id: string): void {
    this.mikrotikService.getMikrotikById(id).subscribe(result => {
      this.currentMikrotik = result;
    });
  }

  // Agregar Mikrotik.
  addMikrotikClick(): void {
    this.editMode = false;
    this.title = 'Agregar Mikrotik';
    this.mikrotikFormData = this.mikrotikService.defaultValues();
    this.mikrotikModal.show();
  }

  // Editar mikrotik.
  editMikrotik(): void {
    this.editMode = true;
    this.title = 'Editar Mikrotik';
    this.mikrotikFormData = this.currentMikrotik;
    this.mikrotikModal.show();
  }

  // Cerrar modal mikrotik form.
  hideMikrotik(value: boolean): void {
    if (value) {
      this.getMikrotikList();
      this.mikrotikModal.hide();
    }
  }

}
