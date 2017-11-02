import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class EvaluationService {

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchEvaluationTemplate(type: string) {

        return this.http.get(CONFIG.serverUrl + `/ma/evaluation/${type}/true/false/page/1`);
    }

    fetchYearList() {

        return this.http.get(CONFIG.serverUrl + `/ma/evaluation/year`);
    }

    fetchModuleList(type: string, yearId: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/evaluation/${type}/${yearId}`);
    }

    fetchModuleListOfLecturer(yearId: number,lecturerId:number) {

        return this.http.get(CONFIG.serverUrl + `/ma/evaluation/module/${yearId}/${lecturerId}`);
    }

    postEvaluation(data:any){

        return this.http.post(CONFIG.serverUrl + `/ma/evaluation`,data);
    }

    fetchEvaluation(type:string,isExpired:boolean,pageNo:number){

        return this.http.get(CONFIG.serverUrl + `/ma/evaluation/${type}/false/${isExpired}/page/${pageNo}`);
    }
}