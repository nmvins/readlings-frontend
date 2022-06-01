import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private basePath = environment.apiUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {
    //localStorage.clear();
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  get userValue(): any {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return this.http.post(this.basePath + '/users/signin', {},
      { params: params }).pipe(map((user: any) => {
        user.authdata = window.btoa(email + ':' + password);
        user.email = email;
        user.password = password;
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  signup(email: string, password: string, username: string) {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.basePath + "/users/signup", { "email": email, "password": password, "username": username },
      )).then(data => {
        resolve(data);
      }).catch((err: HttpErrorResponse) => {
        this.openSnackBar('Email or username is already in use');
      });
    });
  }

  getCurrentUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next({});
    this.router.navigate(['']);
  }

  isLoggedIn() {
    if (this.userValue.token !== null) {
      if (!this.helper.isTokenExpired(this.userValue.token)) {
        return true;
      } else { return false; }
    } else {
      return false;
    }
  }
}