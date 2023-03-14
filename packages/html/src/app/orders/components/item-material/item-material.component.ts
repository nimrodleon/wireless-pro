import {Component, EventEmitter, Input, OnInit, Output} from '@html/core';
import {FormBuilder, FormGroup, Validators} from '@html/forms';
import {OrderMaterial} from '../../interfaces';
import {OrderMaterialService} from '../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-material',
  templateUrl: './item-material.component.html',
  styleUrls: ['./item-material.component.scss']
})
export class ItemMaterialComponent implements OnInit {
  @Input()
  orderMaterial: OrderMaterial;
  orderMaterialFg: FormGroup = this.fb.group({
    _id: [null],
    orderId: [''],
    materialId: [''],
    description: [''],
    quantity1: [0],
    quantity2: [0, Validators.min(0)],
    price: [0, Validators.min(0)],
    difference: [0],
    total: [0],
  });
  @Output()
  hideModal = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private orderMaterialService: OrderMaterialService) {
    this.orderMaterial = this.orderMaterialService.defaultValues();
  }

  ngOnInit(): void {
    this.orderMaterialFg.valueChanges
      .subscribe(value => {
        value.difference = value.quantity1 - value.quantity2;
        value.total = value.difference * value.price;
        this.orderMaterial = value;
      });
    let myModal: any = document.querySelector('#item-material-modal');
    myModal.addEventListener('shown.bs.modal', () => {
      this.orderMaterialFg.reset({...this.orderMaterial});
    });
    myModal.addEventListener('hide.bs.modal', () => {
      this.orderMaterialFg.reset();
    });
  }

  // Verificar campo invalido.
  inputIsInvalid(field: string) {
    return this.orderMaterialFg.controls[field].errors
      && this.orderMaterialFg.controls[field].touched;
  }

  // guardar cambios.
  saveChanges(): void {
    if (this.orderMaterialFg.invalid) {
      this.orderMaterialFg.markAllAsTouched();
      return;
    }
    this.orderMaterialService.updateMaterial(this.orderMaterial)
      .subscribe(() => this.hideModal.emit(true));
  }

  // borrar material.
  deleteOrderMaterial(): void {
    Swal.fire({
      title: '¿Estás seguro de borrar?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        this.orderMaterialService.deleteMaterial(this.orderMaterial._id)
          .subscribe(() => this.hideModal.emit(true));
      }
    });
  }

}
