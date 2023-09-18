import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Material} from '../../interfaces';
import {MaterialService} from '../../services';

declare var jQuery: any;

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html'
})
export class MaterialModalComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  material: Material;

  @Output()
  sendModel = new EventEmitter<Material>();

  constructor(private materialService: MaterialService) {
    this.material = this.materialService.defaultValues();
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.sendModel.emit(this.material);
    jQuery('#app-material-modal').modal('hide');
  }

}
