import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reading-dialog-content',
  templateUrl: './reading-dialog-content.component.html',
  styleUrls: ['./reading-dialog-content.component.scss']
})
export class ReadingDialogContentComponent implements OnInit {

  isBookNotChosen: boolean;
  isCorrect: boolean;
  isAnswered: boolean;
  isUploaded: boolean;

  constructor(private dialog: MatDialogRef<ReadingDialogContentComponent>,
    protected router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {
      disableClose: boolean,
      isCorrect: boolean,
      isBookNotChosen: boolean,
      isAnswered: boolean,
      isUploaded: boolean
    }) {
    this.isAnswered = data.isAnswered;
    this.isCorrect = data.isCorrect;
    this.isBookNotChosen = data.isBookNotChosen;
    this.isUploaded = data.isUploaded;
    dialog.disableClose = data.disableClose;
  }

  ngOnInit(): void {

  }

  confirm() {
    this.dialog.close('ok');
  }

  confirmCorrect() {
    this.dialog.close('correct');
  }
}
