import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleChart } from './charts';
import { MomentModule } from "angular2-moment/moment.module";

@NgModule({
  declarations: [GoogleChart],
  imports: [
    MomentModule,
    IonicPageModule.forChild(GoogleChart)
  ],
  exports: [GoogleChart]
})

export class GoogleChartModule { }
