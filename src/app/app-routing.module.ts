import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then(module => module.ProductsModule)
  },
  {
    path: 'signals',
    loadChildren: () => import('./signals/signals.module').then(module => module.SignalsModule)
  },
  {
    path: '**',
    redirectTo: 'product'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
