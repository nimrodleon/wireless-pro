import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { ReportService } from '../report.service';
import { ServicePlan } from 'src/app/client/service-plan.model';
import { ServicePlanService } from 'src/app/client/service-plan.service';

@Component({
  selector: 'app-number-of-devices',
  templateUrl: './number-of-devices.component.html',
  styleUrls: ['./number-of-devices.component.scss']
})
export class NumberOfDevicesComponent implements OnInit {
  devices: any[];
  servicePlans: ServicePlan[];
  servicePlanId: string;
  lengthDevices: number = 0;

  constructor(private reportService: ReportService, private servicePlanService: ServicePlanService) { }

  ngOnInit(): void {
    this.servicePlanService.getServicePlans().subscribe(res => this.servicePlans = res);
  }

  onSearch(): void {
    if (!this.servicePlanId) {
      Swal.fire('Seleccione un Plan de Servicio');
    } else {
      this.reportService.getCustomersByServicePlan(this.servicePlanId).subscribe(res => {
        this.devices = res;
        this.lengthDevices = res.length;
      });
      console.log(this.devices);
    }
  }

}
