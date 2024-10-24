import { Injectable, inject } from "@angular/core";
import { Auth, authState, getAuth, signOut, User } from "@angular/fire/auth";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root', })

export class AuthStateService {
  private _auth = inject(Auth);

  get getAuthState$(): Observable<User | any>{
    return authState(this._auth); //devuelve un observable con el estado de autenticación
  }

  get currentUser(){
    return getAuth().currentUser;
  }

  async logOut(): Promise<void> {
    try {
      await signOut(this._auth); // Cierra la sesión correctamente
      console.log("Sesión cerrada con éxito");
    } catch (error) {
      console.error("Error al cerrar la sesión", error); // Manejo de errores
      throw new Error('No se pudo cerrar la sesión.'); // Re-lanzamos el error si es necesario
    }
  }
}
