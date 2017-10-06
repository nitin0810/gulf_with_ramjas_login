import { MenuController, AlertController, Events, App } from 'ionic-angular';

import { NoInternet } from './noInternet.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { LoginPage } from './login/login';

export class UserSessionManage {

    selectedPage: string;
    rootPage: any;
    userName: string;
    userImage: string;
    picUrl: any;

    constructor(
        public events: Events,
        public menu: MenuController,
        public appCtrl: App,
        public authService: AuthService,
        public alertCtrl: AlertController,
        public networkService: NetworkService) {

        this.handleEvents();
        this.networkService.checkNetworkStatus();
        this.hasLoggedIn();
    }

    public handleEvents() {
        this.events.subscribe('user:login', () => {
            this.login();
        });
        this.events.subscribe('session:expired', () => {
            this.sessionExpired();
        });
        this.events.subscribe('user:logout', () => {
            this.logout();
        });
        this.events.subscribe("offline", () => {
            this.offline();
        });
        this.events.subscribe("online", () => {
            this.online();
        });
        this.events.subscribe("user:image", (image) => {
            this.userImage = image;
        });
    }

    public hasLoggedIn() {

        if (this.authService.isLoggedIn()) {
            this.getUserInfo();
            this.rootPage = DashboardPage;
        } else {
            this.rootPage = LoginPage;
        }
    }

    public login() {
        this.enableMenu(true);
        this.menu.close();
        this.appCtrl.getRootNav().setRoot(DashboardPage);
        this.imageUpdate();
    }

    public imageUpdate() {

        let picTimestamp = localStorage.getItem("picTimestamp");
        this.picUrl = localStorage.getItem("picUrl");
        this.userImage = this.picUrl + "/" + picTimestamp;
    }

    public logout() {
        localStorage.clear();
        this.enableMenu(false);
        this.selectedPage = "";
        this.appCtrl.getRootNav().setRoot(LoginPage);
    }

    public offline() {

        this.menu.close();
        this.appCtrl.getRootNav().setRoot(NoInternet);
    }

    public online() {
        if (this.authService.isLoggedIn()) {
            this.login();
        } else {
            this.logout();
        }
    }

    public enableMenu(loggedIn) {

        this.menu.enable(loggedIn);
    }

    public sessionExpired() {

        let alert = this.alertCtrl.create({
            title: 'Session Expired',
            message: "You're already logged in some other device. You may again login.",
            enableBackdropDismiss: false,
            buttons: [{
                text: 'Logout',
                handler: () => {
                    this.events.publish("user:logout");
                }
            }]
        });
        alert.present();
    }


    public getUserInfo() {

        this.authService.getUserInfo()
            .subscribe((res: any) => {

                this.authService.storeUserData(res);
                this.userName = localStorage.getItem('name');
                this.imageUpdate();
            }, (err: any) => {

                if (err.status === 401 || err.status == 0) { this.sessionExpired(); }
            });
    }

}


