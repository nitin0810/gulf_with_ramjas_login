import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CustomService } from '../../../../services/custom.service';
import { CircularService } from '../../../../services/circular.service';


@IonicPage()
@Component({
    selector: 'circular-list',
    templateUrl: './list.html',
    styles: [` `]
})

export class CircularStudentListPage {

    title: string = "Circular";
    circularList: Array<any>;
    pageNo: number = 1; //page counter for pagination

    constructor(
        private customService: CustomService,
        private circularService: CircularService,
        private modalCtrl: ModalController
    ) {
        this.getCirculars();
    }

    getCirculars(refresher?: any) {

        !refresher && this.customService.showLoader();

        this.circularService.fetchCircularListForStudent(1)
            .subscribe((res: any) => {

                this.circularList = res;
                if (refresher) {
                    this.pageNo = 1;
                    refresher.complete();
                } else {
                    this.customService.hideLoader();
                }
            }, (err: any) => {

                refresher ? refresher.complete() : this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openViewCircular(circularData:any) {
        const modal = this.modalCtrl.create("CircularStudentViewPage", { 'circularData': circularData });
        modal.present();
    }

    doRefresh(refresher: any) {

        this.getCirculars(refresher);
    }

    doInfinite(refresher: any) {

        this.circularService.fetchCircularListForStudent(this.pageNo + 1)
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
    }
}
