import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeasureService } from 'src/app/services/measure.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-measure-dialog-content',
  templateUrl: './measure-dialog-content.component.html',
  styleUrls: ['./measure-dialog-content.component.scss']
})
export class MeasureDialogContentComponent implements OnInit {

  question: string;
  answers: string[];
  choice: string;
  correctAnswer: string;
  isCorrect: boolean;

  isDone: boolean;
  speed: number;
  attention: string;
  isSquare:  boolean;
  isAge: boolean;
  age: String;

  isNotComplete: boolean;
  textIndex: number;

  constructor(private measureService: MeasureService,
    private dialog: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      isSquare: boolean;
      isAge: boolean;
      attention: string;
      speed: number;
      isNotComplete: boolean;
      textIndex: number;
    }) {
      this.speed = data.speed;
      this.attention = data.attention;
      this.isSquare = data.isSquare;
      this.isAge = data.isAge;
      dialog.disableClose = true;
      this.isNotComplete = data.isNotComplete;
      this.textIndex = data.textIndex;
     }

  async ngOnInit(): Promise<void> {
      let contentOfQuiz = await (await this.measureService.getQuestionsFromFile()).split('\n');
      this.question = contentOfQuiz[this.textIndex*2];
      this.answers = contentOfQuiz[this.textIndex*2+1].split(',');
      this.answers.forEach(answer => {
        if(answer.includes(' -c')) {
          this.answers[this.answers.indexOf(answer)] = answer.replace(' -c', '');
          this.correctAnswer = answer.replace(' -c', '');
        }
      })

    this.isDone = false; 
    this.age = '0';
  }

  confirm() {
    this.isDone = true;
    if (this.choice == this.correctAnswer) {
      this.isCorrect = true;
    }
    else this.isCorrect = false;
  }

  ok() {
    this.dialog.close(this.isCorrect);
  }

  submitAge() {
    this.dialog.close(this.age);
  }
}
