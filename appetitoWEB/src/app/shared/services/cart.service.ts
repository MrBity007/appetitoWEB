import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {Cart} from "../../models/Cart";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore, private router:Router) { }

  getCartItems(userEmail: string): Observable<Cart[]> {
    return this.firestore.collection<Cart>(`carts/${userEmail}/cart`).valueChanges();
  }

  deleteItemFromCart(userEmail: string, pizzaID: string): Observable<void> {
    return new Observable<void>(observer => {
      this.firestore.collection(`carts/${userEmail}/cart`).doc(pizzaID).delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt a pizza törlése közben:', error);
          observer.error(error);
        });
    });
  }


  deleteAllItems(userEmail: string): void {
    this.firestore.collection(`carts/${userEmail}/cart`).get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
        this.router.navigateByUrl('/etlap');
      });
    });
  }


}
