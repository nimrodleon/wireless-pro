import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-services-without-payment',
  templateUrl: './services-without-payment.component.html',
  styleUrls: ['./services-without-payment.component.scss']
})
export class ServicesWithoutPaymentComponent implements OnInit {
  services: any[];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getServicesWithoutPayment().subscribe(res => this.services = res);
  }

}
