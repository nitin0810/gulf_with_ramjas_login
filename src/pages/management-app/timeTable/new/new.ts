import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { TimeTableService } from '../../../../services/timeTable.service';

@IonicPage()
@Component({
    selector: 'time-table-new',
    templateUrl: './new.html',
    styles: [` `]
})

export class NewTimeTablePageManagement implements OnInit {

    title: string = 'New';

    /**data required to create the timetable */
    empList: Array<any>;
    pgmList: Array<any>;
    moduleAndYearList: Array<any>;
    roomList: Array<any>;
    slotList: Array<any>;

    /**ngModal variables */
    employee: any;
    employeeName: string = '';
    program: any;
    moduleYearObject:any;

    constructor(
        private viewCtrl: ViewController,
        private customService: CustomService,
        private mdlCtrl: ModalController,
        private timeTableService: TimeTableService
    ) { }

    ngOnInit() {
        this.getEmployeeList();
    }

    getEmployeeList() {

        this.customService.showLoader();
        this.timeTableService.fetchEmployeeList()
            .subscribe((res: any) => {

                this.empList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    onnSelectFaculty() {

        let searchPage = this.mdlCtrl.create("FacultySearchPage", { 'searchList': this.empList, 'title': 'Faculty' });
        searchPage.present();
        searchPage.onDidDismiss((selected) => {
            if (selected) {

                /**fetch programs only if faculty is seleted first time OR is other than previously selected one*/
                if (!this.employee || this.employee.id !== selected.selectedSearch.id) {
                    this.onFacultyChange(selected.selectedSearch.id);
                }
                this.employee = selected.selectedSearch;
                this.employeeName = this.employee.name;
                this.moduleAndYearList=null;
            }
        });
    }

    onFacultyChange(eId: number) {

        this.customService.showLoader('Fetching Programs...');
        this.timeTableService.fetchProgramList(eId)
            .subscribe((res: any) => {

                this.pgmList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });

    }

    onProgramChange(){
        console.log('pppp change',this.program);
        this.customService.showLoader();
        this.timeTableService.fetchModuleAndYearList(this.program.programId,this.employee.id)
            .subscribe((res: any) => {

                this.moduleAndYearList = res;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    onSubmit() {

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}