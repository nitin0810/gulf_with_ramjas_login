
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class AssignmentService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    /**services for management */
    fetchYears() {

        let isFaculty = localStorage.getItem('faculty') === "true";
        return this.http.get(CONFIG.serverUrl + `/ma/assignment/year/${isFaculty}`);
    }

    fetchModules(yearId: number) {

        let isFaculty = localStorage.getItem('faculty') === "true";
        return this.http.get(CONFIG.serverUrl + `/ma/assignment/module/${yearId}/${isFaculty}`);
    }

    fetchAssignments(isExpired: boolean, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/assignment/${isExpired}/page/${pageNo}`);
        // return this.http.get(CONFIG.serverUrl + `/ma/assignment/${pageNo}`);

    }

    postAssignmentWithFile(data: any) {

        let myFileName: string = this.generateFileName(data.file);

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            },
            params: {
                "description": data.description,
                "dueDate": data.dueDate,
                'moduleId': data.moduleId,
                'yearId': data.yearId,
                'files': myFileName

            }
        }

        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, CONFIG.serverUrl + `/ma/assignment`, options, false)
            .then((data: any) => {

                // console.log('inside service success');
                // alert(JSON.stringify(data));
                return JSON.parse(data.response);
            });

    }

    generateFileName(file:any) {
        //generate unique filename based on current date-time
        let date  = new Date().toISOString();
        let fileName = date.substring(0,date.indexOf('.'));
        console.log(fileName);
        console.log(file);
        
        return file? fileName+'.pdf':fileName+'.jpg';
    }

    // fetchStudents(yearId: number, moduleId: number) {

    //     return this.http.get(CONFIG.serverUrl + `/ma/appreciation/students/${moduleId}/${yearId}`);
    // }
  
    postAssignment(data: any) {

        return this.http.post(CONFIG.serverUrl + `/ma/assignment`, data);
    }

    // fetchAppreciationsManagementByMe(pageNo: number) {

    //     return this.http.get(CONFIG.serverUrl + `/ma/appreciation/page/${pageNo}`);
    // }

    // fetchAppreciationsManagementForMe(pageNo: number) {

    //     return this.http.get(CONFIG.serverUrl + `/ma/appreciation/forFaculty/page/${pageNo}`);
    // }

    // /**services for management */
    // fetchFaculties() {

    //     let programId = localStorage.getItem('programId');
    //     let yearId = localStorage.getItem('yearId');
    //     let isEvenSem = localStorage.getItem('isEvenSemester') === "true";

    //     return this.http.get(CONFIG.serverUrl + `/st/appreciation/faculty/${programId}/${yearId}/${isEvenSem}`);
    // }

    // postAppreciationStudent(data: any) {

    //     return this.http.post(CONFIG.serverUrl + `/st/appreciation`, data);
    // }

    // fetchAppreciationsStudentByMe(pageNo: number) {

    //     return this.http.get(CONFIG.serverUrl + `/st/appreciation/page/${pageNo}`);
    // }

    // fetchAppreciationsStudentForMe(pageNo: number) {

    //     return this.http.get(CONFIG.serverUrl + `/st/appreciation/forStudent/page/${pageNo}`);
    // }
}