import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../user/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.user).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.error.msg}!`
      });
    });
  }

}
