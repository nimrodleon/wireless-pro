import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coverage } from 'src/app/client/interfaces/coverage';
import { CoverageService } from 'src/app/client/services/coverage.service';
import { Tower } from '../tower.model';

declare var jQuery: any;

@Component({
  selector: 'app-tower-modal',
  templateUrl: './tower-modal.component.html',
  styleUrls: ['./tower-modal.component.scss']
})
export class TowerModalComponent implements OnInit {
  @Input() title: string;
  @Input() tower: Tower;
  coverages: Array<Coverage>;
  @Output() sendModel = new EventEmitter<Tower>();

  constructor(private coverageService: CoverageService) {
    this.coverages = new Array<Coverage>();
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
