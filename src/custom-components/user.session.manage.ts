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
    sideMenuOptions:Array<any>;
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
            this.decideSideMenuContent();
            this.rootPage = DashboardPage;
        } else {
            this.rootPage = LoginPage;
        }
    }

    public login() {
        this.enableMenu(true);
        this.menu.close();
        this.decideSideMenuContent();
        this.appCtrl.getRootNav().setRoot(DashboardPage);
        this.imageUpdate();
    }

  /**maintain different side menu options for better understanding and also there might be some features
   * present in one and not in other one
   */
    decideSideMenuContent() {
        if (localStorage.getItem('isStudent') === "true") {

            this.sideMenuOptions = [

                { title: 'Home', component: DashboardPage, icon: 'assets/icon/home.png' },
                { title: 'Complaints', component: "ComplaintPageStudent", icon: 'assets/icon/complaint.png' },
                // { title: 'Suggestions', component: "SuggestionTabs", icon: 'assets/icon/suggestion.png' },
                { title: 'Suggestions', component: "SuggestionTabsPageStudent", icon: 'assets/icon/suggestion.png' },
                { title: 'Appreciations', component: "AppreciationTabsPageStudent", icon: 'assets/icon/appreciation.png' },
                { title: 'Polls', component: "PollStudent", icon: 'assets/icon/poll.png' },
                { title: 'Account', component: "AccountPage", icon: 'assets/icon/profile.png' },
                    
                

            ];

        } else {

            this.sideMenuOptions = [

                { title: 'Home', component: DashboardPage, icon: 'assets/icon/home.png' },
                { title: 'Complaints', component: "ComplaintPageManagement", icon: 'assets/icon/complaint.png' },
                { title: 'Suggestions', component: "SuggestionTabsPageManagement", icon: 'assets/icon/suggestion.png' },
                { title: 'Appreciations', component: "AppreciationTabsPageManagement", icon: 'assets/icon/appreciation.png' },
                { title: 'Polls', component: "PollTabsPageManagement", icon: 'assets/icon/poll.png' },
                { title: 'Account', component: "AccountPage", icon: 'assets/icon/profile.png' },
                
            ];
        }
    }

    public imageUpdate() {

        let picTimestamp = localStorage.getItem("picTimestamp");
        this.picUrl = localStorage.getItem("picUrl");
        this.userImage = this.picUrl + "/" + picTimestamp;
        this.userName = localStorage.getItem('name') || '';
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
                console.log('above name////');

                this.userName = localStorage.getItem('name');
                this.imageUpdate();
            }, (err: any) => {

                if (err.status === 401) { this.sessionExpired(); }
            });
    }

}


