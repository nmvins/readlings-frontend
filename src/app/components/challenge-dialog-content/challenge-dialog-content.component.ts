import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-challenge-dialog-content',
  templateUrl: './challenge-dialog-content.component.html',
  styleUrls: ['./challenge-dialog-content.component.scss']
})
export class ChallengeDialogContentComponent implements OnInit {

  startChallenge: boolean;
  isDone: boolean;
  isAnswered: boolean;

  seconds: number;
  interval: any;

  question: string;
  answers: string[];
  choice: string;
  correctAnswer: string;
  isCorrect: boolean;

  notEnoughPoints: boolean;

  constructor(private dialog: MatDialogRef<DialogContentComponent>,
    protected router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {
      isDone: boolean,
      shouldStartChallenge: boolean
      givenQuestion: string,
      listOfAnswers: string[],
      givenCorrectAnswer: string,
      notEnoughPoints: boolean,
      isDisabled: boolean
    }
  ) {
    this.isDone = data.isDone;
    this.startChallenge = data.shouldStartChallenge;
    this.answers = data.listOfAnswers;
    this.question = data.givenQuestion;
    this.correctAnswer = data.givenCorrectAnswer;
    this.notEnoughPoints = data.notEnoughPoints;
    dialog.disableClose = data.isDisabled;
  }

  ngOnInit(): void {
    this.isAnswered = false;
    this.seconds = 3;
    if (this.startChallenge) {
      this.interval = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) { clearInterval(this.interval); this.dialog.close(); this.startChallenge = false; };
      }, 1000);
    }
  }

  ok() {
    this.dialog.close(this.isCorrect);
  }

  confirm() {
    this.isAnswered = true;
    this.isDone = false;
    this.startChallenge = false;
    if (this.choice == this.correctAnswer) {
      this.isCorrect = true;
    }
    else this.isCorrect = false;
  }
}
