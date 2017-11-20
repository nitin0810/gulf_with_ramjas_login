
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

        let myFileName: string = data.file ? data.fileName : this.generateImageName();

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

    addFileToEvent(data: any) {

        let myFileName: string = data.file ? data.fileName : this.generateImageName();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            httpMethod:"PUT",
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            },
        }

        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, CONFIG.serverUrl + `/ma/planner/${data.eventId}/file`, options, false)
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


    /**-------------------- methods above this are related with files--------------------- */


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

        } else {

            return this.http.get(CONFIG.serverUrl + `/ma/planner/false/page/${pageNo}`);
        }
    }

    deleteEvent(id: number) {

        return this.http.delete(CONFIG.serverUrl + `/ma/planner/${id}`);
    }

    editEvent(id: number, editedData: any) {

        return this.http.put(CONFIG.serverUrl + `/ma/planner/${id}`, editedData);
    }

    deleteEventFile(eventId: number, fileUrl: string) {

        return this.http.delete(CONFIG.serverUrl + `/ma/planner/${eventId}/file/${fileUrl}`);
    }

}