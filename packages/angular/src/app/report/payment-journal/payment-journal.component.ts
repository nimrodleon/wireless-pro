import { Component, OnInit } from '@angular/core';

import _ from 'lodash';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-payment-journal',
  templateUrl: './payment-journal.component.html',
  styleUrls: ['./payment-journal.component.scss']
})
export class PaymentJournalComponent implements OnInit {
  createdAt: string;
  payments: any[];
  arrLength: number = 0;
  totalAmount: number = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  // Filtra la Busqueda.
  onSearch(): void {
    if (this.createdAt) {
      this.reportService.getPaymentJournal(this.createdAt)
        .subscribe(res => {
          this.payments = res;
          this.arrLength = res.length;
          this.sumByAmount(res);
        });
      console.log(this.payments);
    }
  }

  // Suma el Importe Total.
  private sumByAmount(obj): void {
    this.totalAmount = _.sumBy(obj, (item) => item.amount);
  }

}
