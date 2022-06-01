import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Challenge } from '../models/Challenge';
import { User } from '../models/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  apiUrl = environment.apiUrl;
  currentUser: any;

  currentChallenge: Challenge;

  challenges: Challenge[] = [];
  unlockedChallenges: Challenge[] = [];
  doneChallenges: Challenge[] = [];
  existingChallenges: Challenge[] = [];
  premiumChallenges: Challenge[] = [];

  constructor(private http: HttpClient, private authService: AuthenticationService) { this.getCurrentUser(); }


  getAllChallenges(): Promise<Challenge[]> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get<Challenge[]>(this.apiUrl + "/challenges/"))
        .then(data => {
          resolve(data);
          this.challenges = data;
        });
    })
  }

  setUnlockedChallenges(data: Challenge[]) {
    this.unlockedChallenges = data;
  }

  getUnlockedChallenges(): Promise<Challenge[]> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get<Challenge[]>(this.apiUrl + "/users/getUserUnlockedChallenges", { params: params })).then(data => {
        resolve(data);
        this.unlockedChallenges = data;
      });
    }
    )
  }

  getDoneChallenges(): Promise<Challenge[]> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get<Challenge[]>(this.apiUrl + "/users/getUserDoneChallenges", { params: params })).then(data => {
        resolve(data);
        this.doneChallenges = data;
      });
    }
    )
  }

  setExistingChallenges(data: Challenge[]) {
    this.existingChallenges = data;
  }

  async getExistingChallenges() {
    this.premiumChallenges = [];
    this.existingChallenges = [];
    let result = await this.getAllChallenges();
    result.forEach(item => {
      if (!this.unlockedChallenges.some(el => el.title == item.title)) {
        if (!this.doneChallenges.some(el => el.title == item.title)) {
          if (item.difficulty.includes("Hard")) {
            this.premiumChallenges.push(item);
          }
          else this.existingChallenges.push(item);
        }
      }
    });
  }

  returnExistingChallenges() {
    return this.existingChallenges;
  }

  setPremiumChallenges(data: Challenge[]) {
    this.premiumChallenges = data;
  }

  setCurrentChallenge(data: Challenge) {
    this.currentChallenge = data;
  }

  async setChallengeDone(data: Challenge) {
    let result = await this.deleteUnlockedChallenge(data);
    result = await this.addDoneChallenge(data);
  }


  deleteUnlockedChallenge(data: Challenge): Promise<Object> {
    return new Promise(resolve => {

      firstValueFrom(this.http.post(this.apiUrl + "/users/deleteUnlockedChallengeFromUser", { "email": this.currentUser.email, "challengeId": data.challengeId })).then(data => {
        resolve(data);

      });
    }
    )
  }

  addDoneChallenge(data: Challenge): Promise<Object> {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addDoneChallengeToUser", {
        "user": { "email": this.currentUser.email, "id": this.currentUser.id, "password": this.currentUser.password },
        "DoneChallenge": { "challengeId": data.challengeId, "title": data.title, "description": data.description, "difficulty": data.difficulty, "isUnlocked": data.isUnlocked, "isFinished": data.isFinished }
      })).then(data => {
        resolve(data);
      });
    }
    )
  }

  unlock(choice: Challenge): Promise<Object> {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addUnlockedChallengeToUser", {
        "user": { "email": this.currentUser.email, "id": this.currentUser.id, "password": this.currentUser.password },
        "UnlockedChallenge": { "challengeId": choice.challengeId, "title": choice.title, "description": choice.description, "difficulty": choice.difficulty, "isUnlocked": choice.isUnlocked, "isFinished": choice.isFinished }
      })).then(data => {
        resolve(data);
      });
    }
    )
  }

  getTextFromFile(title: String): Promise<string> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get('assets/' + title + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
        });
    })
  }

  getQuestionsFromFile(): Promise<string> {
    return new Promise(resolve => {
      firstValueFrom(this.http.get('assets/Challenges' + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
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
          this.currentUser = data;
        });
    })
  }
}
