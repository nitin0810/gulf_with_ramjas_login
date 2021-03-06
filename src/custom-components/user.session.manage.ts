import { MenuController, AlertController, Events, App } from 'ionic-angular';

import { NoInternet } from './noInternet.component';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { LoginPage } from './login/login';

export class UserSessionManage {

    selectedPage: string;
    rootPage: any;
    userName: string;
    userImage: string;
    sideMenuOptions: Array<any>;
    pollSubOptionsShown: boolean = false; // to show and hide the poll suboptions
    surveySubOptionsShown: boolean = false; // to show and hide the survey suboptions

    constructor(
        public events: Events,
        public menu: MenuController,
        public appCtrl: App,
        public authService: AuthService,
        public alertCtrl: AlertController,
        public networkService: NetworkService) {

        this.handleEvents();
        this.networkService.checkNetworkStatus();
        this.isLoggedIn();
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
        // this.events.subscribe("offline", () => {
             // this.offline();
        // });
        this.events.subscribe("online", () => {
            this.online();
        });
        this.events.subscribe("user:image", () => {
            this.imageUpdate();
        });
    }

    public isLoggedIn() {

        if (this.authService.isLoggedIn()) {
            this.getUserInfo();
            this.decideSideMenuContent();
            if(localStorage.getItem('isStudent') === "true"){

            this.rootPage = "TimeTablePageStudent";
            }
            else{
                this.rootPage = "TimeTablePageManagement";
 
            }
        } else {
            this.rootPage = LoginPage;
        }
    }

    public login() {
        this.enableMenu(true);
        this.menu.close();
        this.decideSideMenuContent();
        if(localStorage.getItem('isStudent') === "true"){

            this.appCtrl.getRootNav().setRoot("TimeTablePageStudent");
        }else{
            this.appCtrl.getRootNav().setRoot("TimeTablePageManagement");

        }
        this.imageUpdate();
    }

    /**maintain different side menu options for better understanding and also there might be some features
     * present in one and not in other
     */
    decideSideMenuContent() {
        if (localStorage.getItem('isStudent') === "true") {

            this.sideMenuOptions = [

                // { title: 'Home', component: "DashboardPage", icon: 'assets/icon/home.png' },
                // { title: 'Principal Direct', component: "ComplaintPageStudent", icon: 'assets/icon/complaint.jpg' },
                // { title: 'Appreciations', component: "AppreciationTabsPageStudent", icon: 'assets/icon/appreciation.jpg' },
                // { title: 'Polls', component: "PollStudent", icon: 'assets/icon/poll.jpg' },
                // { title: 'Surveys', component: "SurveyPageStudent", icon: 'assets/icon/survey.jpg' },
                { title: 'Time Table', component: "TimeTablePageStudent", icon: 'assets/icon/timetable.png' },
                { title: 'Circular', component: "CircularStudentListPage", icon: 'assets/icon/circular.jpg' },
                { title: 'Events', component: "MainPlannerPageManagement", icon: 'assets/icon/event.jpg' },
                { title: 'Attendance', component: "AppreciationTabsPageStudent", icon: 'assets/icon/appreciation.jpg' },
                { title: 'Assignment', component: "AssignmentTabsPageStudent", icon: 'assets/icon/assignment.png' },
                { title: 'Assessment', component: "AssessmentTabsPageStudent", icon: 'assets/icon/assessment.png' },
                { title: 'Elective', component: "ElectiveTabsPageStudent", icon: 'assets/icon/assessment.png' },
                { title: 'Principal Direct', component: "ComplaintPageStudent", icon: 'assets/icon/complaint.jpg' },
                { title: 'Messaging', component: "SuggestionTabsPageStudent", icon: 'assets/icon/suggestion.jpg' },
                { title: 'Account', component: "AccountPage", icon: 'assets/icon/profile.jpg' },
                
            ];

        } else {

            this.sideMenuOptions = [

                { title: 'Time Table', component: "TimeTablePageManagement", icon: 'assets/icon/timetable.png' },
                { title: 'Circular', component: "CircularTabsPageManagement", icon: 'assets/icon/circular.jpg' },
                { title: 'Events', component: "MainPlannerPageManagement", icon: 'assets/icon/event.jpg' },
                { title: 'Attendance', component: "NewAttendancePageManagement", icon: 'assets/icon/appreciation.jpg' },
                { title: 'Assignment', component: "AssignmentTabsPageManagement", icon: 'assets/icon/assignment.png' },
                { title: 'Assessment', component: "AssessmentTabsPageManagement", icon: 'assets/icon/assessment.png' },
                // { title: 'Home', component: "DashboardPage", icon: 'assets/icon/home.png' },
                { title: 'Elective', component: "ElectiveTabsPageManagement", icon: 'assets/icon/assessment.png' },
                { title: 'Principal Direct', component: "ComplaintPageManagement", icon: 'assets/icon/complaint.jpg' },
                { title: 'Messaging', component: "SuggestionTabsPageManagement", icon: 'assets/icon/suggestion.jpg' },
                // { title: 'Appreciations', component: "AppreciationTabsPageManagement", icon: 'assets/icon/appreciation.jpg' },
                // { title: 'Polls', icon: 'assets/icon/poll.jpg' },
                // { title: 'Surveys', icon: 'assets/icon/survey.jpg' },
                { title: 'Account', component: "AccountPage", icon: 'assets/icon/profile.jpg' },

            ];

            /**insert the evaluation option only when user has a role of quality-coordinater */
            let roles: Array<string> = JSON.parse(localStorage.getItem('roles'));
            if (roles.indexOf("QUALITYCOORDINATOR") > -1) {
                this.sideMenuOptions.splice(7, 0, { title: 'Evaluations', component: "EvaluationTabsPageManagement", icon: 'assets/icon/appreciation.jpg' });
            }

        }
        /**update the following variables every time a new login is done 
         * it is done to remove a bug, which messes up the order in which side menu options should appear
         */
        this.pollSubOptionsShown = this.surveySubOptionsShown = false;
    }

    public imageUpdate() {

        this.userImage = localStorage.getItem('picUrl');
        this.userName = localStorage.getItem('name') || '';
    }

    public logout() {
        localStorage.clear();
        this.enableMenu(false);
        this.selectedPage = "";
        this.appCtrl.getRootNav().setRoot(LoginPage);
    }

    // public offline() {

    //     this.menu.close();
    //     this.appCtrl.getRootNav().setRoot(NoInternet);
    // }

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

                if (err.status === 401) { this.sessionExpired(); }
            });
    }

}


