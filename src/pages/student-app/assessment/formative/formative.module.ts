import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';

import { AssessmentFormativePageStudent } from './formative';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AssessmentFormativePageStudent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AssessmentFormativePageStudent)
    ],
    
})
export class AssessmentFormativeModule { }  