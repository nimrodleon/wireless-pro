import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InfoService, ServicePlanService} from 'src/app/system/services';
import {InstallationOrderService} from '../../services';
import {Info, ServicePlan} from 'src/app/system/interfaces';
import {InstallationOrder} from '../../interfaces';
import {Client} from '../../../client/interfaces';
import {ClientService} from '../../../client/services';

@Component({
  selector: 'app-installation-ticket',
  templateUrl: './installation-ticket.component.html',
  styleUrls: ['./installation-ticket.component.scss']
})
export class InstallationTicketComponent implements OnInit {
  info: Info;
  installationOrder: InstallationOrder;
  servicePlan: ServicePlan;
  client: Client;

  constructor(
    private activatedRoute: ActivatedRoute,
    private infoService: InfoService,
    private installationOrderService: InstallationOrderService,
    private servicePlanService: ServicePlanService,
    private clientService: ClientService) {
    // Valores por defecto.
    this.info = this.infoService.defaultValues();
    this.installationOrder = this.installationOrderService.defaultValues();
    this.servicePlan = this.servicePlanService.defaultValues();
    this.client = this.clientService.defaultValues();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.installationOrderService.getInstallationOrderById(params.get('id'))
        .subscribe(result => {
          this.installationOrder = result;
          this.servicePlanService.getServicePlan(result.servicePlanId)
            .subscribe(result => this.servicePlan = result);
          this.clientService.getClientById(result.clientId)
            .subscribe(result => this.client = result);
        });
    });
    // Información empresa.
    this.infoService.getInfo()
      .subscribe(result => this.info = result);
  }

  // Imprimir ventana.
  print(): void {
    window.print();
  }

}
