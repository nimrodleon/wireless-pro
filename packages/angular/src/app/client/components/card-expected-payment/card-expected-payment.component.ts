import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-expected-payment',
  templateUrl: './card-expected-payment.component.html',
  styleUrls: ['./card-expected-payment.component.scss']
})
export class CardExpectedPaymentComponent implements OnInit {
  @Input() expectedPayment: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
