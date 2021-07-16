import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

declare var bootstrap: any;
import {ServiceDetailService} from '../../services';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  titleService: string;
  serviceModal: any;
  // ============================================================
  averiaYearInput: FormControl = this.fb.control(moment().format('YYYY'));
  titleAveria: string;
  averiaModal: any;
  attendAveriaModal: any;
  // ============================================================
  paymentYearInput: FormControl = this.fb.control(moment().format('YYYY'));

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private serviceDetailService: ServiceDetailService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceDetailService.getCurrentService(params.get('id'));
      this.serviceDetailService.getAveriaList(params.get('id'), this.averiaYearInput.value);
      this.serviceDetailService.getPaymentList(params.get('id'), this.paymentYearInput.value);
    });
    // vincular modal servicios.
    this.serviceModal = new bootstrap.Modal(
      document.querySelector('#service-modal'));
    // vincular modal averia.
    this.averiaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-modal'));
    // vincular modal atender averia.
    this.attendAveriaModal = new bootstrap.Modal(
      document.querySelector('#app-averia-attend'));
  }

  // servicio actual.
  get currentService() {
    return this.serviceDetailService.currentService;
  }

  // cliente actual.
  get currentClient() {
    return this.serviceDetailService.currentClient;
  }

  // plan de servicio actual.
  get currentServicePlan() {
    return this.serviceDetailService.currentServicePlan;
  }

  // Lista de averias.
  get averiaList() {
    return this.serviceDetailService.averiaList;
  }

  // averia actual.
  get currentAveria() {
    return this.serviceDetailService.currentAveria;
  }

  // lista de averias.
  get paymentList() {
    return this.serviceDetailService.paymentList;
  }

  // retornar nombre del mes.


  // editar servicio modal.
  editServiceModal(): void {
    this.titleService = 'Editar Servicio';
    this.serviceModal.show();
  }

  // cerrar modal servicios.
  hideServiceModal(value: boolean): void {
    if (value === true) {
      this.serviceDetailService.getCurrentService(this.currentService._id);
      this.serviceModal.hide();
    }
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

  // cargar lista de pagos.
  getPaymentList(): void {
    this.serviceDetailService.getPaymentList(this.currentService._id, this.paymentYearInput.value);
  }

}
