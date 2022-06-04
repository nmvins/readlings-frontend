import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReadingSettingsService } from 'src/app/services/reading-settings.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {

  //TODO: split by rows doesnt work

  constructor(protected router: Router, private readingSettingsService: ReadingSettingsService) { }

  @Input() componentIsUsed = false;

  @Input() fileContent: string;
  @Input() speed: string;
  @Input() method: string;
  @Input() methodSettingText: string;
  word: string;

  interval: any;
  index = 0;
  finished = false;

  regexToSplitBy: string;

  entities: string[] = [];
  totalNumberOfWords: number;

  //highlight
  finalWords: {
    text: string;
    highlight: boolean;
  }[] = [];

  //sliding
  slidingTrue = false;
  slidingFalse = true;


  ngOnInit(): void {
    if (this.componentIsUsed == false) {
      this.fileContent = this.readingSettingsService.getFileContent();
      this.speed = this.readingSettingsService.getSpeed();
      this.method = this.readingSettingsService.getMethod();
      this.methodSettingText = this.readingSettingsService.getMethodSettingText();
      this.totalNumberOfWords = this.fileContent.split(' ').length;
    }
  }

  read() {
    document.getElementById('read')?.setAttribute('disabled', '');
    if (this.method == '0') {
      this.oneByOne();
    } else if (this.method != '0' && this.method != '7') {
      this.highlight();
    } else if (this.method == '7') {
      this.slide();
    }
  }

  //word by word 
  oneByOne() {
    this.splitText();
    this.finalWords = [];
    this.index = 0;

    this.interval = setInterval(() => {
      this.word = this.entities![this.index];
      this.index++;
      if (this.index > this.entities!.length) { clearInterval(this.interval); this.onFinish() };
    }, this.calculateSpeed() * 1000);
  }


  //highlight - color - square - underline - bold - italic
  highlight() {
    this.splitText();
    this.finalWords = [];
    this.index = 0;

    this.entities.forEach(word => {
      this.finalWords.push({
        text: word,
        highlight: false,
      })
    });

    this.interval = setInterval(() => {
      this.clearAll();
      if (this.finalWords[this.index] != null) { this.finalWords[this.index].highlight = true; }
      this.index++;
      if (this.index > this.entities.length) { clearInterval(this.interval); this.onFinish() };
    }, this.calculateSpeed() * 1000);
  }

  clearAll() {
    this.finalWords.forEach(word => {
      word.highlight = false;
    })
  }

  //slide
  slide() {
    this.splitText();
    this.finalWords = [];
    this.index = 0;

    this.interval = setInterval(() => {
      this.slidingTrue = !this.slidingTrue;
      this.slidingFalse = !this.slidingFalse;
      this.word = this.entities[this.index];
      this.index++;
      if (this.index > this.entities.length) { clearInterval(this.interval); this.onFinish() };
    }, this.calculateSpeed() * 1000);
  }

  getAnimationDuration(): string {
    return `animation-duration: ${this.calculateSpeed()}s;`;
  }

  splitText() {
    if (this.methodSettingText == '0') {
      this.fileContent = this.fileContent.replaceAll('\n', '\n@');
      this.entities = this.fileContent.replaceAll(' ', ' @').split('@');
    } else if (this.methodSettingText == '1') {
      this.entities = this.fileContent.replaceAll('.', '.@').split('@');
      //} else if (this.methodSettingText == '2') {
      //this.entities = this.fileContent.split('\n');
      //console.log(getLineBreaks(document.querySelector('.test')!.childNodes[0]));
    } else if (this.methodSettingText == '2') {
      this.entities = this.fileContent.replaceAll('\n', '\n@').split('@');
    } else {
      this.router.navigate(['reading-settings']);
    }
  }

  // getLineBreaks(node: any) {
  //   // we only deal with TextNodes
  //   if(!node || !node.parentNode || node.nodeType !== 3)
  //     return [];
  //   // our Range object form which we'll get the characters positions
  //   const range = document.createRange();
  //   // here we'll store all our lines
  //   const lines = [];
  //   // begin at the first char
  //   range.setStart(node, 0);
  //   // initial position
  //   let prevBottom = range.getBoundingClientRect().bottom;
  //   let str = node.textContent;
  //   let current = 1; // we already got index 0
  //   let lastFound = 0;
  //   let bottom = 0;
  //   // iterate over all characters
  //   while(current <= str.length) {
  //     // move our cursor
  //     range.setStart(node, current);
  //     if(current < str.length -1)
  //      range.setEnd(node, current+1);
  //     bottom = range.getBoundingClientRect().bottom;
  //     if(bottom > prevBottom) { // line break
  //       lines.push(
  //         str.substr(lastFound , current - lastFound) // text content
  //       );
  //       prevBottom = bottom;
  //       lastFound = current;
  //     }
  //     current++;
  //   }
  //   // push the last line
  //   lines.push(str.substr(lastFound));

  //   return lines;
  // }

  calculateSpeed() {
    return ((60 * this.totalNumberOfWords) / (parseInt(this.speed))) / this.entities.length;
  }

  onFinish() {
    this.finished = true;
    this.router.navigate(['review-questions']);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}



//var words = this.fileContent.split(/\s+/); --> split by line