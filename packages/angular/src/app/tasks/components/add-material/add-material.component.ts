import {Component, OnInit, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import Swal from 'sweetalert2';
import {MaterialService} from '../../../system/services/material.service';
import {Material} from '../../../system/interfaces/material';
import {TaskMaterial} from '../../interfaces/task-material';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  materials: Array<Material>;
  taskMaterial: TaskMaterial = new TaskMaterial();

  @Output()
  sendModel = new EventEmitter<TaskMaterial>();

  constructor(private materialService: MaterialService) {
    this.materials = new Array<Material>();
  }

  ngOnInit(): void {
    jQuery('#app-add-material').on('show.bs.modal', (event) => {
      this.materialService.getMaterials().subscribe(res => this.materials = res);
      this.taskMaterial = new TaskMaterial();
    });
  }

  saveChanges(): void {
    if (!this.taskMaterial.material) {
      Swal.fire('Seleccione un Material!');
    } else {
      if (!this.taskMaterial.quantity1) {
        Swal.fire('Ingrese la Cantidad!');
      } else {
        this.taskMaterial.quantity2 = 0;
        this.taskMaterial.difference = this.taskMaterial.quantity1 - this.taskMaterial.quantity2;
        this.materialService.getMaterial(this.taskMaterial.material).subscribe(res => {
          this.taskMaterial.price = res.price;
          this.taskMaterial.total = this.taskMaterial.quantity2 * this.taskMaterial.price;
          this.sendModel.emit(this.taskMaterial);
          jQuery('#app-add-material').modal('hide');
        });
      }
    }
  }

}
