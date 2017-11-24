import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class AssessmentService {

    isFaculty:boolean;
    constructor(
        public http: CustomHttpService,
    ) {
        this.isFaculty = localStorage.getItem('faculty')==="true";
     }

    /**for management */

    fetchYears(){

        return this.http.get(CONFIG.serverUrl+ `/ma/assesment/year/${this.isFaculty}`);
    }

    fetchModules(yearId:number){
        
        return this.http.get(CONFIG.serverUrl+ `/ma/assesment/module/${yearId}/${this.isFaculty}`);
    }

    fetchStudents(formOrSumm:string,yearId:number,moduleId:number){

        return this.http.get(CONFIG.serverUrl+ `/ma/assesment/${formOrSumm}/students/${moduleId}/${yearId}`);
    }

    fetchAssessmentTypes(formOrSumm:string){
        
                return this.http.get(CONFIG.serverUrl+ `/ma/assesment/${formOrSumm}/type`);
            }

    submitAssessment(formOrSumm:string,data:any){

        return this.http.post(CONFIG.serverUrl+ `/ma/assesment/${formOrSumm}`,data);
        
    }
}