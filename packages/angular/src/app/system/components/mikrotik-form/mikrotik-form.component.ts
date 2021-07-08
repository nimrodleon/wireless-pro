import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var bootstrap: any;
import {ApplicationService, EthernetService, MikrotikService} from '../../services';
import {Application, Ethernet} from '../../interfaces';

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
  currentEthernet: Ethernet;
  ethernetList: Array<Ethernet>;
  etherEditMode: boolean = false;

  constructor(
    private mikrotikService: MikrotikService,
    private ethernetService: EthernetService,
    private applicationService: ApplicationService) {
    this.currentEthernet = this.ethernetService.defaultValues();
  }

  ngOnInit(): void {
    this.getApplicationList();
    let myModal = document.querySelector('#mikrotik-form');
    myModal.addEventListener('shown.bs.modal', () => {
      if (this.editMode) {
        this.getEthernetList(this.currentMikrotik._id);
      }
    });
    let basicTab = new bootstrap.Tab(
      document.querySelector('#basic-tab'));
    myModal.addEventListener('hide.bs.modal', () => {
      this.etherEditMode = false;
      this.currentEthernet = this.ethernetService.defaultValues();
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
  getEthernetList(id: string): void {
    this.ethernetService.getEthernetList(id)
      .subscribe(result => this.ethernetList = result);
  }

  // editar interfaz.
  editEthernetClick(id: string): void {
    this.ethernetService.getEthernetById(id)
      .subscribe(result => {
        this.currentEthernet = result;
        this.etherEditMode = true;
      });
  }

  // guardar cambios de la interfaz.
  saveEthernet(): void {
    this.currentEthernet.mikrotikId = this.currentMikrotik._id;
    if (this.etherEditMode) {
      // actualizar interfaz.
      this.ethernetService.updateEthernet(this.currentEthernet)
        .subscribe(() => this.getEthernetList(this.currentMikrotik._id));
    } else {
      // registrar interfaz.
      this.etherEditMode = false;
      delete this.currentEthernet._id;
      this.ethernetService.createEthernet(this.currentEthernet)
        .subscribe(() => {
          this.getEthernetList(this.currentMikrotik._id);
          this.currentEthernet = this.ethernetService.defaultValues();
        });
    }
  }

}
