import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from 'src/app/models/Challenge';
import { ChallengeService } from 'src/app/services/challenge.service';
import { LevelsService } from 'src/app/services/levels.service';
import { ChallengeDialogContentComponent } from '../challenge-dialog-content/challenge-dialog-content.component';

@Component({
  selector: 'app-play-challenge',
  templateUrl: './play-challenge.component.html',
  styleUrls: ['./play-challenge.component.scss']
})
export class PlayChallengeComponent implements OnInit {

  challenge: Challenge = {
    title: '',
    challengeId: '',
    description: '',
    difficulty: '',
    isFinished: false,
    isUnlocked: true
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog,
    protected challengeService: ChallengeService,
    protected levelService: LevelsService) { }

  fileContent: string;
  speed: string;
  method: string;
  methodSettingText: string;
  word: string;

  interval: any;
  index = 0;

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

  givenQuestion: string;
  listOfAnswers: string[] = [];
  givenCorrectAnswer: string;

  score: number;
  userScore: number;

  doneChallenges: Challenge[] = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async (params: any) => {
      this.challenge.challengeId = params.challengeId;
      this.challenge.title = params.title;
      this.challenge.description = params.description;
      this.challenge.difficulty = params.difficulty;
      let res = await this.levelService.getScore();
      this.userScore = parseInt(res);
      this.score = 500;

      let result = await this.challengeService.getDoneChallenges();
      this.doneChallenges = result;

      switch (this.challenge.challengeId) {
        case '1': {
          this.methodSettingText = '0';
          this.method = '2';
          this.speed = '20';
          break;
        }

        case '2': {
          this.methodSettingText = '0';
          this.method = '1';
          this.speed = '40';
          break;
        }

        case '3': {
          this.methodSettingText = '0';
          this.method = '0';
          this.speed = '60';
          break;
        }

        case '4': {
          this.methodSettingText = '0';
          this.method = '2';
          this.speed = '200';
          break;
        }

        case '5': {
          this.methodSettingText = '0';
          this.method = '1+5';
          this.speed = '150';
          break;
        }

        case '6': {
          this.methodSettingText = '1';
          this.method = '1';
          this.speed = '180';
          break;
        }

        case '7': {
          this.methodSettingText = '1';
          this.method = '2';
          this.speed = '180';
          break;
        }

        case '8': {
          this.methodSettingText = '1';
          this.method = '3+5';
          this.speed = '200';
          break;
        }

        case '9': {
          this.methodSettingText = '0';
          this.method = '4';
          this.speed = '180';
          break;
        }

        case '10': {
          this.methodSettingText = '0';
          this.method = '0';
          this.speed = '200';
          break;
        }

        case '11': {
          this.methodSettingText = '0';
          this.method = '7';
          this.speed = '200';
          break;
        }

        case '12': {
          this.methodSettingText = '1';
          this.method = '0';
          this.speed = '200';
          break;
        }

        case '13': {
          this.methodSettingText = '2';
          this.method = '2+3';
          this.speed = '300';
          break;
        }

        case '14': {
          this.methodSettingText = '2';
          this.method = '1+7';
          this.speed = '400';
          break;
        }

        case '15': {
          this.methodSettingText = '2';
          this.method = '1+3';
          this.speed = '300';
          break;
        }

        case '16': {
          this.methodSettingText = '0';
          this.method = '6';
          this.speed = '200';
          break;
        }

        case '17': {
          this.methodSettingText = '2';
          this.method = '6';
          this.speed = '800';
          break;
        }

        case '18': {
          this.methodSettingText = '0';
          this.method = '2';
          this.speed = '400';
          break;
        }

        case '19': {
          this.methodSettingText = '0';
          this.method = '1';
          this.speed = '500';
          break;
        }

        case '20': {
          this.methodSettingText = '1';
          this.method = '3';
          this.speed = '450';
          break;
        }

        case '21': {
          this.methodSettingText = '1';
          this.method = '4';
          this.speed = '550';
          break;
        }

        case '22': {
          this.methodSettingText = '2';
          this.method = '5';
          this.speed = '600';
          break;
        }

        case '23': {
          this.methodSettingText = '2';
          this.method = '6';
          this.speed = '700';
          break;
        }

        case '24': {
          this.methodSettingText = '2';
          this.method = '0';
          this.speed = '650';
          break;
        }

        case '25': {
          this.methodSettingText = '2';
          this.method = '7';
          this.speed = '750';
          break;
        }
      }

      let textResult = await this.challengeService.getTextFromFile(this.challenge.title);
      this.fileContent = textResult;
      let contentOfQuiz = await (await this.challengeService.getQuestionsFromFile()).split('\n');
      this.givenQuestion = contentOfQuiz[(parseInt(this.challenge.challengeId) - 1) * 2];
      this.listOfAnswers = contentOfQuiz[parseInt(this.challenge.challengeId) * 2 - 1].split(',');
      this.listOfAnswers.forEach(answer => {
        if (answer.includes(' -c')) {
          this.listOfAnswers[this.listOfAnswers.indexOf(answer)] = answer.replace(' -c', '');
          this.givenCorrectAnswer = answer.replace(' -c', '');
        }
      })
      this.totalNumberOfWords = this.fileContent.split(' ').length;
      this.read();
    })
  }


  read() {
    if (this.method == '0') {
      this.oneByOne();
    } else if (this.method != '0' && this.method != '7' && this.method != '1+7') {
      this.highlight();
    } else if (this.method == '7' || this.method == '1+7') {
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
      if (this.index > this.entities!.length) { clearInterval(this.interval); this.onFinish() };
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

  calculateSpeed() {
    return ((60 * this.totalNumberOfWords) / (parseInt(this.speed))) / this.entities.length;
  }

  onFinish() {
    const dialogRef = this.dialog.open(ChallengeDialogContentComponent, {
      data: {
        isDone: true,
        shouldStartChallenge: false,
        givenQuestion: this.givenQuestion,
        listOfAnswers: this.listOfAnswers,
        givenCorrectAnswer: this.givenCorrectAnswer
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (!this.doneChallenges.some(el => el.title == this.challenge.title)) {
          await this.levelService.setScore(this.score);
          let res = await this.challengeService.setChallengeDone(this.challenge);
        } else { console.log("This challenge was already completed (you don't get the score twice)") }
      }
      this.router.navigate(['challenges']);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}