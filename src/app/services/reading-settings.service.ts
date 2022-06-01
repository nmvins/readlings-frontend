declare const Buffer: any;
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReadingSettingsService {
  predefinedBooks: Book[];

  currentUser: any;

  apiUrl = environment.apiUrl;
  filecontent = '';
  speed = '';
  method = '';
  methodSettingText = '';

  filePath: string;

  book: Book = {
    "title": ''
  }
  nrOfbooks: number;

  comesFromPredef = false;

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

  getFilePath() {
    return this.filePath;
  }

  setCurrentBook(data: Book) {
    this.book = data;
  }

  getBookTitle() {
    return this.book.title!;
  }

  async saveBook(file: File) {
    this.filePath = 'uploaded';
    const formData = new FormData();
    formData.append("file", file);

    this.book.title = file.name;
    let result = await this.getCurrentNumberOfBooks();
    this.book.bookId = (parseInt(result) + 1).toString();
    await this.addBookToUser();

    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/store/", formData, { responseType: 'text' })).then(data => {
        resolve(data);
      })
    })
  }

  createbook() {
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/books/create", {
        "bookId": this.book.bookId, "title": this.book.title 
      })).then(data => {
        resolve(data);
      })
    })
  }

  async addBookToUser() {
    await this.createbook();
    return new Promise(resolve => {
      firstValueFrom(this.http.post(this.apiUrl + "/users/addBookToUser", {
        "user": { "email": this.currentUser.email, "id": this.currentUser.id, "password": this.currentUser.password },
        "Book": { "bookId": this.book.bookId, "title": this.book.title }
      })).then(data => {
        resolve(data);
      })
    })
  }

  getBookContent(): Promise<string> {
    return new Promise(resolve => {

      firstValueFrom(this.http.get(this.apiUrl + "/files/" + this.book.title, { responseType: "text" })).then(data => {
        resolve(data);
        this.filecontent = data;
      });
    })
  }

  async getBookContentSaved(): Promise<string> {
    return new Promise(resolve => {

      firstValueFrom(this.http.get(this.apiUrl + "/files/" + this.book.title, { responseType: 'text' })).then(data => {
        resolve(data);
        this.filecontent = data;
      });
    })
  }

  getPredefinedBookContent(selectedBook: Book) {
    this.filePath = 'predefined';
    this.book.title = selectedBook.title;
    return new Promise(resolve => {

      firstValueFrom(this.http.get('assets/' + selectedBook.title + '.txt', { responseType: 'text' }))
        .then(data => {
          resolve(data);
          this.filecontent = data;
        })
    })
  }

  //this adds a predef book to user when it is done
  async addDonePredefBook(bookName: String) {
    this.predefinedBooks = await this.getPredefinedBooks();
    this.predefinedBooks.forEach(book => {
      if (book.title == bookName) {
        return new Promise(resolve => {
          firstValueFrom(this.http.post(this.apiUrl + "/users/addPredefinedBookToUser", {
            "user": { "email": this.currentUser.email, "id": this.currentUser.id, "password": this.currentUser.password },
            "PredefinedBook": { "bookId": book.bookId, "title": book.title }
          })).then(data => {
            resolve(data);
          });
        });
      }
      else {
        return false;
      }
    });
  }

  getPredefinedBooks(): Promise<Book[]> {
    return new Promise(resolve => {

      firstValueFrom(this.http.get<Book[]>(this.apiUrl + "/predefinedBooks/get"))
        .then(data => {
          resolve(data);
          this.predefinedBooks = data;
        });
    })
  }

  getUserPredefBooks(): Promise<Book[]> {
    return new Promise(resolve => {
      let params = new HttpParams();
      params = params.append('email', this.currentUser.email);

      firstValueFrom(this.http.get<Book[]>(this.apiUrl + "/users/getUserPredefinedBooks", { params: params }))
        .then(data => {
          resolve(data);
        });
    })
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(data => this.currentUser = data);
  }

  getCurrentNumberOfBooks(): Promise<string> {
    return new Promise(resolve => {

      firstValueFrom(this.http.get(this.apiUrl + "/books/countBooks", { responseType: 'text' }))
        .then(data => {
          resolve(data);
          this.nrOfbooks = parseInt(data);
        });
    })
  }
}