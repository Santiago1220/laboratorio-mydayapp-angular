import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModule } from './feature/feature.module';

import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/feature.module').then(i => i.FeatureModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
