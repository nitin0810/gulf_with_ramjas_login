import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { APP_CONSTANTS as CONFIG } from '../services/app.constants';

@Injectable()
export class DashboardService {

  constructor(public http: CustomHttpService) {}

  chartsByComplaintStatus() {
    return this.http.get(CONFIG.serverUrl + `/ma/complaint/graph/status`);
  }

  chartsBySuggestionStatus() {
    return this.http.get(CONFIG.serverUrl + `/ma/suggestion/graph/status`);
  }

  chartsComplaintByCategory() {
    return this.http.get(CONFIG.serverUrl + `/ma/complaint/graph/category`);
  }

  chartsSuggestionByCategory() {
    return this.http.get(CONFIG.serverUrl + `/ma/suggestion/graph/category`);
  }

}