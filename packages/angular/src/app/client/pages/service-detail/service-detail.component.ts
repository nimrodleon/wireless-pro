import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceDetailService: ServiceDetailService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceDetailService.getCurrentService(params.get('id'));
    });
    // vincular modal servicios.
    this.serviceModal = new bootstrap.Modal(
      document.querySelector('#service-modal'));
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

}
