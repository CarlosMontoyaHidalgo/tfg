import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { AuthStateService } from '../data-access/auth-state.service';

/*Para rutas privadas*/

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, RouterLink, NgxSonnerToaster],
  selector: 'app-layout',
  template: ` <header class="h-[80px] mb-8 w-full max-w-screen-lg mx-auto px-4">
      <nav class="flex items-center justify-between h-full">
        <a
          class="text-2xl font-bold"
          routerLink="/tasks"
          class="text-2xl font-bold"
          >Tasks</a
        >
        <button
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          (click)="closeSession()">
          Cerrar Sesión
        </button>
      </nav>
    </header>

    <router-outlet />`,
})
export default class LayoutComponent {
  constructor() {
    console.log('LayoutComponent');
  }
  private _authState = inject(AuthStateService);
  private _router = inject(Router);

  async closeSession() {
    try {
      await this._authState.logOut();
      toast.success('Sesión cerrada');
      //this._router.navigateByUrl('/auth/sign-in'); Volver al home cuando este implementado
      this._router.navigateByUrl('/auth/sign-in');
    } catch (error) {
      toast.error('Error al cerrar la sesión');
      console.error(error);
    }
  }
}
