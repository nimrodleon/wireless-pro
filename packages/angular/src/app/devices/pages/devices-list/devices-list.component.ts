import {Component, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // const body = document.querySelector('body');
    // body.addEventListener('keydown', e => {
    //   if (e.key == 'F7') {
    //     const trArr = document.querySelectorAll('tr');
    //     Array.from(trArr).forEach(tr =>
    //       tr.classList.remove('text-success', 'text-danger'));
    //   }
    //   if (e.key == 'F8') {
    //     this.onPing();
    //   }
    // });
  }

  private request_image(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(url);
      };
      img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
  }

  private ping(url) {
    return new Promise((resolve, reject) => {
      let start = (new Date()).getTime();
      let response = () => {
        let delta = ((new Date()).getTime() - start);
        delta = delta * 1;
        resolve(delta);
      };
      this.request_image(url).then(response).catch(response);
      // Set a timeout for max-pings, 1s.
      setTimeout(() => {
        reject(Error('Timeout'));
      }, 1000);
    });
  }

  // botón para hacer ping.
  // onPing(): void {
  //   if (this.devices.length > 0) {
  //     this.devices.forEach(item => {
  //       const _item = item;
  //       this.ping('http://' + _item.ipAddress)
  //         .then(delta => {
  //           const dom = document.getElementById(_item._id);
  //           if (dom) {
  //             dom.classList.add('text-success');
  //           }
  //         })
  //         .catch(err => {
  //           const dom = document.getElementById(_item._id);
  //           if (dom) {
  //             dom.classList.add('text-danger');
  //           }
  //         });
  //     });
  //   }
  // }

}
