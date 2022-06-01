import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Challenge } from 'src/app/models/Challenge';
import { ChallengeService } from 'src/app/services/challenge.service';
import { LevelsService } from 'src/app/services/levels.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-game-read',
  templateUrl: './game-read.component.html',
  styleUrls: ['./game-read.component.scss']
})
export class GameReadComponent implements OnInit {

  constructor(protected router: Router, private levelsService: LevelsService, private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private challengeService: ChallengeService,
  ) { }

  challengesToUnlock: Challenge[] = [
    {
      title: '',
      challengeId: '',
      description: '',
      difficulty: '',
      isFinished: false,
      isUnlocked: false
    },
    {
      title: '',
      challengeId: '',
      description: '',
      difficulty: '',
      isFinished: false,
      isUnlocked: false
    }
  ]; 

  fileContent: string;
  speed: string;
  method: string;
  methodSettingText: string;
  word: string;

  interval: any;
  index = 0;

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
  listOfAnswers: string[] =[];
  givenCorrectAnswer: string;

  area: number;
  activeLevel: number;
  score: number;
  userScore: number;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async (params: any) => {
      this.activeLevel = parseInt(params.level);

      await this.levelsService.setLevel(this.activeLevel);

      let res = await this.levelsService.getArea();
      this.area = parseInt(res);

      this.score = this.area * this.activeLevel * 50;
      res = await this.levelsService.getScore();
      this.userScore = parseInt(res);
      
      switch (this.area) {
        case 1: {
          this.methodSettingText = '0';
          this.method = '2';
          this.speed = (20 * this.activeLevel).toString();
          this.challengesToUnlock[0].title = "Coca-Cola’s ‘health by stealth’ wheeze is sneaky. But if it works so be it";
          break;
        }

        case 2: {
          this.methodSettingText = '0';
          if (this.activeLevel < 4) this.method = '1';
          else this.method = '7';
          if (this.activeLevel / 2 < 2) this.speed = (this.activeLevel * 40).toString();
          else this.speed = (40 * (this.activeLevel - 3)).toString();
          this.challengesToUnlock[0].title = 'How trees can teach us about our own lives';
          break;
        }

        case 3: {
          this.methodSettingText = '1';
          if (this.activeLevel < 4) this.method = '2';
          else this.method = '1';
          if (this.activeLevel / 2 < 2) this.speed = (this.activeLevel * 50).toString();
          else this.speed = (50 * (this.activeLevel - 3)).toString();
          this.challengesToUnlock[0].title = 'Marks and standards the need for a better evaluation system';
          this.challengesToUnlock[1].title = 'Nothing is what it seems to be';
          break;
        }

        case 4: {
          this.methodSettingText = '1';
          if (this.activeLevel < 4) this.method = '5';
          else this.method = '3';
          if (this.activeLevel / 2 < 2) this.speed = (this.activeLevel * 60).toString();
          else this.speed = (40 * (this.activeLevel - 3)).toString();
          this.challengesToUnlock[0].title = 'On human shields and questions that won’t go away';
          break;
        }

        case 5: {
          this.methodSettingText = '0';
          if (this.activeLevel < 4) this.method = '3';
          else this.method = '4';
          if (this.activeLevel / 2 < 2) this.speed = (this.activeLevel * 50).toString();
          else this.speed = (40 * (this.activeLevel - 3)).toString();
          this.challengesToUnlock[0].title = 'Putting out a fire with more smoke';
          break;
        }

        case 6: {
          this.methodSettingText = '0';
          if (this.activeLevel < 4) this.method = '0';
          else this.method = '7';
          if (this.activeLevel / 2 < 2) this.speed = (this.activeLevel * 40).toString();
          else this.speed = (40 * (this.activeLevel - 3)).toString();
          this.challengesToUnlock[0].title = 'Sweet Success';
          this.challengesToUnlock[1].title = 'Tales from the eBay Crypt';
          break;
        }

        case 7: {
          this.methodSettingText = '1';
          if (this.activeLevel < 4) this.method = '0';
          else this.method = '7';
          if (this.activeLevel / 2 < 2) this.speed = (this.activeLevel * 60).toString();
          else this.speed = (60 * (this.activeLevel - 3)).toString();
          this.challengesToUnlock[0].title = 'The Amazing Return of the Yabloner Rebbe';
          break;
        }

        case 8: {
          this.methodSettingText = '2';
          this.speed = '250';
          switch (this.activeLevel) {
            case 1: {
              this.method = '2';
              break;
            }
            case 2: {
              this.method = '1';
              break;
            }
            case 3: {
              this.method = '5';
              break;
            }
            case 4: {
              this.method = '3';
              break;
            }
            case 5: {
              this.method = '4';
              break;
            }
            case 6: {
              this.method = '0';
              break;
            }
          }
          this.challengesToUnlock[0].title = 'The cosmology of Poe';
          break;
        }

        case 9: {
          this.methodSettingText = '2';
          this.method = '7';
          this.speed = (60 * this.activeLevel).toString();
          this.challengesToUnlock[0].title = 'The Deadliest Day';
          break;
        }

        case 10: {
          this.methodSettingText = '2';
          this.speed = '250';
          switch (this.activeLevel) {
            case 1: {
              this.method = '2';
              break;
            }
            case 2: {
              this.method = '1';
              break;
            }
            case 3: {
              this.method = '5';
              break;
            }
            case 4: {
              this.method = '3';
              break;
            }
            case 5: {
              this.method = '0';
              break;
            }
            case 6: {
              this.method = '7';
              break;
            }
          }
          this.challengesToUnlock[0].title = 'The Faulkner Truthers';
          break;
        }

        case 11: {
          this.method = '6';
          switch (this.activeLevel) {
            case 1: {
              this.methodSettingText = '0';
              this.speed = '60';
              break;
            }
            case 2: {
              this.methodSettingText = '0';
              this.speed = '120';
              break;
            }
            case 3: {
              this.methodSettingText = '1';
              this.speed = '60';
              break;
            }
            case 4: {
              this.methodSettingText = '1';
              this.speed = '120'
              break;
            }
            case 5: {
              this.methodSettingText = '2';
              this.speed = '60';
              break;
            }
            case 6: {
              this.methodSettingText = '2';
              this.speed = '120'
              break;
            }
          }
          this.challengesToUnlock[0].title = 'The Future of Media is Here, and I Was There';
          break;
        }

        case 12: {
          this.methodSettingText = '2';
          this.method = '6';
          this.speed = (100 * this.activeLevel).toString();
          this.challengesToUnlock[0].title = 'The golden mean & pairs';
          break;
        }
      }

      this.fileContent = await this.levelsService.getTextFromFile(this.area.toString(), this.activeLevel.toString());
      let contentOfQuiz = await (await this.levelsService.getQuestionsFromFile(this.area.toString())).split('\n');
      this.givenQuestion = contentOfQuiz[(this.activeLevel-1)*2];
      this.listOfAnswers = contentOfQuiz[this.activeLevel*2-1].split(',');
      this.listOfAnswers.forEach(answer => {
        if(answer.includes(' -c')) {
          this.listOfAnswers[this.listOfAnswers.indexOf(answer)] = answer.replace(' -c', '');
          this.givenCorrectAnswer = answer.replace(' -c', '');
        }
      })
      this.totalNumberOfWords = this.fileContent.split(' ').length;
      this.read();
    });

  }

  read() {
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

    this.interval = setInterval(() => {
      this.word = this.entities![this.index];
      this.index++;
      if (this.index > this.entities!.length) { clearInterval(this.interval); this.onFinish() };
    }, this.calculateSpeed() * 1000);
  }

  //highlight - color - square - underline - bold - italic
  highlight() {
    this.splitText();
    this.entities.forEach(word => {
      this.finalWords.push({
        text: word,
        highlight: false,
      })
    });

    this.interval = setInterval(() => {
      this.clearAll();
      if(this.finalWords[this.index] != null) {this.finalWords[this.index].highlight = true;}
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

  async onFinish() {
   await this.levelsService.setLevel(this.activeLevel);

    if (this.activeLevel >= 6) {
      this.challengesToUnlock.forEach(async element => {
        let res = await  this.challengeService.getAllChallenges();
       res.forEach(challenge => {
          if(challenge.title == element.title) {
            this.challengeService.unlock(challenge);
          }
        })
      })
    }
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        firstLevel: false,
        isDone: true,
        areaChanged: this.activeLevel >= 6,
        givenQuestion: this.givenQuestion,
        listOfAnswers: this.listOfAnswers,
        givenCorrectAnswer: this.givenCorrectAnswer
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result == 'canceled') this.router.navigate(['game']);
      else if (result == 'return') {
        this.router.navigate(['game']);
        await this.levelsService.setScore(this.score);
        if (this.activeLevel >= 6) {
          await this.levelsService.setArea(this.area + 1);
        } else {await this.levelsService.setArea(this.area);}
        await this.levelsService.setLevel(this.activeLevel + 1);
      }
      else {
        await this.levelsService.setScore(this.score);
        if (this.activeLevel >= 6) {
          await this.levelsService.setArea(this.area + 1);
          this.router.navigate(['/app-game-read'], { queryParams: { level: 1 } });
        } else {
          this.router.navigate(['/app-game-read'], { queryParams: { level: this.activeLevel + 1 } });
        }
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}