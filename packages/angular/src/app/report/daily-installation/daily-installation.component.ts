import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-daily-installation',
  templateUrl: './daily-installation.component.html',
  styleUrls: ['./daily-installation.component.scss']
})
export class DailyInstallationComponent implements OnInit {
  createdAt: string;
  installations: any[];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (this.createdAt) {
      this.reportService.getDailyInstallation(this.createdAt).subscribe(res => {
        this.installations = res;
      });
    }
  }

}
