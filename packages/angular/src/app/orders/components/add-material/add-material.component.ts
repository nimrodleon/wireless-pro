import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  private baseURL = environment.baseUrl + 'material';

  constructor() {
  }

  ngOnInit(): void {
    document.querySelector('#add-material-modal')
      .addEventListener('shown.bs.modal', () => {
        jQuery('#searchMaterial').select2({
          theme: 'bootstrap4',
          dropdownParent: jQuery('#add-material-modal'),
          ajax: {
            url: this.baseURL + '/select2/s',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        });
      });

  }

}
