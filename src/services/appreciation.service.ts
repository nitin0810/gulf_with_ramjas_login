
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AppreciationService {

    isFaculty: boolean;
    constructor(
        public http: CustomHttpService,
    ) {
        this.isFaculty = localStorage.getItem('faculty') === "true"; // used in case of management
    }

    /**services for management */
    fetchYears() {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/year/${this.isFaculty}`);
    }

    fetchModules(yearId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/module/${yearId}/${this.isFaculty}`);
    }

    fetchStudents(yearId: number, moduleId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/appreciation/students/${moduleId}/${yearId}`);
    }

    postAppreciation(data:any){

        return this.http.post(CONFIG.serverUrl + `/ma/appreciation`,data);
    }
}