
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
    private timeTableArray: Array<any>; //from server
    private dataForFiltering: any = {};

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchEmployeeandRSDInfo() {

        /**collect observables of all http requests */
        let empObservable = this.fetchEmployees(),
            slotObservable = this.fetchSlots(),
            roomObservable = this.http.get(CONFIG.serverUrl + '/ad/room'),
            dayObservable = this.http.get(CONFIG.serverUrl + '/ad/day');

        /**simultaneously send all requests*/
        return Observable.forkJoin([empObservable, roomObservable, slotObservable, dayObservable]);
    }

    fetchEmployees() {
        return this.http.get(CONFIG.serverUrl + '/ad/timetable/employee');
    }

    fetchPrograms() {
        return this.http.get(CONFIG.serverUrl + '/ad/program');
    }

    fetchDepartments() {
        return this.http.get(CONFIG.serverUrl + '/ad/department');
    }

    fetchYears() {
        return this.http.get(CONFIG.serverUrl + '/ad/year');
    }

    fetchSlots() {
        return this.http.get(CONFIG.serverUrl + '/ad/slot');
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

        let slotObservable = this.http.get(CONFIG.serverUrl + '/ad/slot'),
            dayObservable = this.http.get(CONFIG.serverUrl + '/ad/day'),
            facultyObservable = this.fetchFacultyByProgramAndYear(pId, yId, isEven);
        /**simultaneously send all requests*/
        return Observable.forkJoin([slotObservable, dayObservable, facultyObservable]);
    }

    fetchFacultyByProgramAndYear(pId: number, yId: number, isEven: boolean) {
        return this.http.get(CONFIG.serverUrl + `/ad/timetable/faculty/${pId}/${yId}/${isEven}`);
    }

    editTimetable(data: any, tId: number) {

        return this.http.put(CONFIG.serverUrl + `/ad/timetable/${tId}`, data);
    }

    /**if period is updated(id parameter is present), replace that old period info with new info
     * else(new period is added)
    */
    updateTimetable(newInfo: any, id?: number) {

        if (id) {
            let index = this.timeTableArray.findIndex(period => period.id == id);
            if (index > -1) { this.timeTableArray.splice(index, 1, newInfo); }
        } else {
            this.timeTableArray.push(newInfo);
        }
        // console.log('inside update tt:',this.timeTableArray);
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

    fetchDataRequiredForFilters() {

        this.fetchEmployees()
            .subscribe((res: any) => {
                this.dataForFiltering['e'] = res;
            }, (err: any) => { });

        this.fetchPrograms()
            .subscribe((res: any) => {
                this.dataForFiltering['p'] = res;
            }, (err: any) => { });

        this.fetchDepartments()
            .subscribe((res: any) => {
                this.dataForFiltering['d'] = res;
            }, (err: any) => { });

        this.fetchYears()
            .subscribe((res: any) => {
                this.dataForFiltering['y'] = res;
            }, (err: any) => { });

        this.fetchSlots()
            .subscribe((res: any) => {
                this.dataForFiltering['s'] = res;
            }, (err: any) => { });

    }

    getDataForFiltering(type: string) {

        return this.dataForFiltering[type];
    }


    storeTimetableArray(tt: Array<any>) { this.timeTableArray = tt; }

    deleteTimetableEntry(id: number) {

        let index = this.timeTableArray.findIndex(period => period.id == id);
        if (index > -1) { this.timeTableArray.splice(index, 1); }
    }

    storeDays(days: Array<any>) {

        this.days = days.map(day => day.day.slice(0, 3));
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

    /**for deleting the timetable */
    deleteTimetable(tId: number) {

        return this.http.delete(CONFIG.serverUrl + `/ad/timetable/${tId}`);
    }

    /**below code is related to data filtering */

    filterByEmployee(data: Array<any>, empId: number) {

        return data.filter(period => period.employeeId == empId);
    }

    filterByDepartment(data: Array<any>, depId: number) {

        return data.filter(period => period.departmentId == depId);
    }

    filterByProgram(data: Array<any>, pgmId: number) {

        return data.filter(period => period.programId == pgmId);
    }

    filterByYears(data: Array<any>, yId: number) {

        return data.filter(period => period.yearId == yId);
    }

    filterBySlots(data: Array<any>, sId: number) {

        return data.filter(period => period.slotId == sId);
    }

    filterTimetable(e?: number, d?: number, p?: number, y?: number, s?: number) {

        let ftt: Array<any> = this.timeTableArray; //initalize filtered timetable array 

        if (e) {
            ftt = this.filterByEmployee(ftt, e);
        }
        if (d) {
            ftt = this.filterByDepartment(ftt, d);
        }
        if (p) {
            ftt = this.filterByProgram(ftt, p);
        }
        if (y) {
            ftt = this.filterByYears(ftt, y);
        }
        if (s) {
            ftt = this.filterBySlots(ftt, s);
        }

        return ftt;
    }
    
    /**clear all data stored in service when user leaves the Timetable main page */
    clearServiceData() {

        this.timeTableArray = null;
        this.todayId = null;
        this.days = null;
        this.dataForFiltering = {};
    }

}