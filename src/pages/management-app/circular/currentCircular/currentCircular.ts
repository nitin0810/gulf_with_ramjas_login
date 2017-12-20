import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, ModalController, Modal } from 'ionic-angular';
import { CircularService } from '../../../../services/circular.service';
import { CustomService } from '../../../../services/custom.service';


@IonicPage()
@Component({
    selector: 'circular',
    templateUrl: 'currentCircular.html'
})
export class CurrentCircularPageComponent implements OnInit{

    title: string = "Circular";

    /**properties bound to list template */
    circularList: Array<any> ;
    areCircularExpired: boolean;

    expiredRequest: boolean;

    /**own properties */
    pageNo: number = 1;
    pageNoWithSearch: number = 1;
    searchInput: string = '';
    searchInProcess: boolean = false;
    debounceDuration: number = 400;
    

    constructor(
        public modalCtrl: ModalController,
        public customService: CustomService,
        public circularService: CircularService 
    ){
        //this.fetchCircularList();
        this.expiredRequest = false;
    }

    ngOnInit(){
        this.fetchCircularList();
    }

    

    fetchCircularList() {
        
        this.customService.showLoader();
        /** 1st param 'false' indicates that expired Circular list is to be fethced  */
        this.circularService.fetchCircularListForManagement(this.expiredRequest, 1)
            .subscribe((res: any) => {

                this.circularList = res;
                this.areCircularExpired = false;
                this.customService.hideLoader();
                console.log(res);
                
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openModal(){
        
        const newCircularModal:Modal = this.modalCtrl.create('NewCircularComponent');
        
        newCircularModal.present();
    }

    doRefresh(refresher: any) {
        
        this.circularService.fetchCircularListForManagement(this.expiredRequest, 1)
            .subscribe((res: any) => {

                this.circularList = res;
                this.pageNo = 1;
                this.pageNoWithSearch = 1;
                this.searchInput = '';
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }

    doInfinite(refresher: any) {

        if (this.searchInput.trim().length == 0) {

            this.circularService.fetchCircularListForManagement(this.expiredRequest, this.pageNo + 1)
            .subscribe((res: any) => {

                if (res && res.length != 0) {
                    this.circularList = this.circularList.concat(res);
                    this.pageNo++;
                }
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
        } else {

            this.circularService.searchManagement(this.expiredRequest, this.pageNoWithSearch + 1, this.searchInput)
            .subscribe((res: any) => {

                if (res && res.length != 0) {
                    this.circularList = this.circularList.concat(res);
                    this.pageNoWithSearch++;
                }
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });;
        }


    }

    clearNewcircularData() {

        /**following items have been stored in newcircular module */
        localStorage.removeItem('circularAudienceList');
        localStorage.removeItem('circularOptionTypes');
        localStorage.removeItem('circularOptionLimit');
        localStorage.removeItem('circularDepartmentList');
        localStorage.removeItem('circularProgramList');
        localStorage.removeItem('circularYearList');
        localStorage.removeItem('circularModuleYears');

    }
}