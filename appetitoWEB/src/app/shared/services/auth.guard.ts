import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {



  constructor(private auth: AngularFireAuth, private router: Router) { }

  getLoggedInUserEmail(): Observable<string | null> {
    return new Observable(observer => {
      this.auth.authState.subscribe(authState => {
        if (authState && authState.email) {
          observer.next(authState.email);
        } else {
          // Ha a felhasználó nincs bejelentkezve, visszaadunk null értéket
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

}
