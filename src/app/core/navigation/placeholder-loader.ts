/**
 * Carga perezosa del placeholder de módulo.
 *
 * Las features de navegación reutilizan una sola página; el copy vive en
 * `route.data` (title, description, status).
 */
export const MODULE_STATUS =
  'Este módulo será implementado posteriormente.';

export const loadModulePlaceholder = () =>
  import('../../shared/components/module-placeholder/module-placeholder').then(
    (m) => m.ModulePlaceholderComponent,
  );

export function placeholderData(
  title: string,
  description: string,
  breadcrumb?: string,
): Record<string, string> {
  return {
    title,
    description,
    status: MODULE_STATUS,
    ...(breadcrumb ? { breadcrumb } : {}),
  };
}
