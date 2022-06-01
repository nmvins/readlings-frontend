import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { GameHomeComponent } from './components/game-home/game-home.component';
import { GameReadComponent } from './components/game-read/game-read.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MeasureComponent } from './components/measure/measure.component';
import { PlayChallengeComponent } from './components/play-challenge/play-challenge.component';
import { PredefinedBooksPageComponent } from './components/predefined-books-page/predefined-books-page.component';
import { ReadComponent } from './components/read/read.component';
import { ReadingSettingsComponent } from './components/reading-settings/reading-settings.component';
import { ReviewQuestionsComponent } from './components/review-questions/review-questions.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]},
  { path: 'reading-settings', component: ReadingSettingsComponent},
  { path: 'predefined-books', component: PredefinedBooksPageComponent, canActivate: [AuthGuard]},
  { path: 'read', component: ReadComponent, canActivate: [AuthGuard]},
  { path: 'review-questions', component: ReviewQuestionsComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'game', component: GameHomeComponent, canActivate: [AuthGuard]},
  { path: 'app-game-read', component: GameReadComponent, canActivate: [AuthGuard]},
  { path: 'challenges', component: ChallengesComponent, canActivate: [AuthGuard]},
  { path: 'play-challenge', component: PlayChallengeComponent, canActivate: [AuthGuard]},
  { path: 'measure', component: MeasureComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
