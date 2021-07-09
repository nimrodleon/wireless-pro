import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';

declare var jQuery: any;
import {ServiceService} from '../../services';
import {Service} from '../../interfaces';
import {environment} from 'src/environments/environment';
import {EthernetService, MikrotikService, ServicePlanService} from 'src/app/system/services';
import {Ethernet, Mikrotik, ServicePlan} from 'src/app/system/interfaces';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  currentService: Service;
  // ============================================================
  baseURL: string = environment.baseUrl + 'devices';
  serviceForm: FormGroup = this.fb.group({
    _id: [null],
    clientId: [''],
    ipAddress: [''],
    status: ['H'],
    servicePlanId: '',
    initialDate: [moment().format('YYYY-MM-DD')],
    mikrotikId: [''],
    ethernetId: [''],
    userName: [''],
    password: [''],
    basicNote: [''],
    accessPoint: [''],
    macAddress: [''],
    address: [''],
    city: [''],
    region: [''],
    coverageId: [''],
    paymentType: ['PRE'],
    defPrice: [false],
    price: [0],
    commonPayment: ['M'],
    paymentNote: [''],
  });
  servicePlanList: Array<ServicePlan>;
  mikrotikList: Array<Mikrotik>;
  ethernetList: Array<Ethernet>;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private servicePlanService: ServicePlanService,
    private mikrotikService: MikrotikService,
    private ethernetService: EthernetService) {
  }

  ngOnInit(): void {
    // cargar lista de planes de servicio.
    this.servicePlanService.getServicePlans('')
      .subscribe(result => this.servicePlanList = result);
    // cargar lista de mikrotik.
    this.mikrotikService.getMikrotikList()
      .subscribe(result => this.mikrotikList = result);
    // escuchar eventos del modal.
    let myModal = document.querySelector('#service-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      jQuery('select[name="accessPoint').select2({
        theme: 'bootstrap4',
        dropdownParent: jQuery('#service-modal'),
        ajax: {
          url: this.baseURL + '/v1/select2/s',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      });
    });
    myModal.addEventListener('hide.bs.modal', () => {
      this.serviceForm.reset();
    });
  }

  // cargar lista de interfaces.
  getEthernetList(mikrotikId: string): void {
    this.ethernetService.getEthernetList(mikrotikId)
      .subscribe(result => this.ethernetList = result);
  }

  // seleccionar item mikrotik select.
  changeMikrotikValue(target: any): void {
    console.log(target.value);
    this.getEthernetList(target.value);
  }

}
