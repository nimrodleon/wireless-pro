import { Component, Input, OnInit } from '@angular/core';
import { BaseLink } from '../base-link';

@Component({
  selector: 'app-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss']
})
export class RouterLinkComponent implements OnInit {
  @Input()
  baseLink: BaseLink;

  constructor() { }

  ngOnInit(): void {
  }

}
