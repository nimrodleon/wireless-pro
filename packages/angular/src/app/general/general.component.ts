import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../user/services/auth.service';
import {InfoService} from './info.service';
import {Info} from './info.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  info: Info = new Info();

  constructor(private infoService: InfoService,
              private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getInfo();
    // TODO: eliminar esta linea de código.
    // this.authService.isAdmin().subscribe(res => {
    //   if (res != true) this.router.navigate(['/']);
    // });
  }

  private getInfo(): void {
    this.infoService.getInfo().subscribe(res => {
      this.info = res;
    });
  }

  update(): void {
    this.infoService.update(this.info).subscribe(res => {
      this.info = res;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su Información ha sido guardado',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
