import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AssessmentService {

    constructor(
        public http: CustomHttpService,
    ) {
    }

    /**for management */

    fetchYears() {

        let isManagement = localStorage.getItem('isStudent') !== "true";
        return this.http.get(CONFIG.serverUrl + `/ma/assesment/year/${isManagement}`);
    }

    fetchModules(yearId: number) {

        let isManagement = localStorage.getItem('isStudent') !== "true";
        return this.http.get(CONFIG.serverUrl + `/ma/assesment/module/${yearId}/${isManagement}`);
    }

    fetchStudents(formOrSumm: string, yearId: number, moduleId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/assesment/${formOrSumm}/students/${moduleId}/${yearId}`);
    }

    fetchAssessmentTypes(formOrSumm: string) {

        return this.http.get(CONFIG.serverUrl + `/ma/assesment/${formOrSumm}/type`);
    }

    submitAssessment(formOrSumm: string, data: any) {

        return this.http.post(CONFIG.serverUrl + `/ma/assesment/${formOrSumm}`, data);

    }

    /**for both management and student */
    fetchAssessments(formOrSumm: string, pageNo: number) {

        let user = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${user}/assesment/${formOrSumm}/page/${pageNo}`);
    }

    fetchAssessmentsById(formOrSumm: string, id: number) {

        let user = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${user}/assesment/${formOrSumm}/${id}`);

    }
}