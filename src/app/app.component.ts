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


    this.selectedPage = page.title;
    this.menu.close();
    this.nav.setRoot(page.component);


  }
}

