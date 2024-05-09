import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElerhetosegComponent } from './elerhetoseg.component';

const routes: Routes = [{ path: '', component: ElerhetosegComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElerhetosegRoutingModule { }
