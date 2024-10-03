import { Injectable, inject } from "@angular/core";
import { Auth, authState, signOut } from "@angular/fire/auth";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root', })

export class AuthStateService {
  private _isAuthenticated = inject(Auth);

  get getAuthState$(): Observable<any>{
    return authState(this._isAuthenticated); //devuelve un observable con el estado de autenticación
  }

  logOut(){
    return signOut(this._isAuthenticated);
  }
}
