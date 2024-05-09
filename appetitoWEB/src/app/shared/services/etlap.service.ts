import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PizzakFS} from "../../models/PizzakFS";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable, of, switchMap} from "rxjs";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import {Pizzak} from "../../models/Pizzak";
import {Custom} from "../../models/Custom";

@Injectable({
  providedIn: 'root'
})
export class EtlapService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  create(pizza: Pizzak){
    return this.firestore.collection<Pizzak>('Pizzak').add(pizza);
  }


  addToCart(pizza: Pizzak): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          console.log('Felhasználó nincs bejelentkezve!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert a felhasználó nincs bejelentkezve
        }
        // Felhasználó be van jelentkezve, hozzáadjuk a kosarához a pizzát
        const userEmail = user.email;
        if (!userEmail) {
          console.error('Felhasználó e-mail címe nincs megadva!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert hiányzik a felhasználó e-mail címe
        }
        return this.addToCartFirestore(userEmail, pizza);
      })
    );
  }

  private addToCartFirestore(userEmail: string, pizza: Pizzak): Observable<PizzakFS> {
    return new Observable<any>(observer => {
      // Generáljuk a pizzaID-t
      const pizzaID = this.firestore.createId();

      // Hozzáadjuk a dokumentumot a Firestore-hoz a megadott pizzaID-vel
      this.firestore.collection(`carts/${userEmail}/cart`).doc(pizzaID).set({ ...pizza, pizzaID })
        .then(() => {
          console.log('Pizza hozzáadva a kosárhoz!', pizzaID);
          // Visszaadjuk a hozzáadott pizzát, hogy a hívó oldalon is elérhető legyen
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt a pizzák hozzáadása közben:', error);
          observer.next(null); // Nem sikerült hozzáadni a pizzát a kosárhoz
          observer.complete();
        });
    });
  }


  addToCartCustom(custom : Custom): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          console.log('Felhasználó nincs bejelentkezve!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert a felhasználó nincs bejelentkezve
        }
        // Felhasználó be van jelentkezve, hozzáadjuk a kosarához a pizzát
        const userEmail = user.email;
        if (!userEmail) {
          console.error('Felhasználó e-mail címe nincs megadva!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert hiányzik a felhasználó e-mail címe
        }
        return this.addToCartFirestoreCustom(userEmail, custom);
      })
    );
  }

  private addToCartFirestoreCustom(userEmail: string, pizza: Custom): Observable<PizzakFS> {
    return new Observable<any>(observer => {
      // Generáljuk a pizzaID-t
      const pizzaID = this.firestore.createId();

      // Hozzáadjuk a dokumentumot a Firestore-hoz a megadott pizzaID-vel
      this.firestore.collection(`carts/${userEmail}/cart`).doc(pizzaID).set({ ...pizza, pizzaID })
        .then(() => {
          console.log('Pizza hozzáadva a kosárhoz!', pizzaID);
          // Visszaadjuk a hozzáadott pizzát, hogy a hívó oldalon is elérhető legyen
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt a pizzák hozzáadása közben:', error);
          observer.next(null); // Nem sikerült hozzáadni a pizzát a kosárhoz
          observer.complete();
        });
    });
  }


  addPizzaToFirestore(pizza: PizzakFS): Promise<DocumentReference<PizzakFS>> {
    return this.firestore.collection<PizzakFS>('pizzak').add(pizza);
  }

}
