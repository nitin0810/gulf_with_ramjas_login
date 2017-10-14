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

    if (localStorage.getItem('isStudent') === "true") {

      if (!localStorage.getItem('complaintFaculties')) { this.fetchFacultyNames(); }
      if (!localStorage.getItem('complaintCategories')) { this.fetchComplaintCategories(); }
    }
    else {
      
      if (!localStorage.getItem('complaintFaculties')) { this.fetchFacultyNamesForManagement(); }
    }
    /**following data is to be used in sorting and filtering */
    if (!localStorage.getItem('complaintCategoryOptions')) { this.fetchCategoryOptions(); } // for filtering purpose
    if (!localStorage.getItem('complaintStatusList')) { this.fetchStatusList(); }
    if (!localStorage.getItem('complaintPriorityList')) { this.fetchPriorityList(); }
  }

  fetchCategoryOptions() {
    
        this.complaintService.fetchCategoryOptions()
          .subscribe((res: any) => {
    
            localStorage.setItem('complaintCategoryOptions', JSON.stringify(res));
          }, (err: any) => {
    
          });
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

  fetchFacultyNamesForManagement() {

    this.complaintService.fetchFacultyNamesForManagement()
      .subscribe((res: any) => {
        localStorage.setItem('complaintFaculties', JSON.stringify(res));
      }, (err: any) => {

      });
  }

  fetchStatusList() {

    this.complaintService.fetchStatusList()
      .subscribe((res: any) => {

        localStorage.setItem('complaintStatusList', JSON.stringify(res));
      }, (err: any) => {

      });

  }


  fetchPriorityList() {
    this.complaintService.fetchPriorityList()
      .subscribe((res: any) => {

        localStorage.setItem('complaintPriorityList', JSON.stringify(res));
      }, (err: any) => {

      });
  }


}
