
import { Injectable } from '@angular/core';

import { CustomHttpService } from './custom-http.service';
import { APP_CONSTANTS as CONFIG } from './app.constants';

declare const SockJS;
declare const Stomp;

@Injectable()
export class AuthService {

    constructor(
        public http: CustomHttpService,
    ) { }

    isLoggedIn() {

        return localStorage.getItem('access_token') ? true : false;
    }

    saveToken(token: string) {

        localStorage.setItem('access_token', token);
    }

    public getUserInfo() {

        let userType = localStorage.getItem('isStudent')==="true" ? 'st' : 'ma';
        return this.http.get(CONFIG.serverUrl + `/${userType}/info`);
    }

    public verifyCredentials(data) {

        return this.http.post(CONFIG.loginUrl + `/oauth/token?grant_type=password&username=${data.username}&password=${data.password}`, {});
    }



    public storeUserData(user) {

        localStorage.setItem("id", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("userName", user.username);
        localStorage.setItem("nickName", user.nickName);
        localStorage.setItem("contactNo", user.contactNo);
        localStorage.setItem("email", user.email);

        localStorage.setItem('picUrl', user.picUrl);
        localStorage.setItem('picOriginalName', user.picOriginalName);


        if (localStorage.getItem('isStudent')==="true") {
            localStorage.setItem('isEvenSemester', user.isEvenSemester);
            localStorage.setItem('programId', user.programId);
            localStorage.setItem('programName', user.programName);
            localStorage.setItem('sessionEnd', user.sessionEnd);
            localStorage.setItem('sessionStart', user.sessionStart);
            localStorage.setItem('yearId', user.yearId);
            localStorage.setItem('yearName', user.yearName);
        } else {

            localStorage.setItem('faculty', user.faculty);
            localStorage.setItem('roles', JSON.stringify(user.roles));
        }


    }


    public getSockJs() {

        let access_token = localStorage.getItem('access_token');
        let url = CONFIG.serverUrl + '/st/nxtlife-websocket?access_token=' + access_token;
        var socket = new SockJS(url);
        return Stomp.over(socket);
    }


}
