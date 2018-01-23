

import { Component,ElementRef} from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { PollService } from '../../../../services/poll.service';
import { CustomService } from '../../../../services/custom.service';

@IonicPage()
@Component({
    selector: 'currentPoll',
    templateUrl: './currentPoll.html',
    styles: [` 
    ion-searchbar{
        top: 0px;
      }
      div[subHeader]{
        position: fixed;
        z-index: 1;
        transition: top 0.5s ease;
        width: 100%;
        top: 72px;
      }
      .hide-filter{
        top: -50px !important;
        }
        .show-filter{
          top: 72px;
        }
        ion-item[blank]{
          height: 84px;
        }
    `]
})

export class CurrentPollPageManagement {

      //variables for scroll
    start = 0;
    threshold = 100;
    slideHeaderPrevious = 0;
    ionScroll:any;
    showHelpers:boolean;
    hideHelpers:boolean;
    headercontent:any;

    title: string = "Poll (By Me)";
    /**properties bound to list template */
    pollList: Array<any> ;
    arePollExpired:boolean;

    /**own properties */
    pageNo: number = 1;
    pageNoWithSearch: number = 1;
    searchInput: string = '';
    searchInProcess: boolean = false;
    debounceDuration: number = 400;

    constructor(
        private modalCtrl: ModalController,
        private pollService: PollService,
        private customService: CustomService,
        public myElement: ElementRef,
    ) {
        this.fetchPollList();
      
    }

    ngOnInit() {
        // Ionic scroll element
        this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
        // On scroll function
        this.ionScroll.addEventListener('scroll', () => {
            if (this.ionScroll.scrollTop - this.start > this.threshold) {
                this.showHelpers = true;
                this.hideHelpers = false;
            } else {
                this.showHelpers = false;
                this.hideHelpers = true;
            }
            if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
                this.showHelpers = false;
                this.hideHelpers = true;
            }
            this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
        });
    }


    fetchPollList() {

        this.customService.showLoader();
        /** 1st param 'false' indicates that expired poll list is to be fethced  */
        this.pollService.fetchPollListForManagement(false, 1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.arePollExpired = false;
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }

    openNewPollModal() {
        let modal = this.modalCtrl.create("NewPollPageManagement");
        modal.present();
        modal.onDidDismiss((returnedData: any) => {

            if (returnedData.data) {

                this.pollList.unshift(returnedData.data);
            }
        });
    }

    onSearchInput(event: any) {

        /** Event type has been checked to remove a severe error: 
           * on clicking cross btn, the mouse event is also fired and ` if (this.searchInput.trim().length == 0)`
           * condition was becoming true, which was causing  double request to server.
           * Hence only input event is allowed 
           *  */
        if (event.type != 'input') { return; }

        if (this.searchInput.trim().length >= 1) {

            this.sendSearchRequest();
        }

        if (this.searchInput.trim().length == 0) {

            this.fetchPollList();
        }
    }

    sendSearchRequest() {

        this.searchInProcess = true;
        this.pageNoWithSearch = 1;
        this.pollService.searchManagement(false, this.pageNoWithSearch, this.searchInput)
            .subscribe((res: any) => {

                this.pollList = res;
                this.searchInProcess = false;
            }, (err: any) => {

                this.customService.showToast(err.msg);
                this.searchInProcess = false;

            });
    }

    onSearchClear(event: any) {

        this.fetchPollList();
    }

    doRefresh(refresher: any) {

        this.pollService.fetchPollListForManagement(false, 1)
            .subscribe((res: any) => {

                this.pollList = res;
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

            this.pollService.fetchPollListForManagement(false, this.pageNo + 1)
                .subscribe((res: any) => {

                    if (res && res.length != 0) {
                        this.pollList = this.pollList.concat(res);
                        this.pageNo++;
                    }
                    refresher.complete();
                }, (err: any) => {

                    refresher.complete();
                    this.customService.showToast(err.msg);
                });
        } else {

            this.pollService.searchManagement(false, this.pageNoWithSearch + 1, this.searchInput)
                .subscribe((res: any) => {

                    if (res && res.length != 0) {
                        this.pollList = this.pollList.concat(res);
                        this.pageNoWithSearch++;
                    }
                    refresher.complete();
                }, (err: any) => {

                    refresher.complete();
                    this.customService.showToast(err.msg);
                });;
        }


    }


}
