
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

        let myFileName: string = this.generateFileName(data.file);

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
                alert(JSON.stringify(data));
                return JSON.parse(data.response);
            });

    }

    generateFileName(file: any) {
        //generate unique filename based on current date-time
        let date = new Date().toISOString();
        let fileName = date.substring(0, date.indexOf('.'));//ignore milliseconds
        console.log(fileName);
        console.log(file);

        return file ? fileName + '.pdf' : fileName + '.jpg';
    }

    fetchEventsByMonth(month:any){

        return this.http.get(CONFIG.serverUrl+`/ma/planner/month/${month}`);
    }

}