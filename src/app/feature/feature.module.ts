import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './home/task/tasks.component';
import { HomeComponent } from './home/home.component';
import { FeatureRoutingModule } from './featuring-routing.module';
import { SharedModule } from '../shared/share.module';
import { CoreModule } from '../core/core.module';




@NgModule({
  declarations: [
    HomeComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class FeatureModule { }
