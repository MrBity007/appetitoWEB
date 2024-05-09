import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@angular/fire/auth-guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'etlap', loadChildren: () => import('./pages/etlap/etlap.module').then(m => m.EtlapModule), canActivate: [AuthGuard]},
  { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule)},
  { path: 'egyedi', loadChildren: () => import('./pages/egyedi/egyedi.module').then(m => m.EgyediModule), canActivate: [AuthGuard] },
  { path: 'elerhetoseg', loadChildren: () => import('./pages/elerhetoseg/elerhetoseg.module').then(m => m.ElerhetosegModule) },
  {
    path: '**',
    redirectTo: '/etlap'
  }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
