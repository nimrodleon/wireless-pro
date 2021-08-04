import Swal from 'sweetalert2';

export class Sweetalert2 {
  // confirmar borrar item.
  static async deleteConfirm() {
    return Swal.fire({
      title: `¿Estás seguro de borrar?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    });
  }

  // borrado exitoso.
  static async deleteSuccess() {
    return Swal.fire(
      'Borrado!',
      'El registro ha sido borrado.',
      'success'
    );
  }

  // acceso denegado.
  static async accessDenied() {
    return Swal.fire(
      'Información',
      'No es admin, no puede hacer esto!',
      'error'
    );
  }

  // acceso denegado.
  static async accessDeniedGeneric() {
    return Swal.fire(
      'Información',
      'No tiene permisos para esta operación!',
      'error'
    );
  }

}
