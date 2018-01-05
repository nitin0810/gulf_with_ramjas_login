import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AttendanceService {

    constructor(
        private http: CustomHttpService
    ) { }

    /**for marking attendance of all the students */
    fetchStudents(pId: number, yId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/attendance/students/${pId}/${yId}`);
    }

    postAttendance(data: any) {

        return this.http.post(CONFIG.serverUrl + `/ma/attendance`, data);
    }

    fetchAttendance(data:any){

        return this.http.post(CONFIG.serverUrl + `/ma/attendance/day`, data);
    }

    editAttendance(data:any,id:number){

        return this.http.put(CONFIG.serverUrl + `/ma/attendance/${id}`, data);
    }
}