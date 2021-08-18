import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import {Application, Info} from '../../interfaces';
import {ApplicationService, InfoService} from '../../services';

declare var bootstrap: any;

enum AppOption {
  None, Add, Edit
}

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  info: Info;
  Editor = ClassicEditor;
  applicationForm: Application;
  applicationList: Array<Application>;
  titleApplication: string;
  applicationModal: any;
  _appOption: number = AppOption.None;

  constructor(
    private infoService: InfoService,
    private applicationService: ApplicationService) {
    this.info = this.infoService.defaultValues();
    this.applicationForm = this.applicationService.defaultValues();
  }

  ngOnInit(): void {
    this.getInfo();
    this.getApplications();
    this.applicationModal = new bootstrap.Modal(
      document.querySelector('#add-application-modal'));
  }

  // Obtener info.
  private getInfo(): void {
    this.infoService.getInfo().subscribe(res => {
      this.info = res;
    });
  }

  // actualizar info.
  updateInfo(): void {
    this.infoService.update(this.info)
      .subscribe(res => {
        this.info = res;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Actualización correcta!'
        });
      });
  }

  // Lista de aplicaciones.
  getApplications(): void {
    this.applicationService.getApplications()
      .subscribe(result => this.applicationList = result);
  }

  // abrir modal aplicación.
  addApplicationClick(): void {
    this._appOption = AppOption.Add;
    this.titleApplication = 'Agregar Aplicación';
    this.applicationForm = this.applicationService.defaultValues();
    this.applicationModal.show();
  }

  // guardar aplicación.
  saveApplication(): void {
    if (this._appOption === AppOption.Add) {
      this.applicationService.createApplication(this.applicationForm)
        .subscribe(() => {
          this.getApplications();
          this._appOption = AppOption.None;
          this.applicationModal.hide();
        });
    }
    if (this._appOption === AppOption.Edit) {
      this.applicationService.updateApplication(this.applicationForm._id, this.applicationForm)
        .subscribe(() => {
          this.getApplications();
          this._appOption = AppOption.None;
          this.applicationModal.hide();
        });
    }
  }

  // editar aplicación.
  editApplicationClick(appId: string): void {
    this._appOption = AppOption.Edit;
    this.titleApplication = 'Editar Aplicación';
    this.applicationService.getApplicationById(appId).subscribe(result => {
      this.applicationForm = result;
      this.applicationModal.show();
    });
  }

  // borrar aplicación.
  deleteApplication(id: string): void {
    Swal.fire({
      title: 'Seguro de borrar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this.applicationService.deleteApplication(id)
          .subscribe(() => this.getApplications());
      }
    });
  }

}
