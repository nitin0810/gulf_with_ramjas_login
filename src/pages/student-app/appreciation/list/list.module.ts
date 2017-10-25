import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AppreciationListComponent } from './list';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';
import { MomentModule } from 'angular2-moment';


@NgModule({

    declarations: [AppreciationListComponent],

    imports: [
        MomentModule,
        IonicPageModule.forChild(AppreciationListComponent)
    ],
    exports: [AppreciationListComponent]

})
export class AppreciationListModule { }  