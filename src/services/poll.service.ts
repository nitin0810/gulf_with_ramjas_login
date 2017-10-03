
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class PollService {

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchPollList(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/poll/page/${pageNo}`);
    }


}
