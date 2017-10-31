import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class SurveyService {

    constructor(
        public http: CustomHttpService,
    ) { }

    /**for management */
    submitSurvey(data) {

        return this.http.post(CONFIG.serverUrl + `/ma/survey`, data);
    }

    fetchSurveysForManagement(isExpired: boolean, pageNo: number) { // made by managment himself

        return this.http.get(CONFIG.serverUrl + `/ma/survey/${isExpired}/page/${pageNo}`);
    }

    fetchVotableSurveysForManagement(pageNo: number) {
        console.log('service: ', this.http);

        return this.http.get(CONFIG.serverUrl + `/ma/survey/page/${pageNo}`);
    }

    fetchSurveyByIdManagement(id: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/survey/${id}/questions`);
    }

    fetchSurveyResultById(id: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/survey/${id}`);
    }

    /**for student */
    fetchSurveysForStudent(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/survey/page/${pageNo}`);
    }

    fetchSurveyByIdStudent(id: number) {

        return this.http.get(CONFIG.serverUrl + `/st/survey/${id}`);
    }

    /**for both student and management */
    voteSurvey(data: any, id: number) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.post(CONFIG.serverUrl + `/${loginType}/survey/${id}`, data);
    }
}