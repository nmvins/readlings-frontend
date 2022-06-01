import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';
import { User } from '../models/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  apiUrl = environment.apiUrl;
  currentUser: any;
  user: User;

  filecontent = '';
  speed = '';
  method = '';
  methodSettingText = '';

  currentLevel: number;
  currentArea: number;
  userScore = 0;

  constructor(private http: HttpClient, private authService: AuthenticationService) { this.getCurrentUser(); }

  setFileContent(data: string) {
    this.filecontent = data;
  }

  getFileContent() {
    return this.filecontent;
  }

  setSpeed(data: string) {
    this.speed = data;
  }

  getSpeed() {
    return this.speed;
  }

  setMethod(data: string) {
    this.method = data;
  }

  getMethod() {
    return this.method;
  }

  setMethodSettingText(data: string) {
    this.methodSettingText = data;
  }

  getMethodSettingText() {
    return this.methodSettingText;
  }

  setLevel(level: number): Promise<object> {
    this.currentLevel = level;
    return firstValueFrom(this.http.post(this.apiUrl + "/users/updateLevel", { "email": this.currentUser.email, "level": this.currentLevel }));
  }

  getLevel(): Promise<string> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get(this.apiUrl + "/users/getUserLevel", { params: params, responseType: 'text' })).then(data => {
        resolve(data);
        this.currentLevel = parseInt(data);
      });
    }
    )
  }

  setArea(area: number): Promise<object> {
    this.currentArea = area;
    return firstValueFrom(this.http.post(this.apiUrl + "/users/updateArea", { "email": this.currentUser.email, "area": this.currentArea }));
  }

  getArea(): Promise<string> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get(this.apiUrl + "/users/getUserArea", { params: params, responseType: 'text' })).then(data => {
        resolve(data);
        this.currentArea = parseInt(data);
      });
    });
  }

  setScore(score: number): Promise<object> {
    this.userScore = this.userScore + score;

    return firstValueFrom(this.http.post(this.apiUrl + "/users/updateScore", { "email": this.currentUser.email, "score": this.userScore.toString() }));
  }

  decreaseScore(score: number): Promise<object> {
    this.userScore = this.userScore - score;
    return new Promise(resolve => {

      firstValueFrom(this.http.post(this.apiUrl + "/users/updateScore", { "email": this.currentUser.email, "score": this.userScore.toString() })).then(data => {
        resolve(data);
      });
    });
  }

  getScore(): Promise<string> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get(this.apiUrl + "/users/getUserScore", { params: params, responseType: 'text' }))
        .then(data => {
          resolve(data);
          this.userScore = parseInt(data);
        });
    })
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(data => this.currentUser = data);
  }

  getUser(): Promise<User> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get(this.apiUrl + "/users/getUser", { params: params }))
        .then(data => {
          resolve(data);
          this.user = data;
        });
    })
  }

  getUserBooks(): Promise<Book[]> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get<Book[]>(this.apiUrl + "/users/getUserBooks", { params: params }))
        .then(data => {
          resolve(data);
        });
    })
  }

  getTextFromFile(area: String, level: String): Promise<string> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get('assets/Area' + area + '-Level' + level + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
          this.filecontent = data;
        });
    })
  }

  getQuestionsFromFile(area: String): Promise<string> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get('assets/Area' + area + '-quiz' + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
        });
    })
  }
}
 