import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/user/services/auth.service';
import {User} from 'src/app/user/interfaces/user';
import {UserService} from 'src/app/user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;
  avatarContent: string = '';

  constructor(private authService: AuthService, private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.loggedIn()) {
      this.getCurrentUser();
    }
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
      const arr = res.name.split(' ');
      if (arr.length > 1) {
        this.avatarContent = arr[0][0] + arr[1][0];
      } else if (arr.length == 1) {
        this.avatarContent = arr[0][0];
      }
    });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  logout(e): void {
    e.preventDefault();
    this.authService.logout();
  }

}
