
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class ComplaintService {

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchComplaints() {

        return this.http.get(CONFIG.serverUrl + `/st/complaint/page/1`);
    }

    fetchCategories(){

        return this.http.get(CONFIG.serverUrl + `/st/complaint/category`);
    }
   

}
