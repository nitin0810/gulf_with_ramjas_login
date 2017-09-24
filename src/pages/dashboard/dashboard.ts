import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComplaintService } from '../../services/complaint.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {

  title: string = "DASHBOARD";

  constructor(
    public navCtrl: NavController,
    private complaintService: ComplaintService
  ) { }

  ngOnInit() {
    
    this.fetchStaticData();
  }

  fetchStaticData() {

    this.fetchComplaintCategories();
    this.fetchFacultyNames();
  }

  fetchComplaintCategories() {

    this.complaintService.fetchCategories()
      .subscribe((res: any) => {
        localStorage.setItem('complaintCategories', JSON.stringify(res));
      }, (err: any) => {

      });
  }

  fetchFacultyNames() {

    this.complaintService.fetchFacultyNames()
      .subscribe((res: any) => {
        localStorage.setItem('complaintFaculties', JSON.stringify(res));
      }, (err: any) => {

      });
  }

}
