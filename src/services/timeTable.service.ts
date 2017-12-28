
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class TimeTableService {

    private empInfo: Array<any>;
    private pgmInfo: Array<any>;
    private yearInfo: Array<any>;
    private roomInfo: Array<any>;
    private slotInfo: Array<any>;
    private allInfoAvailable: boolean = false;

    constructor(
        public http: CustomHttpService,
    ) { }

   

    fetchEmployeeList() {

        return this.http.get(CONFIG.serverUrl + '/ad/timetable/employeeSummary');
    }

   
    fetchProgramList(eId:number) {

        return this.http.get(CONFIG.serverUrl + `/ad/timetable/employee/${eId}`);
    }

    fetchModuleAndYearList(pId:number,fId:number) {

        return this.http.get(CONFIG.serverUrl + `/ad/timetable/program/${pId}/faculty/${fId}`);
    }




    fetchAllRequiredData() {

        /**collect observables of all http requests */
        let empObservable = this.http.get(CONFIG.serverUrl + '/ad/timetable/employee');
        let pgmObservable = this.http.get(CONFIG.serverUrl + '/ad/timetable/program');
        let yearObservable = this.http.get(CONFIG.serverUrl + '/ad/timetable/program/year');
        let roomObservable = this.http.get(CONFIG.serverUrl + '/ad/room/all');
        let slotObservable = this.http.get(CONFIG.serverUrl + '/ad/slot');

        return Observable.forkJoin([empObservable, pgmObservable, yearObservable, roomObservable, slotObservable]);
    }

    isRequiredDataPresent() { return this.allInfoAvailable; }

    storeRequiredData(data: Array<any>) {

        [this.empInfo, this.pgmInfo, this.yearInfo, this.roomInfo, this.slotInfo] = data;
        // this.empInfo = data[0];
        // this.pgmInfo = data[1];
        // this.yearInfo = data[2];
        // this.roomInfo = data[3];
        // this.slotInfo = data[4];
        this.allInfoAvailable = true;
    }

    getRequiredData() {
        return [this.empInfo, this.pgmInfo, this.yearInfo, this.roomInfo, this.slotInfo];
    }

    clearStoredData() {

        this.empInfo = this.pgmInfo = this.yearInfo = this.slotInfo = this.roomInfo = null;
        this.allInfoAvailable = false;
    }
}