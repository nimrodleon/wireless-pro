import {Component, OnInit} from "@angular/core";
import * as ClipboardJS from "clipboard";
import {DeviceListService} from "../../services";
import Swal from "sweetalert2";
import {AuthService} from "src/app/user/services";

declare var jQuery: any;

@Component({
  selector: "app-device-table",
  templateUrl: "./device-table.component.html"
})
export class DeviceTableComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private deviceListService: DeviceListService) {
  }

  ngOnInit(): void {
    new ClipboardJS("[data-clipboard-text]");
  }

  get devices() {
    return this.deviceListService.devices;
  }

  editDevice(id: string): void {
    this.authService.isRolAdminOrRedes()
      .subscribe(result => {
        if (!result) {
          Swal.fire(
            "Información",
            "No tiene permisos para realizar esta tarea!",
            "error"
          );
        } else {
          this.deviceListService.titleModal = "Editar Equipo";
          this.deviceListService.getDevice(id);
          jQuery("#app-device-modal").modal("show");
        }
      });
  }

  deleteDevice(id: string): void {
    this.authService.isRolAdmin()
      .subscribe(result => {
        if (!result) {
          Swal.fire(
            "Información",
            "No es admin, no puede hacer esto!",
            "error"
          );
        } else {
          // Borrar si el usuario tiene permisos.
          Swal.fire({
            title: "¿Estás seguro de borrar?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo!",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.deviceListService.deleteDevice(id);
            }
          });
        }
      });
  }

}
