import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  isAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(res => this.isAdmin = res);
  }

}
