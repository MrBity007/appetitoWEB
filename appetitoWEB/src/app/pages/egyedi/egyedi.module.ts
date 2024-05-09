import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgyediRoutingModule } from './egyedi-routing.module';
import { EgyediComponent } from './egyedi.component';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardActions, MatCardTitle} from "@angular/material/card";


@NgModule({
  declarations: [
    EgyediComponent
  ],
  imports: [
    CommonModule,
    EgyediRoutingModule,
    FormsModule,
    MatCard,
    MatCardActions,
    MatCardTitle
  ]
})
export class EgyediModule { }
