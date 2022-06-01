import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  currentUser: User;
  age: string;
  fileContent: string;

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthenticationService) { this.getCurrentUser(); }

  getAge(): Promise<string> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email!);

      firstValueFrom(this.http.get<string>(this.apiUrl + "/users/getAge", { params: params }))
        .then(data => {
          resolve(data);
          this.age = data;
        });
    })
  }

  //this adds a new measurement of attention
  addAttentionMeasurement(attention: String) {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addAttentionMeasurement", {
        "email": this.currentUser.email,
        "attention": attention
      }
      )).then(data => {
        resolve(data);
      });
    });
  }

  //this adds a new measurement of speed
  addSpeedMeasurement(speed: String) {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addSpeedMeasurement", {
        "email": this.currentUser.email,
        "speed": speed
      }
      )).then(data => {
        resolve(data);
      });
    });
  }

  //this updates user age
  updateAge(age: String) {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/updateAge", {
        "email": this.currentUser.email,
        "age": age
      }
      )).then(data => {
        resolve(data);
      });
    });
  }

  getTextFromFile(): Promise<string> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get('assets/MeasureText' + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
          this.fileContent = data;
        });
    })
  }

  getQuestionsFromFile(): Promise<string> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get('assets/MeasureText-quiz' + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
        });
    })
  }

  addLoginDate(date: string) {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addLoginDate", {
        "email": this.currentUser.email,
        "date": date
      }
      )).then(data => {
        resolve(data);
      });
    });
  }

  addLogoutDate(date: string) {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addLogoutDate", {
        "email": this.currentUser.email,
        "date": date
      }
      )).then(data => {
        resolve(data);
      });
    });
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(data => this.currentUser = data);
  }
}
