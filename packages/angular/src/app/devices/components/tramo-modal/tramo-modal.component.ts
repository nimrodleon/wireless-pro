import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;
import {Tramo} from '../../interfaces/tramo';
import {Coverage} from 'src/app/client/interfaces/coverage';
import {CoverageService} from 'src/app/client/services/coverage.service';

@Component({
  selector: 'app-tramo-modal',
  templateUrl: './tramo-modal.component.html',
  styleUrls: ['./tramo-modal.component.scss']
})
export class TramoModalComponent implements OnInit {
  @Input() title: string;
  @Input() tramo: Tramo;
  coverages: Array<Coverage>;
  @Output() sendModel = new EventEmitter<Tramo>();

  constructor(private coverageService: CoverageService) {
    this.coverages = new Array<Coverage>();
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
