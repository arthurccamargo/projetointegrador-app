import type { AppRoute } from './types';
  
// importa todos os arquivos *PageRoute.tsx dentro de main
const modules = import.meta.glob('../main/**/*PageRoute.tsx', { eager: true }) as Record<
  string,
  { default: AppRoute }
>;

// extrai o default de cada módulo
const routes: AppRoute[] = Object.values(modules).map((mod) => mod.default);

export default routes;
