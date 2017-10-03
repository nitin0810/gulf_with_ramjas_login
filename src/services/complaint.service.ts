
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';

/**this service is used for both complaints and suggestions, hence all variables name related to complaint may 
 * relate to complaint depending on the context(from which page service is called)
 */
@Injectable()
export class ComplaintService {

    compOrSugg: string;
    constructor(
        public http: CustomHttpService,
    ) { }

    fetchComplaints(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/${this.compOrSugg}/page/${pageNo}`);
    }

    fetchCategories() {

        return this.http.get(CONFIG.serverUrl + `/st/complaint/category`);
    }

    fetchFacultyNames() {

        let programId = localStorage.getItem('programId');
        let yearId = localStorage.getItem('yearId');
        let isEvenSem = localStorage.getItem('isEvenSemester');
        return this.http.get(CONFIG.serverUrl + `/st/complaint/faculty/${programId}/${yearId}/${isEvenSem}`);
    }

    fetchStatusList() {

        return this.http.get(CONFIG.serverUrl + '/st/complaint/filter/status');
    }

    fetchPriorityList() {

        return this.http.get(CONFIG.serverUrl + '/st/complaint/filter/priority');
    }

    submitComplaint(data: any) {

        return this.http.post(CONFIG.serverUrl + `/st/${this.compOrSugg}`, data);

    }

    closeComplaint(complaintId: number, description: string) {

        return this.http.put(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/close`, { comment: description });

    }

    reOpenComplaint(complaintId: number, description: string) {

        return this.http.put(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/reopen`, { comment: description });

    }

    satisfyComplaint(complaintId: number) {

        return this.http.put(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/satisfied`, {});

    }

    fetchComments(complaintId: number) {

        return this.http.get(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/comment`);
    }

    postComments(complaintId: number, comment: string) {

        return this.http.post(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/comment`, { comment: comment });
    }


    search(input: string, pageNo: number) {

        return this.http.post(CONFIG.serverUrl + `/st/${this.compOrSugg}/search/page/${pageNo}`, { search: input });
    }

    sortBy(sortBy: string, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/${this.compOrSugg}/sort/` + sortBy + `/page/${pageNo}`);

    }

    filterBy(filtering: any, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/${this.compOrSugg}/filter/` + filtering.filterName + `/${filtering.id}/page/${pageNo}`);

    }

}
