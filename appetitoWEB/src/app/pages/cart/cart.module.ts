import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {DeliveryTimePipePipe} from "../../pipe/delivery-time-pipe.pipe";

@NgModule({
  declarations: [
    CartComponent,
    DeliveryTimePipePipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatDividerModule,
    FormsModule
  ]
})
export class CartModule { }
