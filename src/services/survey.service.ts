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

    fetchSurveysForManagement(isExpired: boolean, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/survey/${isExpired}/page/${pageNo}`);
    }

    /**for student */
    fetchSurveysForStudent(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/survey/page/${pageNo}`);
    }

    voteSurvey(data:any, id: number) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.post(CONFIG.serverUrl + `/${loginType}/survey/${id}`, data);
    }

    fetchSurveyById(id: number) {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${loginType}/survey/${id}`);
    }

}