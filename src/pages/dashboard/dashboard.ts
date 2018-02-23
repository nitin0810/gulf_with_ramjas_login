import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ComplaintService } from '../../services/complaint.service';
import { DashboardService } from '../../services/dashboard.service';
import { CustomService } from '../../services/custom.service';

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {

  title: string = "DASHBOARD";
  public complaintByStatus;
  public complaintByCategory;
  public suggestionByCategory;
  public responseByStatus: any = [];
  public responseComplaintByCategory: any = [];
  public responseSuggestionByCategory: any = [];
  public suggestionByStatus;
  public responseSuggestionByStatus: any = [];
  public complaintByStatusChartOptions;
  public complaintByCategotyChartOptions;
  public suggestionByCategotyChartOptions;
  public suggestionByStatusChartOptions;

  constructor(public navCtrl: NavController,
              private complaintService: ComplaintService,
              private customService: CustomService,
              private chartService: DashboardService) { }

  ngOnInit() {
    this.fetchStaticData();
  }

  onResize(event) {
    this.chartByComplaintStatus();
    this.chartBySuggestionStatus();
  }

  ionViewWillEnter() {
    // this.cs.showLoader();
    // this.chart.getDataByStatus().subscribe((res) => {
    //   setTimeout(() => {
    //     this.cs.hideLoader();
    //   }, 500);
    //   this.responseByStatus = res[0];
    //   this.responseSuggestionByStatus = res[1];
    //   this.chartByComplaintStatus();
    //   this.chartBySuggestionStatus();
    // });
    this.chartService.chartsByComplaintStatus().subscribe((res) => {
      this.responseByStatus = res;
      this.chartByComplaintStatus();
    });
    this.chartService.chartsBySuggestionStatus().subscribe((res) => {
      this.responseSuggestionByStatus = res;
      this.chartBySuggestionStatus();
    });
    this.chartService.chartsComplaintByCategory().subscribe((res) => {
      this.responseComplaintByCategory = res;
      this.chartComplaintByCategory();
    });
    this.chartService.chartsSuggestionByCategory().subscribe((res) => {
      this.responseSuggestionByCategory = res;
      this.chartSuggestionByCategory();
    })
  }

  chartSuggestionByCategory() {
    var data = [];
    data.push(['Category', 'suggestion', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseSuggestionByCategory.length; i++) {
      data.push([this.responseSuggestionByCategory[i].categoryName, this.responseSuggestionByCategory[i].count, this.responseSuggestionByCategory[i].categoryId]);
    }
    this.suggestionByCategory = data;
    this.suggestionByCategotyChartOptions = {
      title: "Suggestions Category",
      legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
      backgroundColor: 'transparent',
      titleTextStyle: {
        fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
        fontSize: 14
      },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
      chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '0%' },
      is3D: true
    }
  }

  chartComplaintByCategory() {
    var data = [];
    data.push(['Category', 'complaint', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseComplaintByCategory.length; i++) {
      data.push([this.responseComplaintByCategory[i].categoryName, this.responseComplaintByCategory[i].count, this.responseComplaintByCategory[i].categoryId]);
    }
    this.complaintByCategory = data;
    console.log(this.complaintByCategory);
    this.complaintByCategotyChartOptions = {
      title: "Complaints Category",
      legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
      backgroundColor: 'transparent',
      titleTextStyle: {
        fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
        fontSize: 14
      },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
      chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '0%' },
      is3D: true
    }
    console.log(this.complaintByCategotyChartOptions);
  }

  chartByComplaintStatus() {
    var data = [];
    data.push(['Category', 'complaint', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseByStatus.length; i++) {
      data.push([this.responseByStatus[i].statusName, this.responseByStatus[i].count, this.responseByStatus[i].statusId]);
    }
    this.complaintByStatus = data;
    console.log(this.complaintByStatus);
    this.complaintByStatusChartOptions = {
      title: "Complaints",
      legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
      backgroundColor: 'transparent',
      titleTextStyle: {
        fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
        fontSize: 14
      },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
      chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '0%' },
      is3D: true
    }
    console.log(this.complaintByStatusChartOptions);
  }

  chartBySuggestionStatus() {
    var data = [];
    data.push(['Status', 'suggestion', { type: 'number', role: 'scope' }]);
    for (let i = 0; i < this.responseSuggestionByStatus.length; i++) {
      data.push([this.responseSuggestionByStatus[i].statusName, this.responseSuggestionByStatus[i].count, this.responseSuggestionByStatus[i].statusId]);
    }
    this.suggestionByStatus = data;
    this.suggestionByStatusChartOptions = {
      title: "Suggestions",
      legend: { position: 'bottom', textStyle: { fontName: 'sans-serif', fontSize: 12 }, maxLines: 4 },
      backgroundColor: 'transparent',
      titleTextStyle: {
        fontName: '-apple-system, "Helvetica Neue", "Roboto", sans-serif',
        fontSize: 14
      },
      colors: ['#4CAF50', '#2196f3', '#FFEB3B', '#F48FB1', '#EF5350', '#9C27B0', '#003300'],
      chartArea: { left: '10%', height: "40%", width: "40%", bottom: '10%', right: '10%', top: '5%' },
      pieHole: 0.4,
      is3D: true
    }
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
