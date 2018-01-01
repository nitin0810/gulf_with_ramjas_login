
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class PollService {

    private pollAudienceList: Array<any>;
    private optionTypesPossible: Array<any>;
    private optionLimit: number;
    private departments: Array<any>;
    private programList: Array<any>;
    private yearList: Array<any>;
    private yearListForModule: Array<any>;

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
    /**below urls fetch the data required to create the poll */
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

    /**below urls save the data required to create the poll, so that it can be reused when reqired */
    savePollAudience(list: Array<any>, otp: Array<any>, ol: number) {

        this.pollAudienceList = list;
        this.optionTypesPossible = otp;
        this.optionLimit = ol;
    }

    saveDepartments(dept: Array<any>) {
        this.departments = dept;
    }

    saveProgramaAndYearList(pl: Array<any>, yl: Array<any>) {

        this.programList = pl, this.yearList = yl;
    }

    saveYearListForModule(yl: Array<any>) {
        this.yearListForModule = yl;
    }

    /**below urls return the catched data */

    getYearListForModule() {
        return this.yearListForModule;
    }

    getDepartments() {
        return this.departments;
    }

    getProgramAndYearList() {
        return this.programList ?[this.programList, this.yearList]:null;
    }

    getPollAudienceList() :Array<any>{
        return this.pollAudienceList ? [this.pollAudienceList, this.optionTypesPossible, this.optionLimit] : null;
    }


    submitPoll(data) {

        return this.http.post(CONFIG.serverUrl + `/ma/poll`, data);
    }

    editExpiryDate(newDate: any, pollId: number) {

        return this.http.put(CONFIG.serverUrl + `/ma/poll/${pollId}`, newDate);
    }

}
