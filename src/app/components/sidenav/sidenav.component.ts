import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/models/Book';
import { Challenge } from 'src/app/models/Challenge';
import { User } from 'src/app/models/User';
import { ChallengeService } from 'src/app/services/challenge.service';
import { LevelsService } from 'src/app/services/levels.service';
import { ReadingSettingsService } from 'src/app/services/reading-settings.service';
import { SidenavDialogContentComponent } from '../sidenav-dialog-content/sidenav-dialog-content.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  panelOpenState = false;

  mode = new FormControl('over');
  shouldRun = true;

  @Input() sidenav: any;
  doneChallenges: Challenge[]; 
  userScore: string;
  currentUser: User;
  isProfile: boolean;
  userBooks: Book[];
  userFinishedPredefBooks: Book[];

  constructor(private challengeService: ChallengeService, private levelService: LevelsService, private readingSettingsService: ReadingSettingsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  } 

  async getChallenges() {
    let res = await this.challengeService.getDoneChallenges();
    this.doneChallenges = res;
  }

  async getProfile() {
    let user = await this.levelService.getUser();
    this.currentUser = user;
    this.isProfile = true;
  }

  async getUploadedBooks() {
    let books = await this.levelService.getUserBooks();
    this.userBooks = books;
  }

  async getfinishedPredefBooks() {
    let finishedPredefBooks = await this.readingSettingsService.getUserPredefBooks();
    this.userFinishedPredefBooks = finishedPredefBooks;
  }

  changeLevel() {
    const dialogRef = this.dialog.open(SidenavDialogContentComponent, {
      data: {
        changeLevel: this.changeLevel
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.levelService.setLevel(parseInt(result[0]));
        await this.levelService.setArea(parseInt(result[1]));
      }
    });
  }

}
