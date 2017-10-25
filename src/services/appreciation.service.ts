
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AppreciationService {

    isFaculty: boolean;
    constructor(
        public http: CustomHttpService,
    ) {
        this.isFaculty = localStorage.getItem('faculty') === "true"; // used in case of management
    }

    /**services for management */
    fetchYears() {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/year/${this.isFaculty}`);
    }

    fetchModules(yearId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/module/${yearId}/${this.isFaculty}`);
    }

    fetchStudents(yearId: number, moduleId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/students/${moduleId}/${yearId}`);
    }

    postAppreciation(data: any) {

        return this.http.post(CONFIG.serverUrl + `/ma/appreciation`, data);
    }

    fetchAppreciationsManagementByMe(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/page/${pageNo}`);
    }

    fetchAppreciationsManagementForMe(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/forFaculty/page/${pageNo}`);
    }

    /**services for management */
    fetchFaculties() {

        let programId = localStorage.getItem('programId');
        let yearId = localStorage.getItem('yearId');
        let isEvenSem = localStorage.getItem('isEvenSemester') === "true";

        return this.http.get(CONFIG.serverUrl + `/st/appreciation/faculty/${programId}/${yearId}/${isEvenSem}`);
    }

    postAppreciationStudent(data: any) {

        return this.http.post(CONFIG.serverUrl + `/st/appreciation`, data);
    }

    fetchAppreciationsStudentByMe(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/appreciation/page/${pageNo}`);
    }

    fetchAppreciationsStudentForMe(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/appreciation/forStudent/page/${pageNo}`);
    }
}