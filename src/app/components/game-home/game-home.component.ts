import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LevelsService } from 'src/app/services/levels.service';
import { ReadingSettingsService } from 'src/app/services/reading-settings.service';
import { environment } from 'src/environments/environment';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent implements OnInit {

  levelNumber: number;
  area: number;

  //fileContent: string;
  fileContent = 'Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary. The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). There are different types of texts and interactive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time.';

  showText = false;

  constructor(
    protected levelsService: LevelsService,
    protected router: Router,
    protected readingSettingsService: ReadingSettingsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async start() {
    let response = await this.levelsService.getLevel();
    this.levelNumber = parseInt(response);
    
    let res = await this.levelsService.getArea();
    this.area = parseInt(res);

    this.levelsService.setFileContent(this.fileContent);
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        firstLevel: true,
        isDone: false,
        areaChanged: false
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/app-game-read'], { queryParams: { level: this.levelNumber } });
    });
  }

  goToChallenges() {
    this.router.navigate(['challenges']);
  }
}
