import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import Swal from "sweetalert2";
import {WorkOrderService} from "../../services";
import {AuthService} from "src/app/user/services";

@Component({
  selector: "app-work-orders",
  templateUrl: "./work-orders.component.html"
})
export class WorkOrdersComponent implements OnInit {
  workOrders: Array<any> = new Array<any>();
  query: FormControl = this.fb.control("");

  constructor(
    private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // Cargar ordenes de trabajo.
    this.getWorkOrders(this.query.value);
  }

  // Cargar lista de ordenes de trabajo.
  private getWorkOrders(query: string): void {
    this.workOrderService.getWorkOrders(query)
      .subscribe(result => this.workOrders = result);
  }

  // Buscar ordenes de trabajo.
  workOrdersLoad(e: any): void {
    e.preventDefault();
    this.getWorkOrders(this.query.value);
  }

  // borrar orden de trabajo.
  deleteWorkOrder(id: string): void {
    this.authService.isRolAdmin()
      .subscribe(result => {
        if (!result) {
          Swal.fire(
            "Información",
            "No es admin, no puede hacer esto!",
            "error"
          );
        } else {
          Swal.fire({
            title: "¿Estás seguro de borrar?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo!",
            cancelButtonText: "Cancelar"
          }).then(result => {
            if (result.isConfirmed) {
              this.workOrderService.deleteOrder(id)
                .subscribe(() => {
                  this.getWorkOrders(this.query.value);
                });
            }
          });
        }
      });
  }

}
