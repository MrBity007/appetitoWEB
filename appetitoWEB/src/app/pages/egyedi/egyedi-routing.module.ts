import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EgyediComponent } from './egyedi.component';

const routes: Routes = [{ path: '', component: EgyediComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgyediRoutingModule { }
