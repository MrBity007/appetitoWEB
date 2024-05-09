import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtlapComponent } from './etlap.component';

const routes: Routes = [{ path: '', component: EtlapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtlapRoutingModule { }
