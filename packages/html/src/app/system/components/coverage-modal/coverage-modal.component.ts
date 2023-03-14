import {Component, EventEmitter, Input, OnInit, Output} from '@html/core';

declare var jQuery: any;
import {Coverage} from '../../interfaces';
import {CoverageService} from '../../services';

@Component({
  selector: 'app-coverage-modal',
  templateUrl: './coverage-modal.component.html',
  styleUrls: ['./coverage-modal.component.scss']
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
