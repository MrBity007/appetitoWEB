import { Component } from '@angular/core';
import {EtlapService} from "../../shared/services/etlap.service";
import {Custom} from "../../models/Custom";

@Component({
  selector: 'app-egyedi',
  templateUrl: './egyedi.component.html',
  styleUrl: './egyedi.component.scss'
})
export class EgyediComponent {
  toppings: string = '';

  constructor(private etlapService: EtlapService) { }

  addToCart(): void {
    // Ellenőrizzük, hogy a beviteli mező üres-e
    if (!this.toppings.trim()) {
      alert('A beviteli mező nem lehet üres!');
      return;
    }

    const customPizza: Custom = {
      nev: 'EGYEDI',
      ar: 3000,
      ertekeles: 0,
      imageUrl: 'null',
      leiras: `Egyedi pizza: ${this.toppings}`
    };


    if(this.toppings.trim()){
      alert('Sikeresen hozzáadva a kosárhoz!');
    this.etlapService.addToCartCustom(customPizza).subscribe(
      () => {

      },
      error => {
        console.error('Hiba történt a pizza hozzáadása közben:', error);
      }
    );
    }
  }

}
