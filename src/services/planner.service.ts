
import { Injectable } from '@angular/core';

import *  as config from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class PlannerService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer

    ) { }

    getCameraOptions(dType: number, sType: number, eType: number) {

        return config.getCameraOptions(dType, sType, eType);
    }

    submitWithoutFile(formData: any) {

        return this.http.post(config.APP_CONSTANTS.serverUrl + `/ma/planner`, formData);
    }


    submitWithFile(data: any) {

        let myFileName: string = data.file ? data.fileName : this.generateImageName();

        let options: FileUploadOptions = config.fileUploadOptions(myFileName);

        options.params = {};
        for (let key in data) {

            if (!(key == "file" || key == "image")) {
                options.params[key] = data[key];
            }
        }



        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, config.APP_CONSTANTS.serverUrl + `/ma/planner`, options, false)
            .then((data: any) => {

                // console.log('inside service success');
                // alert(JSON.stringify(data));
                return JSON.parse(data.response);
            });

    }

    addFileToEvent(data: any) {

        let myFileName: string = data.file ? data.fileName : this.generateImageName();

        let options: FileUploadOptions = config.fileUploadOptions(myFileName, undefined, "PUT");

        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, config.APP_CONSTANTS.serverUrl + `/ma/planner/${data.eventId}/file`, options, false)
            .then((data: any) => {

                // console.log('inside file add service success');
                // alert(JSON.stringify(data));
                return JSON.parse(data.response);
            });
    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }


    /**-------------------- methods above this are related to files--------------------- */


    fetchEventsByMonth(month: any) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(config.APP_CONSTANTS.serverUrl + `/${loginType}/planner/month/${month}`);
    }

    fetchEventsById(id: number) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(config.APP_CONSTANTS.serverUrl + `/${loginType}/planner/${id}`);
    }

    fetchTimeline(pageNo: number) {


        if (localStorage.getItem('isStudent') === "true") {

            return this.http.get(config.APP_CONSTANTS.serverUrl + `/st/planner/page/${pageNo}`);

        } else {

            return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/planner/false/page/${pageNo}`);
        }
    }

    deleteEvent(id: number) {

        return this.http.delete(config.APP_CONSTANTS.serverUrl + `/ma/planner/${id}`);
    }

    editEvent(id: number, editedData: any) {

        return this.http.put(config.APP_CONSTANTS.serverUrl + `/ma/planner/${id}`, editedData);
    }

    deleteEventFile(eventId: number, fileUrl: string) {

        let headers = new Headers();
        headers.append('Authorization', localStorage.getItem('access_token'));
        headers.append('account', localStorage.getItem('loginType'));
        headers.append('fileUrl', fileUrl);

        const options = new RequestOptions(
            { headers: headers }
        );

        return this.http.delete(config.APP_CONSTANTS.serverUrl + `/ma/planner/${eventId}/file`, options)
            .map(this.http.extractData)
            .catch(this.http.handleError);
    }
    

}