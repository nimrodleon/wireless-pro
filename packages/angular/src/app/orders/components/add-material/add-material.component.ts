import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

declare var jQuery: any;
import {environment} from 'src/environments/environment';
import {MaterialService} from 'src/app/system/services';
import {InstallationOrderDetailService, OrderMaterialService} from '../../services';
import {OrderMaterial} from '../../interfaces';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  private baseURL = environment.baseUrl + 'material';
  private orderMaterial: OrderMaterial;
  quantity1: FormControl = this.fb.control(0, [
    Validators.required, Validators.min(0)
  ]);
  invalidMaterialId: boolean = false;
  @Output()
  hideModal = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private orderMaterialService: OrderMaterialService,
    private installationOrderDetailService: InstallationOrderDetailService,
    private materialService: MaterialService) {
    this.orderMaterial = this.orderMaterialService.defaultValues();
  }

  ngOnInit(): void {
    let myModal = document.querySelector('#add-material-modal');
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

  // Orden de instalación actual.
  get currentInstallationOrder() {
    return this.installationOrderDetailService.currentInstallationOrder;
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
            this.orderMaterial.orderId = this.currentInstallationOrder._id;
            this.orderMaterial.price = result.price;
            this.orderMaterial.quantity1 = this.quantity1.value;
            // registrar material de la orden de instalación.
            this.orderMaterialService.addMaterial(this.orderMaterial)
              .subscribe(result => {
                this.installationOrderDetailService.addOrderMaterial(result);
                this.hideModal.emit(true);
              });
          });
      }
    }
  }

}
