import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {Payment, PrintPayment, Service} from '../../interfaces';
import {PaymentService} from '../../services';
import {ServicePlan} from 'src/app/system/interfaces';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  currentService: Service;
  @Input()
  currentServicePlan: ServicePlan;
  @Output()
  hideModal = new EventEmitter<PrintPayment>();
  // ============================================================
  paymentForm: FormGroup = this.paymentService.formGroup();
  printReceipt: FormControl = this.fb.control(false);
  // ============================================================
  payment: Payment = this.paymentService.defaultValues();

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.paymentForm.valueChanges
      .subscribe(value => this.payment = value);
    // eventos del modal.
    let myModal = document.querySelector('#payment-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      this.payment.clientId = this.currentService.clientId;
      this.payment.serviceId = this.currentService._id;
      this.payment.year = moment().format('YYYY');
      this.payment.month = moment().format('MM');
      this.payment.amount = this.currentServicePlan.priceMonthly;
      this.payment.paymentMethod = 'CAJA';
      if (this.currentService.status
        && this.currentService.status !== 'H') {
        this.paymentForm.reset(this.payment);
      } else {
        if (this.currentService['lastPayment']
          && this.currentService['lastPayment'].length > 0) {
          this.paymentService.getPaymentById(this.currentService['lastPayment'])
            .subscribe(result => {
              this.payment.payFrom = result.payUp;
              this.payment.payUp = moment(this.payment.payFrom).add(1, 'M').format('YYYY-MM-DD');
              this.paymentForm.reset(this.payment);
            });
        } else {
          this.paymentForm.reset(this.payment);
        }
      }
    });
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.paymentForm.controls[field].errors
      && this.paymentForm.controls[field].touched;
  }

  // Save change payment.
  saveChanges(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    // Guardar datos, sólo si es válido el formulario.
    delete this.payment._id;
    delete this.payment.user;
    delete this.payment.createdAt;
    this.paymentService.createPayment(this.payment)
      .subscribe(result => {
        this.hideModal.emit({
          paymentId: result._id,
          printReceipt: this.printReceipt.value,
          hideModal: true
        });
      });
  }

}
