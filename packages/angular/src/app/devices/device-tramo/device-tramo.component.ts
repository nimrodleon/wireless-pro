import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Local imports.
import _ from 'lodash';
import { TramoService } from '../tramo.service';
import { Tramo } from '../tramo.model';

@Component({
  selector: 'app-device-tramo',
  templateUrl: './device-tramo.component.html',
  styleUrls: ['./device-tramo.component.scss']
})
export class DeviceTramoComponent implements OnInit {
  objTree: Array<any>;
  @Output() sendIdObj = new EventEmitter<string>();

  constructor(private tramoService: TramoService) {
    this.objTree = new Array<any>();
  }

  ngOnInit(): void {
    this.loadObjTree();
  }

  private loadObjTree(): void {
    let coverages: any;
    let tramos: Array<Tramo> = new Array<Tramo>();
    this.tramoService.getCoverages()
      .subscribe(res => {
        coverages = res;
        this.tramoService.getTramosV1().subscribe(res => {
          tramos = res;
          _.forEach(coverages, value => {
            value.tramos = _.filter(tramos, obj => obj.coverage === value._id);
            this.objTree.push(value);
          });
          console.log(this.objTree);
        });
      });
  }

  objTreeItem(event): void {
    const target = event.target;
    target.classList.toggle('objtree-item--hover');

  }

  subTreeItem(event): void {
    const target = event.target;
    this.sendIdObj.emit(target.id);
    console.log(target.id);
  }


}
