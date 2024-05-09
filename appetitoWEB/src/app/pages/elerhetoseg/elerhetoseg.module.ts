import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElerhetosegRoutingModule } from './elerhetoseg-routing.module';
import { ElerhetosegComponent } from './elerhetoseg.component';


@NgModule({
  declarations: [
    ElerhetosegComponent
  ],
  imports: [
    CommonModule,
    ElerhetosegRoutingModule
  ]
})
export class ElerhetosegModule { }
