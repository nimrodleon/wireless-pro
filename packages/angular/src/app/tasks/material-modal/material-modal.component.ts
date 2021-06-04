import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
// Local Imports.
declare var jQuery: any;
import { Material } from '../material.model';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.scss']
})
export class MaterialModalComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  material: Material;

  @Output()
  sendModel = new EventEmitter<Material>();

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.sendModel.emit(this.material);
    jQuery('#app-material-modal').modal('hide');
  }

}
