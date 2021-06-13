import {Component, Input, OnInit} from '@angular/core';
import {OutagesService} from '../../services';
import {Outage} from '../../interfaces';

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
