import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var jQuery: any;
import { Coverage } from '../coverage.model';

@Component({
  selector: 'app-coverage-modal',
  templateUrl: './coverage-modal.component.html',
  styleUrls: ['./coverage-modal.component.scss']
})
export class CoverageModalComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  coverage: Coverage;

  @Output()
  sendCoverage = new EventEmitter<Coverage>();

  constructor() { }

  ngOnInit(): void {
  }

  onSaveChanges(): void {
    this.sendCoverage.emit(this.coverage);
    jQuery('#app-coverage-modal').modal('hide');
  }

}
