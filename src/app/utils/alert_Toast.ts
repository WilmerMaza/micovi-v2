/**
 * Utilidades SweetAlert2 con import dinámico.
 *
 * Evita incluir sweetalert2 en el bundle inicial; solo se carga en error de
 * login, toasts de formularios lazy o celebración newpay en dashboard.
 */
import type { SweetAlertOptions } from 'sweetalert2';

export const customOptions: SweetAlertOptions = {
  title: '',
  width: 600,
  imageUrl: '/images/registro.png',
  background: '#00000000',
  imageWidth: 600,
  timer: 50000,
  showConfirmButton: false,
  backdrop: `
    rgba(0,0,123,0.4)
    url("/images/login-min.png")
    top right
    no-repeat
  `,
  customClass: {
    container: 'my-swal-container',
  },
};

async function getToast() {
  const { default: Swal } = await import('sweetalert2');
  return Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

/** Toast compacto (errores, confirmaciones ligeras). */
export async function fireToast(
  options: SweetAlertOptions,
): Promise<void> {
  const Toast = await getToast();
  await Toast.fire(options);
}

export async function fireErrorToast(title: string): Promise<void> {
  await fireToast({ icon: 'error', title });
}

/** Modal de celebración post-pago (dashboard ?newpay). */
export async function fireNewPayCelebration(): Promise<void> {
  const { default: Swal } = await import('sweetalert2');
  await Swal.fire(customOptions);
}
