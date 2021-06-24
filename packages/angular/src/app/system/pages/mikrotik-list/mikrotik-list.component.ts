import {Component, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-mikrotik-list',
  templateUrl: './mikrotik-list.component.html',
  styleUrls: ['./mikrotik-list.component.scss']
})
export class MikrotikListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  // Agregar Mikrotik.
  addMikrotikClick(): void {
    jQuery('#mikrotik-form').modal('show');
  }

}
