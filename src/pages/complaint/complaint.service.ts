
import { Injectable } from '@angular/core';

import { CustomHttpService } from '../../services/custom-http.service';
import { APP_CONSTANTS as CONFIG } from '../../services/app.constants';


@Injectable()
export class ComplaintService {

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchComplaints() {

        return this.http.get(CONFIG.serverUrl + `/st/complaint/page/1`);
    }

   

}
