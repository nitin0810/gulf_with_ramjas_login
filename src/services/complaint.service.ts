
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';

/**this service is used for both complaints and suggestions, hence all variables name related to complaint may 
 * relate to suggestion depending on the context(from which page service is called)
 */
@Injectable()
export class ComplaintService {

    compOrSugg: string; // refers to complaint or suggestion

    constructor(
        public http: CustomHttpService,
    ) { }

    getUserType(): string {

        return localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
    }

    /**for both student and management */
    fetchComplaints(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/page/${pageNo}`);
    }

    /**for  management  only*/
    fetchComplaintById(id: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/${this.compOrSugg}/${id}`);
    }

    /**for  student  only*/
    fetchCategories() {

        return this.http.get(CONFIG.serverUrl + `/st/complaint/category`);
    }

    /**for  student  only*/
    fetchFacultyNames() {

        let programId = localStorage.getItem('programId');
        let yearId = localStorage.getItem('yearId');
        let isEvenSem = localStorage.getItem('isEvenSemester');
        return this.http.get(CONFIG.serverUrl + `/st/complaint/faculty/${programId}/${yearId}/${isEvenSem}`);
    }

    /**for  management  only*/
    fetchFacultyNamesForManagement() {

        return this.http.get(CONFIG.serverUrl + '/ma/all');
    }

    /**for both student and management */
    fetchCategoryOptions() {

        /**categoryoptions list is same for both complaint and suggstions, hence only single url(with complaint) is sufficicent */
        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/complaint/filter/category`);
    }

    /**for both student and management */
    fetchStatusList() {

        /**status list is same for both complaint and suggstions, hence only single url(with complaint) is sufficicent */
        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/complaint/filter/status`);
    }

    /**for both student and management */
    fetchPriorityList() {

        /**priority list is also same for both */
        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/complaint/filter/priority`);
    }

    /**for  student  only*/
    submitComplaint(data: any) {

        return this.http.post(CONFIG.serverUrl + `/st/${this.compOrSugg}`, data);

    }

    /**for both student and management */
    closeComplaint(complaintId: number, reason: any) {

        return this.http.put(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/${complaintId}/close`, reason);

    }

    /**for  student  only*/
    reOpenComplaint(complaintId: number, description: string) {

        return this.http.put(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/reopen`, { comment: description });

    }

    /**for  student  only*/
    satisfyComplaint(complaintId: number) {

        return this.http.put(CONFIG.serverUrl + `/st/${this.compOrSugg}/${complaintId}/satisfied`, {});

    }

    /**for  management  only*/
    editComplaint(complaintId: number, newStatus: any) {

        return this.http.put(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/${complaintId}`, newStatus);

    }

    /**for both student and management */
    fetchComments(complaintId: number) {

        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/${complaintId}/comment`);
    }

    /**for both student and management */
    postComments(complaintId: number, comment: string) {

        return this.http.post(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/${complaintId}/comment`, { comment: comment });
    }

    /**for both student and management */
    search(input: string, pageNo: number) {

        return this.http.post(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/search/page/${pageNo}`, { search: input });
    }

    /**for both student and management */
    sortBy(sortBy: string, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/sort/` + sortBy + `/page/${pageNo}`);
    }

    /**for both student and management */
    filterBy(filtering: any, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/filter/` + filtering.filterName + `/${filtering.id}/page/${pageNo}`);
    }


    /**for both student and management */
    searchAfterFilter(filtering: any, input: string, pageNo: number) {

        return this.http.post(CONFIG.serverUrl + `/${this.getUserType()}/${this.compOrSugg}/filter/` + filtering.filterName + `/${filtering.id}/search/page/${pageNo}`, { search: input });
    }

}
