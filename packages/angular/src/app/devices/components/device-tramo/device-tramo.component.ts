import {Component, OnInit} from '@angular/core';

// import _ from 'lodash';
// import {TramoService} from '../../../system/services/tramo.service';
// import {Tramo} from '../../../system/interfaces/tramo';
import {DeviceListService} from '../../services/device-list.service';

// import {Coverage} from '../../../system/interfaces/coverage';

@Component({
  selector: 'app-device-tramo',
  templateUrl: './device-tramo.component.html',
  styleUrls: ['./device-tramo.component.scss']
})
export class DeviceTramoComponent implements OnInit {
  // objTree: Array<any>;
  // @Output() sendIdObj = new EventEmitter<string>();

  // constructor(private tramoService: TramoService) {
  //   this.objTree = new Array<any>();
  // }

  constructor(private deviceListService: DeviceListService) {
  }

  ngOnInit(): void {
  }

  get coverages() {
    return this.deviceListService.coverages;
  }

  get currentTramoId() {
    return this.deviceListService.currentTramoId;
  }

  coverageItemClick(event): void {
    const target = event.target;
    target.classList.toggle('TreeCoverageItemHover');
  }

  tramoItemClick(event): void {
    const target = event.target;
    const oldTramoItem = document.getElementById(this.currentTramoId);
    // item tramo anterior.
    if (oldTramoItem) {
      oldTramoItem.classList.remove('font-weight-bold', 'text-success');
    }
    this.deviceListService.setCurrentTramoId(target.id);
    target.classList.add('font-weight-bold', 'text-success');
    // cargar equipos en la tabla.
    console.log(target.id);
  }

  // private loadObjTree(): void {
  //   let coverages: any;
  //   let tramos: Array<Tramo> = new Array<Tramo>();
  //   this.tramoService.getCoverages()
  //     .subscribe(res => {
  //       coverages = res;
  //       console.log(res);
  //       // this.tramoService.getTramosV1().subscribe(res => {
  //       //   tramos = res;
  //       //   _.forEach(coverages, value => {
  //       //     value.tramos = _.filter(tramos, obj => obj.coverage === value._id);
  //       //     this.objTree.push(value);
  //       //   });
  //       //   console.log(this.objTree);
  //       // });
  //       this.tramoService.getTramos('').subscribe(res => {
  //         tramos = res;
  //         _.forEach(coverages, value => {
  //           value.tramos = _.filter(tramos, obj => obj.coverage === value._id);
  //           this.objTree.push(value);
  //         });
  //         console.log(this.objTree);
  //       });
  //     });
  // }
  //
  // objTreeItem(event): void {
  //   const target = event.target;
  //   target.classList.toggle('objtree-item--hover');
  //
  // }
  //
  // subTreeItem(event): void {
  //   const target = event.target;
  //   this.sendIdObj.emit(target.id);
  //   console.log(target.id);
  // }

}
