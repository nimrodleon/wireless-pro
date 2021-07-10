import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

declare var jQuery: any;
import {ServiceService} from '../../services';
import {Service} from '../../interfaces';
import {environment} from 'src/environments/environment';
import {CoverageService, EthernetService, MikrotikService, ServicePlanService} from 'src/app/system/services';
import {Coverage, Ethernet, Mikrotik, ServicePlan} from 'src/app/system/interfaces';

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
    ipAddress: ['', [Validators.required,
      Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')]
    ],
    status: ['H', [Validators.required]],
    servicePlanId: ['', [Validators.required]],
    initialDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
    mikrotikId: ['', [Validators.required]],
    ethernetId: ['', [Validators.required]],
    userName: [''],
    password: [''],
    basicNote: [''],
    accessPoint: [''],
    macAddress: [''],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    region: ['', [Validators.required]],
    coverageId: ['', [Validators.required]],
    paymentType: ['PRE'],
    defPrice: [false],
    price: [0],
    commonPayment: ['M'],
    paymentNote: [''],
  });
  servicePlanList: Array<ServicePlan>;
  mikrotikList: Array<Mikrotik>;
  ethernetList: Array<Ethernet>;
  coverageList: Array<Coverage>;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private servicePlanService: ServicePlanService,
    private mikrotikService: MikrotikService,
    private ethernetService: EthernetService,
    private coverageService: CoverageService) {
  }

  ngOnInit(): void {
    // cargar lista de planes de servicio.
    this.servicePlanService.getServicePlans('')
      .subscribe(result => this.servicePlanList = result);
    // cargar lista de mikrotik.
    this.mikrotikService.getMikrotikList()
      .subscribe(result => this.mikrotikList = result);
    // cargar lista de coberturas.
    this.coverageService.getCoverages('')
      .subscribe(result => this.coverageList = result);
    // suscribir modelo al formulario.
    this.serviceForm.valueChanges.subscribe(value => this.currentService = value);
    // escuchar eventos del modal.
    let accessPoint = jQuery('select[name="accessPoint');
    let myModal = document.querySelector('#service-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      accessPoint.select2({
        theme: 'bootstrap-5',
        dropdownParent: jQuery('#service-modal'),
        ajax: {
          url: this.baseURL + '/v1/select2/s',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      }).on('select2:select', (e) => {
        let {data} = e.params;
        this.currentService.accessPoint = data.id;
        this.serviceForm.reset({...this.currentService});
      });
      // Preselecting options in an remotely-sourced.
      // si existe access point cargar datos al accessPoint.
    });
    myModal.addEventListener('hide.bs.modal', () => {
      this.serviceForm.reset({...this.serviceService.defaultValues()});
      accessPoint.val(null).trigger('change');
    });
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.serviceForm.controls[field].errors
      && this.serviceForm.controls[field].touched;
  }

  // cargar lista de interfaces.
  getEthernetList(mikrotikId: string): void {
    this.ethernetService.getEthernetList(mikrotikId)
      .subscribe(result => this.ethernetList = result);
  }

  // seleccionar item mikrotik select.
  changeMikrotikValue(target: any): void {
    this.currentService.ethernetId = '';
    this.serviceForm.setValue({...this.currentService});
    this.getEthernetList(target.value);
  }

  // guardar cambios.
  saveChanges(): void {
    // validar campos del formulario.
    if(this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }
    // Guardar datos, sólo si es válido el formulario.

  }

}
