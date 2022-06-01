import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepperIntl } from '@angular/material/stepper';
import { NavigationEnd, Router } from '@angular/router';
import { ReadingSettingsService } from 'src/app/services/reading-settings.service';
import { environment } from 'src/environments/environment';
import { Methods, TextType } from './reading-settings.constants';

@Component({
  selector: 'app-reading-settings',
  templateUrl: './reading-settings.component.html',
  styleUrls: ['./reading-settings.component.scss']
})
export class ReadingSettingsComponent implements OnInit {

  methods = Methods;
  textTypes = TextType;

  speed: string;
  method: string;
  methodSettingText: string;

  fileName: string;
  file: File;
  fileContent: string;

  showText = false;

  apiUrl = environment.apiUrl;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  optionalLabelText: string;
  optionalLabelTextChoices: string[] = ['Predefined book', 'Upload'];

  predefBookChoice = false;
  uploadChoice = false;
  isChosen = false;

  isNotCompleted = false;

  constructor(protected router: Router, protected readingSettingsService: ReadingSettingsService, private http: HttpClient,
    private _formBuilder: FormBuilder, private _matStepperIntl: MatStepperIntl) { }

  ngOnInit(): void {
    if(this.readingSettingsService.comesFromPredef) {
      this.scrollToElement(document.getElementById('target')!);
      this.readingSettingsService.comesFromPredef = false;
    }
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      document.body.scrollTop = 0;
  });
    this.fileContent = this.readingSettingsService.getFileContent();
    this.fileName = this.readingSettingsService.getBookTitle();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  start() {
    this.readingSettingsService.setFileContent(this.fileContent);
    this.readingSettingsService.setSpeed(this.speed);
    this.readingSettingsService.setMethod(this.method);
    this.readingSettingsService.setMethodSettingText(this.methodSettingText);

    if(this.fileContent != undefined && this.speed != undefined && this.method != undefined && this.methodSettingText != undefined) {
      this.router.navigate(['read']);
    }
    else this.isNotCompleted = true;
  }

  selectPredefinedBooks() {
    this.router.navigate(['predefined-books']);
  } 

  async onFileSelected(event: any) {
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;
      await this.readingSettingsService.saveBook(this.file);
      let result = await this.readingSettingsService.getBookContent();
      this.fileContent = result;
    }
  }

  showTextFromFile() {
    this.showText = true;
    this.fileContent = this.readingSettingsService.getFileContent();
  }

  updateOptionalLabel() {
    this._matStepperIntl.optionalLabel = this.optionalLabelText;
    this._matStepperIntl.changes.next();

    if(this.optionalLabelText == 'Predefined book') {
      this.predefBookChoice = true;
      this.uploadChoice = false;
    }
    else  {
      this.uploadChoice = true;
      this.predefBookChoice = false; }
      this.isChosen = true;
  }

  scrollToElement(el: HTMLElement): void {
    el.scrollIntoView({behavior: "smooth"});
  }
}


//  methodControl = new FormControl('', Validators.required);
//  typeControl = new FormControl('', Validators.required);