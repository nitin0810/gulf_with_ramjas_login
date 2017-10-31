import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserSessionManage } from '../custom-components/user.session.manage';

// import { DashboardPage } from '../pages/dashboard/dashboard';

import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { LoginPage } from '../custom-components/login/login';

@Component({
  templateUrl: 'app.html'
})

export class MyApp extends UserSessionManage {

  @ViewChild(Nav) nav: Nav;
  // rootPage:any = LoginPage;
  selectedPage: any;
  defaultUserImage: string = "assets/images/user.png";
  sideMenuOptions: Array<any>;
  pollSubOptionsShown: boolean = false; // to show and hide the poll suboptions
  surveySubOptionsShown: boolean = false; // to show and hide the survey suboptions

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    events: Events,
    menu: MenuController,
    appCtrl: App,
    alertCtrl: AlertController,
    networkService: NetworkService,
    authService: AuthService

  ) {

    super(events, menu, appCtrl, authService, alertCtrl, networkService);

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }



  openPage(page: any) {

    /**Handle the case when user pic is clicked */
    if (!page) {
      this.selectedPage = "Account";
      this.menu.close();
      this.nav.setRoot("AccountPage");
      return;
    }

    /**Handle the case of polls */
    if (page.title == "Polls" && localStorage.getItem('isStudent') === "false") {
      if (!this.pollSubOptionsShown) {

        /**insert these two options below the poll option*/
        this.sideMenuOptions.splice(5, 0,
          { title: 'ForMe', component: "PollForMePageManagement", icon: 'assets/icon/poll.png' },
          { title: 'ByMe', component: "PollTabsPageManagement", icon: 'assets/icon/poll.png' },
        );
      } else {

        /**delete these two options below the poll option*/
        this.sideMenuOptions.splice(5, 2);

      }
      this.pollSubOptionsShown = !this.pollSubOptionsShown;
      return;
    }


    /**Handle the case of surveys */
    if (page.title == "Surveys" && localStorage.getItem('isStudent') === "false") {
      if (!this.surveySubOptionsShown) {

        /**index shud be based on whether pollOptions are hidden or shown */
        let i = this.pollSubOptionsShown ? 8 : 6;

        /**insert these two options below the survey option*/
        this.sideMenuOptions.splice(i, 0,
          { title: 'ForMe', component: "SurveyForMePageManagement", icon: 'assets/icon/survey.png' },
          { title: 'ByMe', component: "SurveyTabsPageManagement", icon: 'assets/icon/survey.png' },
        );
      } else {

        let i = this.pollSubOptionsShown ? 8 : 6;

        /**delete these two options below the survey option*/
        this.sideMenuOptions.splice(i, 2);

      }
      this.surveySubOptionsShown = !this.surveySubOptionsShown;
      return;
    }

    this.selectedPage = page.title;
    this.menu.close();
    this.nav.setRoot(page.component);


  }
}

