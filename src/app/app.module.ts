import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { XHRBackend, RequestOptions, HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { CustomNavbar } from '../custom-components/navbar.component';
import { ModalNavbarComponent } from '../custom-components/modal.navbar.component';
import { AccountPage } from '../pages/account/account';

import { CustomHttpService } from '../services/custom-http.service';
import { CustomService } from '../services/custom.service';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { Network } from '@ionic-native/network';


@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage,
    AccountPage,
    CustomNavbar,
    ModalNavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    LoginPage,
    AccountPage,
    CustomNavbar,
    ModalNavbarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomService,
    AuthService,
    Network,
    NetworkService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: CustomHttpService, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      }, deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule { }
