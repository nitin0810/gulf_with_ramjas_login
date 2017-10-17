
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class PollService {

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchPollList(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/poll/page/${pageNo}`);
    }

    fetchPollAudience() {

        return this.http.get(CONFIG.serverUrl + '/ma/poll/save-info');

    }

    fetchDepartments() {

        return this.http.get(CONFIG.serverUrl + '/ma/poll/audience/department');
    }

    fetchPrograms() {

        return this.http.get(CONFIG.serverUrl + '/ma/poll/audience/program');
    }

    fetchYears() {

        return this.http.get(CONFIG.serverUrl + '/ma/poll/audience/program/year');
    }

    fetchModulesByYearId(yearId: number) {

        let isFaculty = localStorage.getItem('faculty') === "true";
        return this.http.get(CONFIG.serverUrl + `/ma/poll/audience/module/${yearId}/${isFaculty}`);

    }
    
    fetchYearsForModules() {

        let isFaculty = localStorage.getItem('faculty') === "true";
        return this.http.get(CONFIG.serverUrl + `/ma/poll/audience/module/year/${isFaculty}`);

    }

    submitPoll(data){

        return this.http.post(CONFIG.serverUrl + `/ma/poll`, data);
        
    }

}
