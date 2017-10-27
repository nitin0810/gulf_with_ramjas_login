
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class PollService {

    constructor(
        public http: CustomHttpService,
    ) { }

    /**following urls are for student only */
    fetchPollListForStudent(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/poll/page/${pageNo}`);
    }

    votePoll(pollId: number, pollResponse: Array<number>) {

        return this.http.post(CONFIG.serverUrl + `/st/poll/${pollId}`, pollResponse);
    }

    /**following urls are for management only */

    fetchPollListToVoteForManagement(pageNo: number) { // fetches polls that management has to vote

        return this.http.get(CONFIG.serverUrl + `/ma/poll/page/${pageNo}`);
    }

    votePollManagement(pollId: number, pollResponse: Array<number>) { 

        return this.http.post(CONFIG.serverUrl + `/ma/poll/${pollId}`, pollResponse);
    }

    fetchPollListForManagement(isExpired: boolean, pageNo: number) {  // fetches polls that management has created

        return this.http.get(CONFIG.serverUrl + `/ma/poll/${isExpired}/page/${pageNo}`);
    }

    fetchPollById(id: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/poll/${id}`);
    }
    searchManagement(isExpired: boolean, pageNo: number, searchValue: string) {

        return this.http.post(CONFIG.serverUrl + `/ma/poll/${isExpired}/search/page/${pageNo}`, { search: searchValue });
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

    submitPoll(data) {

        return this.http.post(CONFIG.serverUrl + `/ma/poll`, data);
    }

}
