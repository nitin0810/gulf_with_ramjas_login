
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';


@Injectable()
export class ComplaintService {

    constructor(
        public http: CustomHttpService,
    ) { }

    fetchComplaints(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/complaint/page/${pageNo}`);
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

    submitComplaint(data: any) {

        return this.http.post(CONFIG.serverUrl + `/st/complaint`, data);

    }

    closeComplaint(complaintId: number, description: string) {

        return this.http.put(CONFIG.serverUrl + `/st/complaint/${complaintId}/close`, { comment: description });

    }
    
    reOpenComplaint(complaintId: number, description: string) {
        
                return this.http.put(CONFIG.serverUrl + `/st/complaint/${complaintId}/open`, { comment: description });
        
            }


}
