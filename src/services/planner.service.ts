
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class PlannerService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer

    ) { }

    submitWithoutFile(formData: any) {

        return this.http.post(CONFIG.serverUrl + `/ma/planner`, formData);
    }


    submitWithFile(data: any) {

        let myFileName: string = data.file ? data.fileName: this.generateImageName();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            },
        }

        options.params = {};
        for (let key in data) {

            if (!(key == "file" || key == "image")) {
                options.params[key] = data[key];
            }
        }



        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, CONFIG.serverUrl + `/ma/planner`, options, false)
            .then((data: any) => {

                // console.log('inside service success');
                // alert(JSON.stringify(data));
                return JSON.parse(data.response);
            });

    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_'+date.substring(0, date.indexOf('.'))+ '.jpg';
    }

    fetchEventsByMonth(month: any) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${loginType}/planner/month/${month}`);
    }

    fetchEventsById(id: number) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${loginType}/planner/${id}`);
    }

    fetchTimeline(pageNo: number) {


        if (localStorage.getItem('isStudent') === "true") {

            return this.http.get(CONFIG.serverUrl + `/st/planner/page/${pageNo}`);

        }else {

            return this.http.get(CONFIG.serverUrl + `/ma/planner/false/page/${pageNo}`);
        }
    }

   
}