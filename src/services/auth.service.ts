
import { Injectable } from '@angular/core';

import { CustomHttpService } from './custom-http.service';
import * as config from './app.constants';
import { FileUploadOptions, FileTransferObject, FileTransfer } from '@ionic-native/file-transfer';

declare const SockJS;
declare const Stomp;

@Injectable()
export class AuthService {

    constructor(
        public http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    isLoggedIn() {

        return localStorage.getItem('access_token') ? true : false;
    }

    saveToken(token: string) {

        localStorage.setItem('access_token', token);
    }

    getUserInfo() {

        let userType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.get(config.APP_CONSTANTS.serverUrl + `/${userType}/info`);
    }

    verifyCredentials(data) {

        return this.http.post(config.APP_CONSTANTS.serverUrl + `/oauth/token?grant_type=password&username=${data.username}&password=${data.password}`, {});
    }

    storeUserData(user) {

        /**common data for student and management */
        localStorage.setItem("id", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("userName", user.username);
        localStorage.setItem("nickName", user.nickName);
        localStorage.setItem("contactNo", user.contactNo);
        localStorage.setItem("email", user.email);

        localStorage.setItem('picUrl', user.picUrl);
        localStorage.setItem('picOriginalName', user.picOriginalName);

        /**specific data for student */
        if (localStorage.getItem('isStudent') === "true") {

            localStorage.setItem('isEvenSemester', user.isEvenSemester);
            localStorage.setItem('programId', user.programId);
            localStorage.setItem('programName', user.programName);
            localStorage.setItem('sessionEnd', user.sessionEnd);
            localStorage.setItem('sessionStart', user.sessionStart);
            localStorage.setItem('yearId', user.yearId);
            localStorage.setItem('yearName', user.yearName);
        } else {
            /**specific data for management */
            localStorage.setItem('faculty', user.faculty);
            localStorage.setItem('roles', JSON.stringify(user.roles));
        }
    }

    uploadPic(image: any) {

        let myFileName: string = this.generatePicName();

        let options: FileUploadOptions = config.fileUploadOptions(myFileName, "image/jpeg");

        let userType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        const transfer: FileTransferObject = this.fileTransfer.create();

        return transfer.upload(image, config.APP_CONSTANTS.serverUrl + `/${userType}/pic`, options, false);
           

    }

    getCameraOptions(dType: number, sType: number, eType: number) {

        return config.getCameraOptions(dType, sType, eType);
    }

    generatePicName() {

        //generate unique filename based on current date-time
        let date = new Date().toISOString();
        let picName = date.substring(0, date.indexOf('.'));

        return `IMG_${picName}.jpg`;
    }

    deletePic() {

        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        return this.http.delete(config.APP_CONSTANTS.serverUrl + `/${loginType}/pic`);
    }

    getSockJs() {

        let access_token = localStorage.getItem('access_token');
        let loginType = localStorage.getItem('isStudent') === "true" ? 'st' : 'ma';
        let url = config.APP_CONSTANTS.serverUrl + `/${loginType}/nxtlife-websocket?access_token=${access_token}`;
        var socket = new SockJS(url);
        return Stomp.over(socket);
    }


}
