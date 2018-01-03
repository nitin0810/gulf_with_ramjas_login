
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


@Injectable()
export class TimeTableService {

    private todayId: number;

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchEmployeeandRSDInfo() {

        /**collect observables of all http requests */
        let empObservable = this.http.get(CONFIG.serverUrl + '/ad/timetable/employee');
        let roomObservable = this.http.get(CONFIG.serverUrl + '/ad/room');
        let slotObservable = this.http.get(CONFIG.serverUrl + '/ad/slot');
        let dayObservable = this.http.get(CONFIG.serverUrl + '/ad/day');

        return Observable.forkJoin([empObservable, roomObservable, slotObservable, dayObservable]);
    }

    fetchProgramList(eId: number) {

        return this.http.get(CONFIG.serverUrl + `/ad/timetable/employee/${eId}`);
    }

    fetchModuleAndYearList(pId: number, fId: number) {

        return this.http.get(CONFIG.serverUrl + `/ad/timetable/program/${pId}/faculty/${fId}`);
    }


    submitTimetable(data: any) {

        return this.http.post(CONFIG.serverUrl + `/ad/timetable`, data);
    }

    /**Above requests are related to creating the timetable */

    fetchTimetableByWeek() {

        let loginType: string = localStorage.getItem('loginType') === "student" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${loginType}/timetable/week`);
    }

    setTodayId(id: number) {
        this.todayId = id;
    }

    returnDateOfSelectedDay(selectedDayId: number) {

        let d = new Date();
        return new Date(d.getTime() + (selectedDayId-this.todayId) *86400000);
    }

    returnDayId(dayName: string) {
        switch (dayName) {
            case 'Mon': return 1;
            case 'Tue': return 2;
            case 'Wed': return 3;
            case 'Thu': return 4;
            case 'Fri': return 5;
            case 'Sat': return 6;
            case 'Sun': return 7;

        }
    }

}