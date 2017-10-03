import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SortFilterOptionsPage } from './sort-filter';

@NgModule({
  declarations: [SortFilterOptionsPage],
  
  imports: [IonicPageModule.forChild(SortFilterOptionsPage)],
  exports:[SortFilterOptionsPage]
})

export class SortFilterOptionsModule { }