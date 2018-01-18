import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoResultsComponent } from './no-results.component';

@NgModule({
  declarations: [NoResultsComponent],
  
  imports: [IonicPageModule.forChild(NoResultsComponent)],
  exports: [NoResultsComponent]
})
export class NoResultsModule { }