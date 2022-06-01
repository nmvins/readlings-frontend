import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PredefBooksService {

  url = environment.apiUrl;
  booksUrl = '/predefinedBooks/get';

  constructor(protected authService: AuthenticationService, private http: HttpClient) { }

  getAllBooks() {
    return <Observable<Book[]>> this.http.get<Book[]>(this.url + this.booksUrl).pipe(
      tap(_ => console.log(`fetched books`))
    )
  }
}
