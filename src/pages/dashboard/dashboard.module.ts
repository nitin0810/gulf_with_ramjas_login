import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { CustomNavbarModule } from '../../custom-components/navbar/navbar.module';

import { DashboardPage } from './dashboard';
import { GoogleChartModule } from '../../custom-components/charts/charts.module';


@NgModule({

  declarations: [DashboardPage],

  imports: [
    GoogleChartModule,
    IonicModule,
    CustomNavbarModule,
    IonicPageModule.forChild(DashboardPage)
  ],

})
export class DashboardModule { }  