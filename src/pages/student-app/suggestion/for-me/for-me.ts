import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: './for-me.html' ,
  styles:[`

  `]
   
})

export class SuggestionForMeStudent {

  title:string = "Messaging";

  constructor(){
    console.log('for me constructor called/////');
    
  }
}