import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import { PizzakFS } from '../../models/PizzakFS';
import {EtlapService} from "../../shared/services/etlap.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-etlap',
  templateUrl: './etlap.component.html',
  styleUrl: './etlap.component.scss'
})

export class EtlapComponent implements OnInit {
  email: string = "";
  events: Array<PizzakFS> = [];
  pizzak: any[] = [];
  sortedPizzas: PizzakFS[] = [];

  sortDirection: 'asc' | 'desc' = 'asc';
  limit: number = 10;


  constructor(private firestore: AngularFirestore, private auth: AuthService,
              private etlapService: EtlapService) { }

  ngOnInit(): void {
    this.loadPizzaData();
    this.loadPizzaDataAndAddToFirestore();
  }

  loadPizzaData(): void {

    // Firestore-ból adatok betöltése
    this.firestore.collection<PizzakFS>('pizzak').valueChanges()
      .subscribe(pizzak => {

    this.pizzak = pizzak;
    this.sorting();
    });
  }
  addToCart(pizzafs: PizzakFS) {
    this.email = this.auth.getLoggedInUserEmail();
    window.alert("A pizza sikeresen hozzáadva a kosárhoz!");
    // @ts-ignore
    this.etlapService.addToCart(pizzafs).subscribe(result => {
      if (result) {
        this.addToCartFirestore(this.email, result);
      } else {
        console.error('Hiba történt a kosárhoz adás során.');
      }
    });
  }

  addToCartFirestore(userEmail: string, pizza: PizzakFS) {
    this.firestore.collection(`users/${userEmail}/cart`).add(pizza)
      .then(() => {
        console.log('Pizza hozzáadva a kosárhoz!');
})
      .catch(error => {
        console.error('Hiba történt a pizzák hozzáadása közben:', error);
      });
  }


  loadPizzaDataAndAddToFirestore(): void {
    // Ellenőrizzük, hogy üres-e a pizza gyűjtemény
    this.firestore.collection('pizzak').get().toPromise().then(snapshot => {
      // @ts-ignore
      if (snapshot.empty) {
        // Ha üres a gyűjtemény, akkor hozzáadjuk a pizzákat
        const pizzasToAdd: PizzakFS[] = [
          {
            nev: 'Hawaii',
            ar: 1500,
            ertekeles: 4,
            imageUrl: '../assets/hawaii.png',
            leiras: 'Ananászkarikák, füstölt sonka, mozzarella sajt'
          },
          {
            nev: 'Pepperoni',
            ar: 1700,
            ertekeles: 5,
            imageUrl: '../assets/pepperoni.png',
            leiras: 'Pepperoni kolbász, mozzarella sajt, paradicsomszósz'
          },
          {
            nev: 'Margarita',
            ar: 1300,
            ertekeles: 3,
            imageUrl: '../assets/margarita.png',
            leiras: 'Mozzarella sajt, paradicsomszósz, bazsalikom'
          },
          {
            nev: 'Tuna',
            ar: 1600,
            ertekeles: 4.5,
            imageUrl: '../assets/tuna.png',
            leiras: 'Tonhal, karamellizált hagyma, fekete olívabogyó'
          },
          {
            nev: 'Capricciosa',
            ar: 1600,
            ertekeles: 4,
            imageUrl: '../assets/capricciosa.png',
            leiras: 'Füstölt sonka, gomba, articsóka szív, olívabogyó, mozzarella sajt'
          },
          {
            nev: 'Quattro Formaggi',
            ar: 1800,
            ertekeles: 4.8,
            imageUrl: '../assets/quattro formaggi.png',
            leiras: 'Mozzarella, parmezán, gorgonzola, pecorino sajtok'
          },
          {
            nev: 'Vegetariana',
            ar: 1400,
            ertekeles: 4.2,
            imageUrl: '../assets/vegetariana.png',
            leiras: 'Paprika, paradicsom, hagyma, gomba, olívabogyó, mozzarella sajt'
          },
          {
            nev: 'BBQ Chicken',
            ar: 1750,
            ertekeles: 4.7,
            imageUrl: '../assets/bbq.png',
            leiras: 'Csirkemell darabok, BBQ szósz, mozzarella sajt'
          },
          {
            nev: 'Diavola',
            ar: 1650,
            ertekeles: 4.4,
            imageUrl: '../assets/daviola.png',
            leiras: 'Csípős szalámi, chili, jalapeno paprika, mozzarella sajt'
          },
          {
            nev: 'Quattro Stagioni',
            ar: 1700,
            ertekeles: 4.6,
            imageUrl: '../assets/quattro stagioni.png',
            leiras: 'Füstölt sonka, gomba, olívabogyó, articsóka, mozzarella sajt'
          }
        ];
          pizzasToAdd.forEach(pizza => {
          this.addPizzaToFirestore(pizza);
        });
      } else {
        console.log('A pizzák már hozzá vannak adva a Firestore-hoz.');
      }
    }).catch(error => {
      console.error('Hiba történt a pizza gyűjtemény ellenőrzése közben:', error);
    });
  }


  addPizzaToFirestore(pizza: PizzakFS) {
    this.etlapService.addPizzaToFirestore(pizza)
      .then(() => {
        console.log('Pizza hozzáadva a Firestore-hoz!');
      })
      .catch(error => {
        console.error('Hiba történt a pizza hozzáadása közben:', error);
      });
  }
   sorting(): void {
      // Másolatot készítünk az eredeti pizzák listából
      this.sortedPizzas = [...this.pizzak];

      // Rendezés az ár alapján
      this.sortedPizzas.sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return a.ar - b.ar;
        } else {
          return b.ar - a.ar;
        }
      });

      // Limitálás
      this.sortedPizzas = this.sortedPizzas.slice(0, this.limit);
    }

}
