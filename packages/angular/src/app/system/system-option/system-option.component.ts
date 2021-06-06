import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-system-option',
  templateUrl: './system-option.component.html',
  styleUrls: ['./system-option.component.css']
})
export class SystemOptionComponent implements OnInit {
  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  detail: string;

  @Input()
  href: string;

  @Output()
  onClick = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  sendEvent(e: any): void {
    e.preventDefault();
    if (!this.href) {
      this.onClick.emit(e);
    }
  }

}
