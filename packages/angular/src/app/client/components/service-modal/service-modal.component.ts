import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

declare var jQuery: any;
import {ServiceService} from '../../services';
import {Service} from '../../interfaces';
import {environment} from 'src/environments/environment';
import {CoverageService, InterfaceService, MikrotikService, ServicePlanService} from 'src/app/system/services';
import {Coverage, Interface, Mikrotik, ServicePlan} from 'src/app/system/interfaces';
import {DeviceService} from 'src/app/devices/services';
import {Sweetalert2} from 'src/app/global/interfaces';

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
  @Output()
  hideModal = new EventEmitter<boolean>();
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
    interfaceId: ['', [Validators.required]],
    userName: [''],
    password: [''],
    basicNote: [''],
    accessPoint: ['', [Validators.required]],
    macAddress: ['00:00:00:00:00:00', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    region: ['', [Validators.required]],
    coverageId: ['', [Validators.required]],
    paymentType: ['PRE'],
    defPrice: [false],
    price: [0, [Validators.required, Validators.min(0)]],
    commonPayment: ['M'],
    paymentNote: [''],
  });
  servicePlanList: Array<ServicePlan>;
  mikrotikList: Array<Mikrotik>;
  interfaceList: Array<Interface>;
  coverageList: Array<Coverage>;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private servicePlanService: ServicePlanService,
    private mikrotikService: MikrotikService,
    private ethernetService: InterfaceService,
    private coverageService: CoverageService,
    private deviceService: DeviceService) {
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
      // cargar lista de interfaces.
      this.getInterfaceList(this.currentService.mikrotikId);
      // cargar valores al formulario.
      this.serviceForm.reset({...this.currentService});
      // accessPoint select2 component.
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
      if (this.currentService._id
        && this.currentService.accessPoint) {
        this.deviceService.getDevice(this.currentService.accessPoint)
          .subscribe(result => {
            const option = new Option(result.name + ' - '
              + result.ipAddress, result._id, true, true);
            accessPoint.append(option).trigger('change');
          });
      }
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
  getInterfaceList(mikrotikId: string): void {
    this.ethernetService.getInterfaceList(mikrotikId)
      .subscribe(result => this.interfaceList = result);
  }

  // seleccionar item mikrotik select.
  changeMikrotikValue(target: any): void {
    this.currentService.interfaceId = '';
    this.serviceForm.setValue({...this.currentService});
    this.getInterfaceList(target.value);
  }

  // guardar cambios.
  saveChanges(): void {
    // validar campos del formulario.
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }
    // Confirmar guardar cambios.
    Sweetalert2.messageConfirm().then(result => {
      if (result.isConfirmed) {
        // Guardar datos, sólo si es válido el formulario.
        if (this.currentService._id === null) {
          // registrar servicio.
          delete this.currentService._id;
          this.serviceService.createService(this.currentService)
            .subscribe(() => this.hideModal.emit(true));
        } else {
          // actualizar servicio.
          this.serviceService.updateService(this.currentService)
            .subscribe(() => this.hideModal.emit(true));
        }
      }
    });
  }

}
