import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserSessionManage } from '../custom-components/user.session.manage';

import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';

import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
// import { AccountPage } from '../pages/account/account';

@Component({
  templateUrl: 'app.html'
})

export class MyApp extends UserSessionManage {

  @ViewChild(Nav) nav: Nav;
  // rootPage:any = LoginPage;
  selectedPage: any;
  defaultUserImage: string = "assets/images/user.png";
  name: string = localStorage.getItem('name');

  pages: Array<{ title: string, component: any, icon: any }>;

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

    this.pages = [

      { title: 'Home', component: DashboardPage, icon: 'assets/icon/home.png' },
      { title: 'Complaints', component: "ComplaintPage", icon: 'assets/icon/complaint.png' },
      { title: 'Suggestions', component: "SuggestionTabs", icon: 'assets/icon/suggestion.png' },
      { title: 'Polls', component: "PollPage", icon: 'assets/icon/poll.png' },
      { title: 'Account', component: "AccountPage", icon: 'assets/icon/profile.png' },

    ];
  }
  


  openPage(page: any) {

    if (!page) {
      this.appCtrl.getRootNav().setRoot("AccountPage");
      this.selectedPage = "";
      return;
    }

    this.selectedPage = page.title;
    this.nav.setRoot(page.component);


  }
}

