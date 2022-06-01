import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  isFirstLevel: boolean;
  nextLevel = false;
  isDone: boolean;
  isCorrect: boolean;
  isAreaChanged: boolean;
  
  seconds: number;
  interval: any;

  question: string;
  answers: string[];
  choice: string;
  correctAnswer: string;

  constructor(private dialog: MatDialogRef<DialogContentComponent>,
    protected router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {
      firstLevel: boolean,
      isDone: boolean,
      areaChanged: boolean,
      givenQuestion: string,
      listOfAnswers: string[],
      givenCorrectAnswer: string,
      isBookNotChosen: boolean
    }) {
    this.answers = data.listOfAnswers;
    this.question = data.givenQuestion;
    this.isFirstLevel = data.firstLevel;
    this.isDone = data.isDone;
    this.isAreaChanged = data.areaChanged;
    this.correctAnswer = data.givenCorrectAnswer;
    dialog.disableClose = true;
  }

  ngOnInit(): void {
    this.nextLevel = false;
    this.isCorrect = false;
    if (this.isFirstLevel) this.next();
  }

  cancel() {
    this.isFirstLevel = false;

    this.dialog.close('canceled');
  }

  return() {
    this.isFirstLevel = false;

    this.dialog.close('return');
  }

  next() {
     this.nextLevel = true;
     this.isAreaChanged = false;

    this.seconds = 3;
    this.interval = setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) { clearInterval(this.interval); this.dialog.close(); this.isFirstLevel = false;};
    }, 1000);
  }

  confirm() {
    this.isFirstLevel = false;
    this.isDone = false;
  
    if (this.choice == this.correctAnswer) this.isCorrect = true;
    else this.isCorrect = false;
  }
}
