import {Component, Input, OnInit} from '@angular/core';
import {Mikrotik} from '../../interfaces';
import {MikrotikService} from '../../services';

@Component({
  selector: 'app-mikrotik-badge',
  templateUrl: './mikrotik-badge.component.html'
})
export class MikrotikBadgeComponent implements OnInit {
  @Input()
  mikrotik: Mikrotik;
  enabled: string = '0';
  suspended: string = '0';

  constructor(private mikrotikService: MikrotikService) {
    this.mikrotik = this.mikrotikService.defaultValues();
  }

  ngOnInit(): void {
    this.mikrotikService.totalStatusServices(this.mikrotik._id)
      .subscribe(result => {
        this.enabled = result.enabled;
        this.suspended = result.suspended;
      });
  }

}
