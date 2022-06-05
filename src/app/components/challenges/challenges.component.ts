import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/models/Challenge';
import { User } from 'src/app/models/User';
import { ChallengeService } from 'src/app/services/challenge.service';
import { LevelsService } from 'src/app/services/levels.service';
import { ChallengeDialogContentComponent } from '../challenge-dialog-content/challenge-dialog-content.component';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  chosenChallenge: Challenge;

  unlockedChallenges: Challenge[];
  doneChallenges: Challenge[];
  lockedChallenges: Challenge[];
  premiumChallenges: Challenge[];

  currentUser: User;
  isUserLoaded: boolean;

  constructor(protected router: Router, protected challengeService: ChallengeService, protected levelService: LevelsService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    let user = await this.challengeService.getUser();
    this.currentUser = user;
    this.isUserLoaded = true;

    this.unlockedChallenges = [];
    let result = await this.challengeService.getUnlockedChallenges();
    this.unlockedChallenges = result;

    this.doneChallenges = [];
    result = await this.challengeService.getDoneChallenges();
    this.doneChallenges = result;

    await this.challengeService.getExistingChallenges();
    this.lockedChallenges = [];
    this.premiumChallenges = [];
    this.lockedChallenges = this.challengeService.existingChallenges;
    this.premiumChallenges = this.challengeService.premiumChallenges;
  }

  start(choice: Challenge) {
    this.chosenChallenge = choice;
    if (this.lockedChallenges.includes(this.chosenChallenge) == false) {
      const dialogRef = this.dialog.open(ChallengeDialogContentComponent, {
        data: {
          shouldStartChallenge: true,
          isDisabled: true
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['play-challenge'], { queryParams: { challengeId: choice.challengeId, title: choice.title, description: choice.description, difficulty: choice.difficulty } });
      });
    }
  }

  async unlock(choice: Challenge) {
    if (this.currentUser.score! >= 4000) {
      await this.challengeService.unlock(choice);
      await this.levelService.setScore(this.currentUser.score!);
      await this.levelService.decreaseScore(4000);
      let res = await this.levelService.getScore();
      this.currentUser.score = parseInt(res);

      let resultt = await this.challengeService.getUnlockedChallenges();
      this.unlockedChallenges = resultt;

      resultt = await this.challengeService.getDoneChallenges();
      this.doneChallenges = resultt;
      await this.challengeService.getExistingChallenges();
      this.premiumChallenges = this.challengeService.premiumChallenges;
    } else {
      const dialogRef = this.dialog.open(ChallengeDialogContentComponent, {
        data: {
          isDone: false,
          shouldStartChallenge: false,
          notEnoughPoints: true,
          isDisabled: false
        }
      });
    }
  }
}
