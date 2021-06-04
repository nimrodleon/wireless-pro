import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../interfaces/service';
import {OutagesService} from '../../services/outages.service';
import {Outage} from '../../interfaces/outage';

@Component({
  selector: 'app-card-outages',
  templateUrl: './card-outages.component.html',
  styleUrls: ['./card-outages.component.scss']
})
export class CardOutagesComponent implements OnInit {
  @Input()
  serviceId: string;
  outages: Array<Outage> = new Array<Outage>();

  constructor(private outageService: OutagesService) {
  }

  ngOnInit(): void {
    if (this.serviceId) {
      this.outageService.getOutages(this.serviceId)
        .subscribe(res => this.outages = res);
    }
  }

}
