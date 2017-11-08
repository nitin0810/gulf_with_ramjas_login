
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AssignmentService {

    constructor(
        public http: CustomHttpService,
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

    fetchAssignments(isExpired:boolean,pageNo:number){

        return this.http.get(CONFIG.serverUrl + `/ma/assignment/${isExpired}/page/${pageNo}`);
        // return this.http.get(CONFIG.serverUrl + `/ma/assignment/${pageNo}`);
        
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