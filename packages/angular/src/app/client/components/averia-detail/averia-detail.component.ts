import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import * as moment from 'moment';

declare var bootstrap: any;
import {Service} from '../../interfaces';
import {ServiceService} from '../../services';
import {Sweetalert2} from '../../../global/interfaces';

@Component({
  selector: 'app-averia-detail',
  templateUrl: './averia-detail.component.html',
  styleUrls: ['./averia-detail.component.scss']
})
export class AveriaDetailComponent implements OnInit {
  @Input()
  currentService: Service;
  averiaYearInput: FormControl = this.fb.control(moment().format('YYYY'));
  titleAveria: string = '';
  averiaModal: any;
  attendAveriaModal: any;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,) {
    this.currentService = this.serviceService.defaultValues();
  }

  ngOnInit(): void {
    // vincular modal averia.
    this.averiaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-modal'));
    // vincular modal atender averia.
    this.attendAveriaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-attend'));
  }

  // cargar lista de averias.
  averiaListLoad(): void {
    this.serviceDetailService.getAveriaList(this.currentService._id, this.averiaYearInput.value);
  }

  // agregar averia.
  addAveriaClick(): void {
    this.titleAveria = 'Agregar Averia';
    this.serviceDetailService.setDefaultValueAveria();
    this.averiaModal.show();
  }

  // editar averia.
  editAveriaClick(id: string): void {
    this.titleAveria = 'Editar Averia';
    this.serviceDetailService.getAveriaById(id);
    this.averiaModal.show();
  }

  // atender averia.
  attendAveriaClick(id: string): void {
    this.serviceDetailService.getAveriaById(id);
    this.attendAveriaModal.show();
  }

  // guardar cambios averia.
  async saveChangeAveria(data: any) {
    if (data._id === undefined) {
      // registrar averia.
      data.client = this.currentClient._id;
      data.serviceId = this.currentService._id;
      await this.serviceDetailService.createAveria(data);
      this.averiaModal.hide();
      this.averiaListLoad();
    } else {
      // actualizar averia.
      await this.serviceDetailService.updateAveria(data);
      this.averiaModal.hide();
      this.attendAveriaModal.hide();
      this.averiaListLoad();
    }
  }

  // borrar averia.
  async deleteAveriaClick(id: string) {
    if (this.currentRole !== this.roles.ROLE_ADMIN) {
      await Sweetalert2.accessDenied();
    } else {
      Sweetalert2.deleteConfirm().then(result => {
        if (result.isConfirmed) {
          this.serviceDetailService.deleteAveria(id).subscribe(() => {
            this.averiaListLoad();
            Sweetalert2.deleteSuccess();
          });
        }
      });
    }
  }

}
