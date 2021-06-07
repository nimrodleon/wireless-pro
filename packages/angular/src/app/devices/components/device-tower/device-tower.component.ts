import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// Local imports.
import _ from 'lodash';
import { TowerService } from '../../../system/services/tower.service';
import { Tower } from '../../../system/interfaces/tower';

@Component({
  selector: 'app-device-tower',
  templateUrl: './device-tower.component.html',
  styleUrls: ['./device-tower.component.scss']
})
export class DeviceTowerComponent implements OnInit {
  objTree: Array<any>;
  @Output() sendIdObj = new EventEmitter<string>();

  constructor(private towerService: TowerService) {
    this.objTree = new Array<any>();
  }

  ngOnInit(): void {
    this.loadObjTree();
  }

  private loadObjTree(): void {
    let coverages: any;
    let towers: Array<Tower> = new Array<Tower>();
    this.towerService.getCoverages()
      .subscribe(res => {
        coverages = res;
        this.towerService.getTowersV1().subscribe(res => {
          towers = res;
          _.forEach(coverages, value => {
            value.towers = _.filter(towers, obj => obj.coverage === value._id);
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
