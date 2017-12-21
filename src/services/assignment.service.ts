
import { Injectable } from '@angular/core';

import * as config from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class AssignmentService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    getCameraOptions(dType: number, sType: number, eType: number) {

        return config.getCameraOptions(dType, sType, eType);
    }

    /**services for management */
    fetchYears() {

        let isFaculty = localStorage.getItem('faculty') === "true";
        return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/assignment/year/${isFaculty}`);
    }

    fetchModules(yearId: number) {

        let isFaculty = localStorage.getItem('faculty') === "true";
        return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/assignment/module/${yearId}/${isFaculty}`);
    }

    fetchAssignments(isExpired: boolean, pageNo: number) {

        return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/assignment/${isExpired}/page/${pageNo}`);
        // return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/assignment/${pageNo}`);

    }

    postAssignmentWithFile(data: any) {

        let myFileName: string = this.generateFileName(data.file);

        let options: FileUploadOptions = config.fileUploadOptions(myFileName);
        options.params = {
            "description": data.description,
            "dueDate": data.dueDate,
            'moduleId': data.moduleId,
            'yearId': data.yearId,
            'files': myFileName

        };

        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, config.APP_CONSTANTS.serverUrl + `/ma/assignment`, options, false)
            .then((data: any) => {

                console.log('inside service success');
                alert(JSON.stringify(data));
                return JSON.parse(data.response);
            });

    }

    generateFileName(file: any) {
        //generate unique filename based on current date-time
        let date = new Date().toISOString();
        let fileName = date.substring(0, date.indexOf('.'));
        return file ? fileName + '.pdf' : fileName + '.jpg';
    }

    postAssignment(data: any) {

        return this.http.post(config.APP_CONSTANTS.serverUrl + `/ma/assignment`, data);
    }

    /**for student */

    fetchAssignmentsForStudent(isExpired: boolean, pageNo: number) {

        return this.http.get(config.APP_CONSTANTS.serverUrl + `/st/assignment/page/${pageNo}`);
    }


}