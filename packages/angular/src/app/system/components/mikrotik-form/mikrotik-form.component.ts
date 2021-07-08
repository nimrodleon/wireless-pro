import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../interfaces';
import {ApplicationService, EthernetService, InfoService, MikrotikService} from '../../services';

@Component({
  selector: 'app-mikrotik-form',
  templateUrl: './mikrotik-form.component.html',
  styleUrls: ['./mikrotik-form.component.scss']
})
export class MikrotikFormComponent implements OnInit {
  @Input()
  editMode: boolean;
  @Input()
  currentMikrotik;
  title: string;
  applicationList: Array<Application>;

  constructor(
    private mikrotikService: MikrotikService,
    private ethernetService: EthernetService,
    private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.getApplicationList();
    let myModal = document.querySelector('#mikrotik-form');
    myModal.addEventListener('show.bs.modal', () => {
      if (this.editMode === false) {
        // this.currentMikrotik = this.mikrotikService.defaultValues();
        this.title = 'Agregar Mikrotik';
      } else {
        this.title = 'Editar Mikrotik';
      }
    });
  }

  // Lista de aplicaciones.
  getApplicationList(): void {
    this.applicationService.getApplications()
      .subscribe(result => this.applicationList = result);
  }

}
