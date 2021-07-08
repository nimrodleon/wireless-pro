import {Component, OnInit} from '@angular/core';
import {MikrotikService} from '../../services';
import {Mikrotik} from '../../interfaces';

declare var jQuery: any;
declare var bootstrap: any;

@Component({
  selector: 'app-mikrotik-list',
  templateUrl: './mikrotik-list.component.html',
  styleUrls: ['./mikrotik-list.component.scss']
})
export class MikrotikListComponent implements OnInit {
  mikrotikModal: any;
  currentMikrotik: Mikrotik;
  mikrotikList: Array<Mikrotik>;
  editMode: boolean = false;

  constructor(
    private mikrotikService: MikrotikService) {
    // establecer valores por defecto.
    this.currentMikrotik = this.mikrotikService.defaultValues();
  }

  ngOnInit(): void {
    // Establecer modal mikrotik form.
    this.mikrotikModal = new bootstrap.Modal(
      document.querySelector('#mikrotik-form'));
    this.getMikrotikList();
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
    this.mikrotikModal.show();
  }

}
