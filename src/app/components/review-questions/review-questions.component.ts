import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { ReadingSettingsService } from 'src/app/services/reading-settings.service';
import { ReadingDialogContentComponent } from '../reading-dialog-content/reading-dialog-content.component';
import { questions } from './review-questions.constants';

@Component({
  selector: 'app-review-questions',
  templateUrl: './review-questions.component.html',
  styleUrls: ['./review-questions.component.scss']
})
export class ReviewQuestionsComponent implements OnInit {

  filePath: String;
  fileName: String;
  step = 0;
  answers: String[][] = [];
  questions: String[] = [];
  correctAnswers: any;
  isCorrect: boolean;
  isAnswered: boolean;

  isPredefined = false; 
  isUploaded = false;

  userAnswers: String[] = [];

  constructor(protected router: Router, private readingSettingsService: ReadingSettingsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filePath = this.readingSettingsService.getFilePath();
    this.fileName = this.readingSettingsService.getBookTitle();

    if (this.filePath == 'predefined') {
      questions.forEach(book => {
        if (book.bookTitle == this.fileName) {
          this.questions = book.bookQuestions;
          this.answers = book.bookAnswers;
          this.correctAnswers = book.correctAnswers;
        }
      })
      this.isPredefined = true;
      this.isUploaded = false;
    } else if (this.filePath == 'uploaded') {
      this.questions = ["What is the main subject of the text?", "From whose point of view is the text told?",
        "What is your opinion about the text?"];
      this.isPredefined = false;
      this.isUploaded = true;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  done() {
    this.isAnswered = true;
    this.isCorrect = true;
    if (this.filePath == 'predefined') {
      if(this.userAnswers.length<3) this.isAnswered = false;
        for (let i = 0; i < this.userAnswers.length; i++) {
          if (!this.userAnswers[i]) 
            this.isAnswered = false;
          else if (this.userAnswers[i] != this.correctAnswers[i]) 
            this.isCorrect = false;
          }

      const dialogRef = this.dialog.open(ReadingDialogContentComponent, {
        data: {
          disableClose: this.isAnswered,
          isCorrect: this.isCorrect,
          isBookNotChosen: false,
          isAnswered: this.isAnswered,
          isUploaded: this.isUploaded
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result == 'ok') this.router.navigate(['reading-settings']);
        else if(result == 'correct') {
          let res = await this.readingSettingsService.addDonePredefBook(this.fileName);
          this.router.navigate(['reading-settings']);
        }
      });
    } else if (this.filePath == 'uploaded') {
      const dialogRef = this.dialog.open(ReadingDialogContentComponent, {
        data: {
          disableClose: true,
          isCorrect: true,
          isBookNotChosen: false,
          isAnswered: true,
          isUploaded: this.isUploaded
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result == 'ok') this.router.navigate(['reading-settings']);
      });
    }
  }
}
