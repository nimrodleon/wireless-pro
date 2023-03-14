import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coverage} from '../../interfaces';
import {CoverageService} from '../../services';

declare var jQuery: any;

@Component({
  selector: 'app-coverage-modal',
  templateUrl: './coverage-modal.component.html'
})
export class CoverageModalComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  coverage: Coverage;

  @Output()
  sendCoverage = new EventEmitter<Coverage>();

  constructor(private coverageService: CoverageService) {
    this.coverage = this.coverageService.defaultValues();
  }

  ngOnInit(): void {
  }

  onSaveChanges(): void {
    this.sendCoverage.emit(this.coverage);
    jQuery('#app-coverage-modal').modal('hide');
  }

}
