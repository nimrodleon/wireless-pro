import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {MaterialService} from 'src/app/system/services';
import {WorkOrderDetailService, OrderMaterialService} from '../../services';
import {OrderMaterial} from '../../interfaces';

declare var jQuery: any;

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html'
})
export class AddMaterialComponent implements OnInit {
  private baseURL = environment.baseUrl + 'material';
  private orderMaterial: OrderMaterial;
  quantity1: UntypedFormControl = this.fb.control(0, [
    Validators.required, Validators.min(0)
  ]);
  invalidMaterialId: boolean = false;
  @Output()
  hideModal = new EventEmitter<boolean>();

  constructor(
    private fb: UntypedFormBuilder,
    private orderMaterialService: OrderMaterialService,
    private workOrderDetailService: WorkOrderDetailService,
    private materialService: MaterialService) {
    this.orderMaterial = this.orderMaterialService.defaultValues();
  }

  ngOnInit(): void {
    let myModal: any = document.querySelector('#add-material-modal');
    myModal.addEventListener('show.bs.modal', () => {
      jQuery('#searchMaterial').select2({
        theme: 'bootstrap-5',
        dropdownParent: jQuery('#add-material-modal'),
        ajax: {
          url: this.baseURL + '/select2/s',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      }).val(null).trigger('change')
        .on('select2:select', () => this.searchMaterialOnChange());
    });
    myModal.addEventListener('hide.bs.modal', () => {
      this.invalidMaterialId = false;
      this.quantity1.reset(0);
      this.orderMaterial = this.orderMaterialService.defaultValues();
    });
  }

  // Orden de trabajo actual.
  get currentWorkOrder() {
    return this.workOrderDetailService.currentWorkOrder;
  }

  // cambiar item select2.
  searchMaterialOnChange(): void {
    this.invalidMaterialId = jQuery('#searchMaterial').val() === null;
  }

  // guardar cambios.
  addMaterial(): void {
    let materialId = jQuery('#searchMaterial').val();
    if (materialId === null) {
      this.invalidMaterialId = true;
    } else {
      // guardar material.
      if (this.quantity1.valid === true) {
        this.invalidMaterialId = false;
        this.materialService.getMaterial(materialId)
          .subscribe(result => {
            this.orderMaterial.materialId = result._id;
            this.orderMaterial.description = result.description;
            this.orderMaterial.orderId = this.currentWorkOrder._id;
            this.orderMaterial.price = result.price;
            this.orderMaterial.quantity1 = this.quantity1.value;
            // registrar material de la orden de instalación.
            this.orderMaterialService.addMaterial(this.orderMaterial)
              .subscribe(result => {
                this.workOrderDetailService.addOrderMaterial(result);
                this.hideModal.emit(true);
              });
          });
      }
    }
  }

}
