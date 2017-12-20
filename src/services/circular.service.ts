
import { Injectable } from '@angular/core';

import { APP_CONSTANTS as CONFIG } from '../services/app.constants';
import { CustomHttpService } from './custom-http.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


@Injectable()
export class CircularService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer        
    ) { }

    fetchCircularListForStudent(pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/st/circular/page/${pageNo}`);
    }

    fetchCircularListForManagement(isExpired: boolean, pageNo: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/circular/${isExpired}/page/${pageNo}`);
    }

    fetchCircularById(id: number) {

        return this.http.get(CONFIG.serverUrl + `/ma/circular/${id}`);
    }
    searchManagement(isExpired: boolean, pageNo: number,searchValue:string) {

        return this.http.post(CONFIG.serverUrl + `/ma/circular/${isExpired}/search/page/${pageNo}`, {search:searchValue});
    }

    submitCircular(data) {
        
        return this.http.post(CONFIG.serverUrl + `/ma/circular`, data);
    }

    postCircularWithFile(data: any) {
        
        let myFileName:string = this.generateFileName();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: myFileName,
            mimeType: "multipart/form-data",
            chunkedMode: false,
            headers: {
                'Authorization': 'Bearer'+localStorage.getItem('access_token')
            },
            // params: {
            //     "title":data.title,
            //     "description": data.description,
            //     "date": data.date,
            //     "mainAudienceId": data.mainAudienceId,
            //     'files' :myFileName,
                

            // }

            params : data
        }
        options.params.files = myFileName;

        const transfer:FileTransferObject  = this.fileTransfer.create();
        return transfer.upload(data.imageString, CONFIG.serverUrl + `/ma/circular`, options,false)
        .then((data:any) => {

            console.log('inside service success', data);
            alert(JSON.stringify(data));
            return JSON.parse(data.response);
        });
        
    }

    generateFileName(){
        //generate unique filename based on current date-time
        return new Date().toISOString() +".jpg";
    }
        
    
}
