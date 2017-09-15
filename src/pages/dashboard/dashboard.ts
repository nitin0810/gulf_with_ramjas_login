import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  title:string ="DASHBOARD";
  
  constructor(public navCtrl: NavController) {

  }

}
