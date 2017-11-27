import { NgModule } from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { AssessmentSummativePageStudent } from './summative';
import { CustomNavbarModule } from '../../../../custom-components/navbar/navbar.module';


@NgModule({
  
    declarations: [AssessmentSummativePageStudent],
   
    imports: [
        CustomNavbarModule,
        IonicPageModule.forChild(AssessmentSummativePageStudent)
    ],
    
})

export class AssessmentSummativeModule { }  