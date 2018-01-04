import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AttendanceService {

    constructor(
        private http:CustomHttpService
    ){ }

    fetchStudents(pId:number,yId:number){
        
        return this.http.get(CONFIG.serverUrl + `/ma/attendance/students/${pId}/${yId}`);
    }

    postAttendance(data:any){

        return this.http.post(CONFIG.serverUrl + `/ma/attendance`,data);
    }
}