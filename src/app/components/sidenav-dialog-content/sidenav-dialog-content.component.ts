import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LevelsService } from 'src/app/services/levels.service';

@Component({
  selector: 'app-sidenav-dialog-content',
  templateUrl: './sidenav-dialog-content.component.html',
  styleUrls: ['./sidenav-dialog-content.component.scss']
})
export class SidenavDialogContentComponent implements OnInit {

  changeLevel: boolean;
  level: string;
  area: string;
  info: String[] = [];
  maxLevel: string;
  maxArea: string;

  constructor(private levelService:LevelsService,
     private dialog: MatDialogRef<SidenavDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      changeLevel: boolean,
    }) {
      this.changeLevel = data.changeLevel;
      dialog.disableClose = true;
     }

  async ngOnInit(): Promise<void> {
    let res1 = await this.levelService.getLevel();
    this.level = res1;
    this.maxLevel = res1;
    let res2 = await this.levelService.getArea();
    this.area = res2;
    this.maxArea = res2;
  }

  submit(){
    this.info[0] = this.level;
    this.info[1] = this.area;
    this.dialog.close(this.info);
  }

}
