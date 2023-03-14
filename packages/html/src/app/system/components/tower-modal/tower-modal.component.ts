import {Component, OnInit, Input, Output, EventEmitter} from '@html/core';
import {Coverage} from 'src/app/system/interfaces/coverage';
import {CoverageService} from 'src/app/system/services/coverage.service';
import {Tower} from '../../interfaces';
import {TowerService} from '../../services';

declare var jQuery: any;

@Component({
  selector: 'app-tower-modal',
  templateUrl: './tower-modal.component.html',
  styleUrls: ['./tower-modal.component.scss']
})
export class TowerModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() tower: Tower;
  coverages: Array<Coverage>;
  @Output() sendModel = new EventEmitter<Tower>();

  constructor(
    private coverageService: CoverageService,
    private towerService: TowerService) {
    this.coverages = new Array<Coverage>();
    this.tower = this.towerService.defaultValues();
  }

  ngOnInit(): void {
    jQuery('#app-tower-modal').on('shown.bs.modal', () => {
      this.getCoverages();
    });
  }

  private getCoverages(): void {
    this.coverageService.getCoverages()
      .subscribe(res => this.coverages = res);
  }

  saveChanges(): void {
    this.sendModel.emit(this.tower);
    jQuery('#app-tower-modal').modal('hide');
  }

}
