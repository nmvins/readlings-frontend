import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeasureService } from 'src/app/services/measure.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.authService.logout();
  }

  user1: any;

  usernameToSignUp: string;
  emailToSignup: string;
  passwordtoSignUp: string;

  usernameToLogin: string;
  emailToLogin: string;
  passwordToLogin: string;

  invalidCredentials = false;
  loading = false;

  constructor(private datePipe: DatePipe, protected authService: AuthenticationService, protected measureService: MeasureService,
     protected router: Router, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async login() {
    if (this.emailToLogin == undefined || this.passwordToLogin == undefined) {
      this.openSnackBar('Empty email or password');
    }
    else {
      this.invalidCredentials = false;
      try {
        this.loading = true;
        const result = await this.authService.login(this.emailToLogin, this.passwordToLogin).toPromise();
        const time = new Date();
        await this.measureService.addLoginDate(this.transformDate(time)!);
        this.router.navigate(['home']);
      }
      catch (e) {
        this.invalidCredentials = true;
        this.openSnackBar('Invalid email or password');
      } finally {
        this.loading = false;
      }
    }
  }

  async signup() {
    if (this.emailToSignup == undefined || this.passwordtoSignUp == undefined || this.usernameToSignUp == undefined) {
      this.openSnackBar('Empty email, username or password');
    }
    else {
      try {
        this.loading = true;
        const result = await this.authService.signup(this.emailToSignup, this.passwordtoSignUp, this.usernameToSignUp)
        this.moveToLoginTab("Login");
      }
      catch (e) {
      } finally {
        this.loading = false;
      }
    }
  }

  moveToSignUpTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }

  moveToLoginTab(tabName: string) {
    for (let i = 0; i < document.querySelectorAll('.mat-tab-label-content').length; i++) {
      if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'MMM d, y, h:mm:ss a');
  }
}

