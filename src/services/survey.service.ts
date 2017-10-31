import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class SurveyService {

    constructor(
        public http: CustomHttpService,
    ) { }

    /**for management */
    submitSurvey(data){

    return this.http.post(CONFIG.serverUrl + `/ma/survey`,data);
    }

    fetchSurveysForManagement(isExpired: boolean,pageNo: number){

        return this.http.get(CONFIG.serverUrl + `/ma/survey/${isExpired}/page/${pageNo}`);
    }

}