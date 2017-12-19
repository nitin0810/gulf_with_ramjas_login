/**import inbuiit modules/classes */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { XHRBackend, RequestOptions, HttpModule} from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

/**import classes that are eagerly loaded(not lazy loaded)*/
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { NoInternet } from '../custom-components/noInternet.component';

/**import services*/
import { CustomHttpService } from '../services/custom-http.service';
import { CustomService } from '../services/custom.service';
import { AuthService } from '../services/auth.service';
import { NetworkService } from '../services/network.service';
import { ComplaintService } from '../services/complaint.service';
import { PollService } from '../services/poll.service';
import { AppreciationService } from '../services/appreciation.service';
import { SurveyService } from '../services/survey.service';
import { EvaluationService } from '../services/evaluation.service';
import { AssignmentService } from '../services/assignment.service';
import { PlannerService } from '../services/planner.service';
import { AssessmentService } from '../services/assessment.service';
import { FileSelectService } from '../services/fileSelect.service';

/**import native plugins and 3rd party modules*/
import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { FileTransfer} from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


/**import custom modules*/
import { CustomNavbarModule } from '../custom-components/navbar/navbar.module';
import { CustomModalNavbarModule } from '../custom-components/modal-navbar/modal-navbar.module';
import { LoginPage } from '../custom-components/login/login';
import { ForgotPasswordModal } from '../custom-components/login/forgot-password/forgot-password';



@NgModule({

  imports: [
    CustomNavbarModule,
    CustomModalNavbarModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MomentModule,
    ionicGalleryModal.GalleryModalModule,
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
    SurveyService,
    AppreciationService,
    EvaluationService,
    AssignmentService,
    PlannerService,
    AssessmentService,
    FileSelectService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: CustomHttpService, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      }, deps: [XHRBackend, RequestOptions]
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    Camera,
    FileTransfer,
    FileChooser,
    FilePath
  ],
})
export class AppModule { }
