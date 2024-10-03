import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../shared/data-access/auth-state.service";
import { map } from "rxjs/operators";

//Encargado de proteger nuestras rutas
export const privateGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.getAuthState$.pipe(
      map(state => {
        console.log(state);
        if (!state) { //si no esta logeado
          router.navigateByUrl('/auth/sign-in'); //redirige a la pagina de login
          return false; //no puede acceder
        }
        return true;
      })
    );
  };
};

//para cuando ya este logeado
export const publicGuard = (): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.getAuthState$.pipe(
      map(state => {
        console.log(state);
        if (state) { //si no esta logeado
          router.navigateByUrl('/tasks'); //redirige a la pagina de login
          return false; //no puede acceder
        }
        return true;
      })
    );
  };
};
