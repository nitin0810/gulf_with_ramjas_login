
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class TimeTableService {

    private todayId: number;
    private days: Array<any>;

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchEmployeeandRSDInfo() {

        /**collect observables of all http requests */
        let empObservable = this.http.get(CONFIG.serverUrl + '/ad/timetable/employee');
        let roomObservable = this.http.get(CONFIG.serverUrl + '/ad/room');
        let slotObservable = this.http.get(CONFIG.serverUrl + '/ad/slot');
        let dayObservable = this.http.get(CONFIG.serverUrl + '/ad/day');

        /**simultaneously send all requests*/
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

    /**--------------------------------------------------------------------------------------------- */

    fetchFacultyAndDaysAndSlots(pId: number, yId: number, isEven: boolean) {

        let slotObservable = this.http.get(CONFIG.serverUrl + '/ad/slot');
        let dayObservable = this.http.get(CONFIG.serverUrl + '/ad/day');
        let facultyObservable = this.http.get(CONFIG.serverUrl + `/ad/timetable/faculty/${pId}/${yId}/${isEven}`);
        /**simultaneously send all requests*/
        return Observable.forkJoin([slotObservable, dayObservable, facultyObservable]);
    }

    editTimetable(data: any, tId: number) {

        return this.http.put(CONFIG.serverUrl + `/ad/timetable/${tId}`, data);
    }

    /**Above requests are related to edit the timetable  */

    /**--------------------------------------------------------------------------------------------- */


    /**fetches the list of days to display in timetable view  */
    fetchDaysAndTimeTable() {

        let loginType: string = localStorage.getItem('loginType') === "student" ? 'st' : JSON.parse(localStorage.getItem('roles')).indexOf('ADMIN') > -1 ? 'ad' : 'ma';

        return this.http.get(CONFIG.serverUrl + `/${loginType}/day`)
            .flatMap((res: any) => {
                this.storeDays(res);
                return this.fetchTimetableByWeek(loginType);
            });
    }

    private fetchTimetableByWeek(loginType: string) {

        return this.http.get(CONFIG.serverUrl + `/${loginType}/timetable`);
    }


    storeDays(days: Array<any>) {

        this.days = days.map((day: any) => day.day.slice(0, 3) );
    }

    getDays() { return this.days; }


    setTodayId(id: number) { this.todayId = id; }
    

    returnDateOfSelectedDay(selectedDayId: number) {

        return new Date((new Date()).getTime() + (selectedDayId - this.todayId) * 86400000);
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