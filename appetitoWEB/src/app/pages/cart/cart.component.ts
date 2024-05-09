import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CartService} from "../../shared/services/cart.service";
import {Cart} from "../../models/Cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItems: Cart[]=[];
  fizetendo: number=0;
  orderTime: Date = new Date();
  currentEmail: string = '';

  constructor(private afAuth: AngularFireAuth, private cartService: CartService) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;
        if (userEmail !== this.currentEmail) {
          if (typeof userEmail === "string") {
            this.currentEmail = userEmail;
          }
          if (typeof userEmail === "string") {
            this.loadCartItems(userEmail);
          }
        }
      } else {
        console.log('Nincs bejelentkezve felhasználó.');
      }
    });
  }

  getLoggedInUserEmail(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;
        if (typeof userEmail === "string" && userEmail !== this.currentEmail) {
          this.currentEmail = userEmail;
          this.loadCartItems(userEmail);
        }
      } else {
        console.log('Nincs bejelentkezve felhasználó.');
      }
    });
  }

  loadCartItems(userEmail: string): void {
    this.cartService.getCartItems(userEmail).subscribe(items => {
      this.cartItems = items;
      this.osszar();

    });

  }

  deleteItem(pizzaID: string): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;
        if (!confirm('Biztosan törölni szeretnéd ezt a pizzát?')) {
          return;
        }

        if (typeof userEmail === "string") {
          this.cartService.deleteItemFromCart(userEmail, pizzaID).subscribe(() => {
            console.log('Pizza törölve a kosárból!');
          });
        }
      }
    });
  }

  osszar(): void {//Fizetendo kiiaratashoz
    this.fizetendo = this.cartItems.reduce((total, item) => total + item.ar,0);
  }


  deleteAllItems() {//"Megrendelés"
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;
        if (typeof userEmail === "string") {
          this.cartService.deleteAllItems(userEmail);
        }
      } else {
        console.log('Nincs bejelentkezve felhasználó.');
      }
    });
  }



}
