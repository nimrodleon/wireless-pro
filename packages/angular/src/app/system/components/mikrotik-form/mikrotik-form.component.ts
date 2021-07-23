import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var bootstrap: any;
import {ApplicationService, InterfaceService, MikrotikService} from '../../services';
import {Application, Interface} from '../../interfaces';

@Component({
  selector: 'app-mikrotik-form',
  templateUrl: './mikrotik-form.component.html',
  styleUrls: ['./mikrotik-form.component.scss']
})
export class MikrotikFormComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  editMode: boolean;
  @Input()
  currentMikrotik;
  applicationList: Array<Application>;
  @Output()
  hideModal = new EventEmitter<boolean>();
  // ============================================================
  currentInterface: Interface;
  interfaceList: Array<Interface>;
  etherEditMode: boolean = false;

  constructor(
    private mikrotikService: MikrotikService,
    private interfaceService: InterfaceService,
    private applicationService: ApplicationService) {
    this.currentInterface = this.interfaceService.defaultValues();
  }

  ngOnInit(): void {
    this.getApplicationList();
    let myModal = document.querySelector('#mikrotik-form');
    myModal.addEventListener('shown.bs.modal', () => {
      if (this.editMode) {
        this.getInterfaceList(this.currentMikrotik._id);
      }
    });
    let basicTab = new bootstrap.Tab(
      document.querySelector('#basic-tab'));
    myModal.addEventListener('hide.bs.modal', () => {
      this.etherEditMode = false;
      this.currentInterface = this.interfaceService.defaultValues();
      basicTab.show();
    });
  }

  // Lista de aplicaciones.
  getApplicationList(): void {
    this.applicationService.getApplications()
      .subscribe(result => this.applicationList = result);
  }

  // Guardar cambios.
  saveChanges(): void {
    if (this.editMode) {
      // actualizar mikrotik.
      this.mikrotikService.updateMikrotik(this.currentMikrotik)
        .subscribe(() => {
          this.hideModal.emit(true);
        });
    } else {
      // registrar mikrotik.
      delete this.currentMikrotik._id;
      this.mikrotikService.createMikrotik(this.currentMikrotik)
        .subscribe(() => {
          this.hideModal.emit(true);
        });
    }
  }

  // ============================================================

  // Lista de interfaces.
  getInterfaceList(id: string): void {
    this.interfaceService.getInterfaceList(id)
      .subscribe(result => this.interfaceList = result);
  }

  // editar interfaz.
  editInterfaceClick(id: string): void {
    this.interfaceService.getInterfaceById(id)
      .subscribe(result => {
        this.currentInterface = result;
        this.etherEditMode = true;
      });
  }

  // guardar cambios de la interfaz.
  saveEthernet(): void {
    this.currentInterface.mikrotikId = this.currentMikrotik._id;
    if (this.etherEditMode) {
      // actualizar interfaz.
      this.interfaceService.updateInterface(this.currentInterface)
        .subscribe(() => this.getInterfaceList(this.currentMikrotik._id));
    } else {
      // registrar interfaz.
      this.etherEditMode = false;
      delete this.currentInterface._id;
      this.interfaceService.createInterface(this.currentInterface)
        .subscribe(() => {
          this.getInterfaceList(this.currentMikrotik._id);
          this.currentInterface = this.interfaceService.defaultValues();
        });
    }
  }

}
