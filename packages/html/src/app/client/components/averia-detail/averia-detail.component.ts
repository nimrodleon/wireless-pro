import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl} from '@angular/forms';
import * as moment from 'moment';
import {Sweetalert2} from 'src/app/global/interfaces';
import {ServiceDetailService} from '../../services';
import {AveriaService} from 'src/app/averia/services/averia.service';
import {Averia} from 'src/app/averia/interfaces/averia';

declare var bootstrap: any;

@Component({
  selector: 'app-averia-detail',
  templateUrl: './averia-detail.component.html'
})
export class AveriaDetailComponent implements OnInit {
  averiaYearInput: UntypedFormControl = this.fb.control(moment().format('YYYY'));
  titleAveria: string = '';
  averiaModal: any;
  attendAveriaModal: any;
  averias: Array<Averia> = new Array<Averia>();
  currentAveria: Averia;

  constructor(
    private fb: UntypedFormBuilder,
    private serviceDetailService: ServiceDetailService,
    private averiaService: AveriaService,) {
    this.currentAveria = this.averiaService.defaultValues();
  }

  ngOnInit(): void {
    this.getAverias();
    // vincular modal averia.
    this.averiaModal = new bootstrap.Modal(document.querySelector('#app-averia-modal'));
    // vincular modal atender averia.
    this.attendAveriaModal = new bootstrap.Modal(document.querySelector('#app-averia-attend'));
  }

  // id del servicio actual.
  get serviceId() {
    return this.serviceDetailService.serviceId;
  }

  // es rol admin.
  get roleIsAdmin() {
    return this.serviceDetailService.roleIsAdmin;
  }

  // servicio actual.
  get currentService() {
    return this.serviceDetailService.currentService;
  }

  // cliente actual.
  get currentClient() {
    return this.serviceDetailService.currentClient;
  }

  // Lista de averias.
  public getAverias(): void {
    this.averiaService.getAveriasByServiceId(this.serviceId, this.averiaYearInput.value)
      .subscribe(result => this.averias = result);
  }

  // agregar averia.
  public addAveriaClick(): void {
    this.titleAveria = 'Agregar Averia';
    this.currentAveria = this.averiaService.defaultValues();
    this.averiaModal.show();
  }

  // editar averia.
  public editAveriaClick(id: string): void {
    this.titleAveria = 'Editar Averia';
    this.averiaService.getAveria(id).subscribe(result => {
      this.currentAveria = result;
      this.averiaModal.show();
    });
  }

  // atender averia.
  public attendAveriaClick(id: string): void {
    this.averiaService.getAveria(id).subscribe(result => {
      this.currentAveria = result;
      this.attendAveriaModal.show();
    });
  }

  // guardar cambios averia.
  public async saveChangeAveria(data: any) {
    if (data._id === undefined) {
      // registrar averia.
      data.client = this.currentClient._id;
      data.serviceId = this.currentService._id;
      this.averiaService.create(data).subscribe(() => {
        this.averiaModal.hide();
        this.getAverias();
      });
    } else {
      // actualizar averia.
      this.averiaService.update(data).subscribe(() => {
        this.averiaModal.hide();
        this.attendAveriaModal.hide();
        this.getAverias();
      });
    }
  }

  // borrar averia.
  public async deleteAveriaClick(id: string) {
    this.roleIsAdmin.subscribe(result => {
      if (!result) {
        Sweetalert2.accessDenied();
      } else {
        Sweetalert2.deleteConfirm().then(result => {
          if (result.isConfirmed) {
            this.averiaService.delete(id).subscribe(() => {
              this.getAverias();
              Sweetalert2.deleteSuccess();
            });
          }
        });
      }
    });
  }

}
