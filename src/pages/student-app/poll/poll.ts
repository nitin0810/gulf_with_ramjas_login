

import { Component } from '@angular/core';
import { IonicPage, Tabs } from 'ionic-angular';

import { CustomService } from '../../../services/custom.service';
import { PollService } from '../../../services/poll.service';

@IonicPage()
@Component({
    selector: 'poll',
    templateUrl: './poll.html',
    styles: [` `]
})

export class PollStudent {

    title: string = "Poll";
    pollList: Array<any>;
    pageNo: number = 1; //page counter for pagination

    constructor(
        private customService: CustomService,
        private pollService: PollService
    ) {
        this.getPolls();
    }

    getPolls() {

        this.customService.showLoader();

        this.pollService.fetchPollListForStudent(1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.pollList.forEach((element) => {

                    element.selectedOptions = [];
                    element.isVoteBtnEnabled = false;
                });
                this.customService.hideLoader();
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }


    changeVoteBtnStatus(poll: any) {

        if (poll.optionTypeId == 1) {
            poll.isVoteBtnEnabled = poll.selectedOptions.length != 0;
        }
        else {
            poll.isVoteBtnEnabled = poll.selectedOptions.find((element: boolean) => {
                return element;
            });

        }
    }


    onVote(poll: any,index:number) {

        let payLoad = this.buildPayload(poll);
        this.submitResponse(poll.id,payLoad,index);
    }

    buildPayload(poll: any) {

        let data: Array<number> = []; // array of selected options ids
        if (poll.optionTypeId == 1) {
            data = poll.selectedOptions;
        }
        else {
            // populate the data array with options ids  
            poll.selectedOptions.forEach((element: boolean, index: number) => {
                //index of the element with value 'true' is same as index of corresponding 
                //selected option in poll.options array
                if (element) {
                    data.push(poll.options[index].id);
                };
            });

        }

        return data;
    }

    submitResponse(id:number,payLoad:Array<number>,index:number){

        this.customService.showLoader();
        this.pollService.votePoll(id, payLoad)
            .subscribe((res: any) => {

                this.customService.hideLoader();
                this.pollList.splice(index,1);
                this.customService.showToast(res.message || res.developerMessage || 'Poll Voted Successfully');
            }, (err: any) => {

                this.customService.hideLoader();
                this.customService.showToast(err.msg);
            });
    }



    doRefresh(refresher: any) {

        this.pollService.fetchPollListForStudent(1)
            .subscribe((res: any) => {

                this.pollList = res;
                this.pollList.forEach((element) => {

                    element.selectedOptions = [];
                    element.isVoteBtnEnabled = false;

                });
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }

    doInfinite(refresher: any) {

        this.pollService.fetchPollListForStudent(this.pageNo + 1)
            .subscribe((res: any) => {

                if (res && res.length != 0) {
                    this.pollList.push(res);
                    this.pageNo++;
                }
                refresher.complete();
            }, (err: any) => {

                refresher.complete();
                this.customService.showToast(err.msg);
            });
    }
}
