import { Component, OnInit } from '@angular/core';
import {Service} from '../../interfaces';
import {ServiceService} from '../../services';

@Component({
  selector: 'app-temporal-services',
  templateUrl: './temporal-services.component.html',
  styleUrls: ['./temporal-services.component.scss']
})
export class TemporalServicesComponent implements OnInit {
  servicesList: any;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    // cargar servicios temporales.
    this.serviceService.getTemporalServices()
      .subscribe(result => this.servicesList = result);
  }

}
