import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-disconnected-services',
  templateUrl: './disconnected-services.component.html',
  styleUrls: ['./disconnected-services.component.scss']
})
export class DisconnectedServicesComponent implements OnInit {
  services: any[];
  arrLength: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getDisconnectedServices().subscribe(res => {
      this.services = res;
      this.arrLength = res.length;
    });
  }

}
