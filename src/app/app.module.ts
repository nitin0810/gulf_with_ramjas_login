/**import inbuiit modules/classes */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { XHRBackend, RequestOptions, HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

/**import classes that are eagerly loaded(not lazy loaded)*/
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { NoInternet } from '../custom-components/noInternet.component';

/**import services*/
import { CustomHttpService } from '../services/custom-http.service';
import { CustomService } from '../services/custom.service';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { Network } from '@ionic-native/network';
import { ComplaintService } from '../services/complaint.service';
import { PollService } from '../services/poll.service';

/**import custom modules*/
import { CustomNavbarModule } from '../custom-components/navbar/navbar.module';
import { CustomModalNavbarModule } from '../custom-components/modal-navbar/modal-navbar.module';
import { ForgotPasswordModal } from '../pages/login/forgot-password/forgot-password';


@NgModule({

  imports: [
    CustomNavbarModule,
    CustomModalNavbarModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    LoginPage,
    ForgotPasswordModal,
    NoInternet,
    DashboardPage,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ForgotPasswordModal,
    NoInternet,
    DashboardPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomService,
    AuthService,
    Network,
    NetworkService,
    ComplaintService,
    PollService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: CustomHttpService, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      }, deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule { }
