import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Tramo} from '../../interfaces';
import {Coverage} from 'src/app/system/interfaces/coverage';
import {CoverageService} from 'src/app/system/services/coverage.service';
import {TramoService} from '../../services';

declare var jQuery: any;

@Component({
  selector: 'app-tramo-modal',
  templateUrl: './tramo-modal.component.html'
})
export class TramoModalComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  tramo: Tramo;
  coverages: Array<Coverage> = new Array<Coverage>();
  @Output() sendModel = new EventEmitter<Tramo>();

  constructor(
    private tramoService: TramoService,
    private coverageService: CoverageService) {
    this.tramo = this.tramoService.defaultValues();
  }

  ngOnInit(): void {
    jQuery('#app-tramo-modal').on('shown.bs.modal', () => {
      this.coverageService.getCoverages()
        .subscribe(res => this.coverages = res);
    });
  }

  saveChanges(): void {
    this.sendModel.emit(this.tramo);
    jQuery('#app-tramo-modal').modal('hide');
  }

}
