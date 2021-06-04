import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {ClientService} from '../../services/client.service';
import {DeviceService} from '../../../devices/device.service';
import {Client} from '../../interfaces/client';
import {Service} from '../../interfaces/service';
import {Device} from '../../../devices/device.model';
import {ActivatedRoute} from '@angular/router';
import {ServicePlanService} from '../../services/service-plan.service';
import {ServicePlan} from '../../interfaces/service-plan';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  serviceId: string;
  // Variables for Service use.
  client: Client = new Client();
  service: Service = new Service();
  device: Device = new Device();
  servicePlan: ServicePlan = new ServicePlan();

  // Class constructor.
  constructor(private activatedRoute: ActivatedRoute,
              private clientService: ClientService, private serviceService: ServiceService,
              private deviceService: DeviceService, private servicePlanService: ServicePlanService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
      if (this.serviceId) {
        this.getService(this.serviceId);
      }
    });
  }

  // get service data.
  private getService(id: string): void {
    this.serviceService.getService(id).subscribe(res => {
      this.service = res;
      // Load client and device data.
      this.getClient(this.service.client);
      this.getServicePlan(this.service.servicePlan);
      if (this.service.accessPoint) {
        this.getDevice(this.service.accessPoint);
      }
    });
  }

  // get client data.
  private getClient(id: string): void {
    this.clientService.getClient(id).subscribe(res => this.client = res);
  }

  // get service-plan data.
  private getServicePlan(id: string): void {
    this.servicePlanService.getServicePlan(id).subscribe(res => this.servicePlan = res);
  }

  // get device data.
  private getDevice(id: string): void {
    this.deviceService.getDevice(id).subscribe(res => this.device = res);
  }

}
