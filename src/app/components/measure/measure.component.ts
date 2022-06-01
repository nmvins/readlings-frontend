import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { MeasureService } from 'src/app/services/measure.service';
import { MeasureDialogContentComponent } from '../measure-dialog-content/measure-dialog-content.component';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {

  text: string;
  fileContent = '';
  numberOfWords: number;
  textIndex: number;

  interval: any;
  seconds = 0;

  flick: boolean;
  intervalIndex: number;
  timePeriods = [2000, 1000, 500, 250, 100, 50, 10, 5];
  attentionLevels = ["Very low", "Low", "Medium low", "Medium", "Medium", "Medium high", "High", "Very high"]
  currentPeriod: number;
  timePeriodIndex: number;

  isAttentionMeasured: boolean;

  constructor(protected router: Router, public dialog: MatDialog, private measureService: MeasureService) { }

  async ngOnInit(): Promise<void> {
    this.isAttentionMeasured = false;
    let res = await this.measureService.getAge();
    if (!(parseInt(res) > 0)) {
      const dialogRef = this.dialog.open(MeasureDialogContentComponent, {
        data: {
          isSquare: false,
          isAge: true,
          isNotComplete: false
        }
      });

      dialogRef.afterClosed().subscribe(async result => {
        let res = await this.measureService.updateAge(result);
      });
    }
    this.flick = false;
    this.seconds = 0;
    this.intervalIndex = 0;
    this.timePeriodIndex = 0;
    let result = await this.measureService.getTextFromFile();
    let texts = result.split("//////////////////////////");
    this.textIndex = Math.floor(Math.random() * (5 - 0) + 0);
    this.fileContent = texts[this.textIndex];
  }

  start() {
    document.getElementById('start')?.setAttribute('disabled', '');
    this.currentPeriod = this.timePeriods[this.timePeriodIndex];
    this.interval = setInterval(() => {
      this.flick = !this.flick;
      this.intervalIndex++;
      if (this.intervalIndex == 60) {
        this.timePeriodIndex++;
        this.currentPeriod = this.timePeriods[this.timePeriodIndex];
        this.intervalIndex = 0;
      }
      if (this.timePeriodIndex == 8) {
        this.stop();
      }
    }, this.currentPeriod);
  }

  async stop() {
    this.isAttentionMeasured = true;
    clearInterval(this.interval);
    let res = await this.measureService.addAttentionMeasurement(this.attentionLevels[this.timePeriodIndex]);
    const dialogRef = this.dialog.open(MeasureDialogContentComponent, {
      data: {
        attention: this.attentionLevels[this.timePeriodIndex],
        isSquare: true,
        isAge: false,
        isNotComplete: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.squareFinish();
      return this.scrollToElement(document.getElementById("target")!);
    });
  }

  squareFinish() {
    this.timePeriodIndex = 0;
    this.intervalIndex = 0;
    this.seconds = 0;
  }

  read() {
    document.getElementById('read')?.setAttribute('disabled', '');
    this.text = this.fileContent;
    this.interval = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  async done() {
    clearInterval(this.interval);
    this.numberOfWords = this.fileContent.split(/\s+/).length;
    let res = await this.measureService.addSpeedMeasurement(this.calculateSpeed(this.numberOfWords).toString());
    const dialogRef = this.dialog.open(MeasureDialogContentComponent, {
      data: {
        speed: this.calculateSpeed(this.numberOfWords),
        isSquare: false,
        isAge: false,
        isNotComplete: false,
        textIndex: this.textIndex
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['reading-settings']);
      } else {
        location.reload();
      }
    });
  }

  calculateSpeed(numberOfWords: number) {
    //returns number of words/min
    return numberOfWords * 60 / this.seconds;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  scrollToElement(el: HTMLElement): void {
    if(this.isAttentionMeasured) {
      el.scrollIntoView({ behavior: "smooth" });
      document.getElementById('scroll')?.setAttribute('style', 'display: none');
    }
    else {
      const dialogRef = this.dialog.open(MeasureDialogContentComponent, {
      data: {
        isSquare: false,
        isAge: false,
        isNotComplete: true
      }
    });
  }
}
}
