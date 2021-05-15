import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.user).subscribe(res => {
      localStorage.setItem('token', res);
      this.router.navigate(['/']);
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error}!`
      });
    });
  }

}
