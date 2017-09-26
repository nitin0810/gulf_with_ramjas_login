import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComplaintSuggestionOptionsPage } from './compl-suggestion-options';

@NgModule({
  declarations: [ComplaintSuggestionOptionsPage],
  
  imports: [IonicPageModule.forChild(ComplaintSuggestionOptionsPage)],
  exports: [ComplaintSuggestionOptionsPage]
})

export class ComplaintSuggestionOptionsModule { }