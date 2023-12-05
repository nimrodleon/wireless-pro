import {Component, OnInit} from "@angular/core";
import {DeviceListService} from "../../services";
import Swal from "sweetalert2";
import {AuthService} from "src/app/user/services";

declare const jQuery: any;

@Component({
  selector: "app-devices-list",
  templateUrl: "./devices-list.component.html",
  styleUrls: ["./devices-list.component.scss"]
})
export class DevicesListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private deviceListService: DeviceListService) {
  }

  ngOnInit(): void {
    // Obtener el rol del usuario autentificado.
    this.deviceListService.getRoles();
    // this.authService.getRoles().subscribe(res => this.currentRole = res);
    // Cargar areas de cobertura.
    this.deviceListService.loadCoverages();

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

  get devices() {
    return this.deviceListService.devices;
  }

  // botón agregar equipo.
  addDeviceClick(): void {
    this.authService.isRolAdminOrRedes()
      .subscribe(result => {
        if (!result) {
          Swal.fire(
            "Información",
            "No tiene permisos para realizar esta tarea!",
            "error"
          );
        } else {
          this.deviceListService.titleModal = "Agregar Equipo";
          this.deviceListService.setDefaultDeviceEmpty();
          jQuery("#app-device-modal").modal("show");
        }
      });
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(url);
      img.src = `${url}?random-no-cache=${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`;
    });
  }

  private async ping(url: string): Promise<number> {
    const start = Date.now();
    try {
      await this.loadImage(url);
      return Date.now() - start;
    } catch (error) {
      throw new Error("Timeout");
    }
  }

  public onPing(): void {
    if (this.devices && this.devices.length > 0) {
      this.devices?.forEach(async (item) => {
        this.ping(`https://${item.ipAddress}`)
          .then(() => {
            const dom = document.getElementById(item._id);
            if (dom) {
              dom.classList.add("text-success");
            }
          })
          .catch(() => {
            const dom = document.getElementById(item._id);
            if (dom) {
              dom.classList.add("text-danger");
            }
          });
      });
    }
  }

  // Limpiar ping.
  clearPing(): void {
    const trArr = document.querySelectorAll("tr");
    Array.from(trArr).forEach(tr => tr.classList.remove("text-success", "text-danger"));
  }

}
