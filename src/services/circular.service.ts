
import { Injectable } from '@angular/core';

import *  as config from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
  

@Injectable()
export class CircularService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer        
    ) { }

    getCameraOptions(dType: number, sType: number, eType: number) {

        return config.getCameraOptions(dType, sType, eType);
    }

    fetchCircularListForStudent(pageNo: number) {

        return this.http.get(config.APP_CONSTANTS.serverUrl + `/st/circular/page/${pageNo}`);
    }

    fetchCircularListForManagement(isExpired: boolean, pageNo: number) {

        return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/circular/${isExpired}/page/${pageNo}`);
    }

    fetchCircularById(id: number) {

        return this.http.get(config.APP_CONSTANTS.serverUrl + `/ma/circular/${id}`);
    }
    searchManagement(isExpired: boolean, pageNo: number,searchValue:string) {

        return this.http.post(config.APP_CONSTANTS.serverUrl + `/ma/circular/${isExpired}/search/page/${pageNo}`, {search:searchValue});
    }

    submitCircularWithoutFile(formData:any) {
        
        return this.http.post(config.APP_CONSTANTS.serverUrl + `/ma/circular`, formData);
    }

    submitCircularWithFile(data: any) {
        
        let myFileName: string = data.file ? data.fileName : this.generateImageName();

        let options: FileUploadOptions = config.fileUploadOptions(myFileName);

        options.params = {};
        for (let key in data) {

            if (!(key == "file" || key == "image")) {
                options.params[key] = data[key];
            }
        }

        const transfer:FileTransferObject  = this.fileTransfer.create();
        return transfer.upload(data.image || data.file, config.APP_CONSTANTS.serverUrl + `/ma/circular`, options,false)
    }

    generateImageName() {
        //generate unique imagename based on current date-time(upto seconds)
        let date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }
        
    
}
