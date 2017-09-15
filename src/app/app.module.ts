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

import { CustomHttpService } from '../services/custom-http.service';
import { CustomService } from '../services/custom.service';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage
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
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomService,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: CustomHttpService, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      }, deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule { }
