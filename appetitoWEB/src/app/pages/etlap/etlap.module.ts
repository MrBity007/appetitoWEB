import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtlapRoutingModule } from './etlap-routing.module';
import { EtlapComponent } from './etlap.component';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EtlapComponent
  ],
  imports: [
    CommonModule,
    EtlapRoutingModule,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    MatDivider,
    MatCardActions,
    FormsModule
  ]
})
export class EtlapModule { }
