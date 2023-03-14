import {Component, EventEmitter, Input, OnInit, Output} from '@html/core';
import {FormBuilder, FormControl, FormGroup} from '@html/forms';
import * as moment from 'moment';
import {Payment, PrintPayment, Service} from '../../interfaces';
import {PaymentService, ServiceService} from '../../services';
import {ServicePlan} from 'src/app/system/interfaces';
import {ServicePlanService} from 'src/app/system/services';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {
  @Input()
  title: string = '';
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
    private serviceService: ServiceService,
    private servicePlanService: ServicePlanService,
    private paymentService: PaymentService) {
    this.currentService = this.serviceService.defaultValues();
    this.currentServicePlan = this.servicePlanService.defaultValues();
  }

  ngOnInit(): void {
    this.paymentForm.valueChanges
      .subscribe(value => this.payment = value);
    // eventos del modal.
    let myModal: any = document.querySelector('#payment-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      this.payment.clientId = this.currentService.clientId;
      this.payment.serviceId = this.currentService._id;
      this.payment.year = moment().format('YYYY');
      this.payment.month = moment().format('MM');
      this.payment.amount = this.currentService.defPrice ? this.currentService.price : this.currentServicePlan.priceMonthly;
      this.payment.paymentMethod = 'CAJA';
      if (this.currentService.status
        && this.currentService.status !== 'HABILITADO') {
        this.paymentForm.reset(this.payment);
      } else {
        // siempre que estado del servicio sea habilitado,
        // calcular automáticamente la fecha de pago a realizar.
        // @ts-ignore
        if (!this.currentService['lastPayment']) {
          this.paymentForm.reset(this.payment);
        } else {
          // @ts-ignore
          if (this.currentService['lastPayment'].length > 0) {
            // @ts-ignore
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
    // @ts-ignore
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
