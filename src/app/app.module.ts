import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './interceptors/basic-auth.interceptor';
import { ErrInterceptor } from './interceptors/err.interceptor';
import { TextHideDirective } from './directives/text-hide.directive';
import { ReadingSettingsComponent } from './components/reading-settings/reading-settings.component';
import { PredefinedBooksPageComponent } from './components/predefined-books-page/predefined-books-page.component';
import { ReadComponent } from './components/read/read.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ReviewQuestionsComponent } from './components/review-questions/review-questions.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ReactiveFormsModule} from '@angular/forms';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { GameReadComponent } from './components/game-read/game-read.component';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import {MatCardModule} from '@angular/material/card';
import { PlayChallengeComponent } from './components/play-challenge/play-challenge.component';
import { ChallengeDialogContentComponent } from './components/challenge-dialog-content/challenge-dialog-content.component';
import { MeasureComponent } from './components/measure/measure.component';
import { MeasureDialogContentComponent } from './components/measure-dialog-content/measure-dialog-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReadingDialogContentComponent } from './components/reading-dialog-content/reading-dialog-content.component';
import { SidenavDialogContentComponent } from './components/sidenav-dialog-content/sidenav-dialog-content.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    TextHideDirective,
    ReadingSettingsComponent,
    PredefinedBooksPageComponent,
    ReadComponent,
    HighlightDirective,
    ReviewQuestionsComponent,
    UserProfileComponent,
    NavbarComponent,
    GameHomeComponent,
    GameReadComponent,
    DialogContentComponent,
    ChallengesComponent,
    PlayChallengeComponent,
    ChallengeDialogContentComponent,
    MeasureComponent,
    MeasureDialogContentComponent,
    SidenavComponent,
    ReadingDialogContentComponent,
    SidenavDialogContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatTreeModule,
    MatProgressBarModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
