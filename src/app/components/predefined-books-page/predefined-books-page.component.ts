import { Component, OnInit } from '@angular/core';
import { PredefBooksService } from 'src/app/services/predef-books.service';
import { Book } from 'src/app/models/Book';
import { HttpClient } from '@angular/common/http';
import { ReadingSettingsService } from 'src/app/services/reading-settings.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReadingDialogContentComponent } from '../reading-dialog-content/reading-dialog-content.component';

@Component({
  selector: 'app-predefined-books-page',
  templateUrl: './predefined-books-page.component.html',
  styleUrls: ['./predefined-books-page.component.scss']
})
export class PredefinedBooksPageComponent implements OnInit {

  public bookList: Book[] = [];

  fileContent: string;

  constructor(protected router: Router, protected booksService: PredefBooksService, private http: HttpClient, private readingSettings: ReadingSettingsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe(
      result => {
        this.bookList = result;
      });
  }

  selectedBook: Book = {};

  onSelect(book: Book) {
    this.selectedBook = book;
  }

  async choose() {
    if (this.selectedBook.title != undefined) {
      let res = await this.readingSettings.getPredefinedBookContent(this.selectedBook);
      this.readingSettings.comesFromPredef = true;
      this.router.navigate(['reading-settings']);
    } else  {
      const dialogRef = this.dialog.open(ReadingDialogContentComponent, {
      data: {
        isBookNotChosen: true,
        isAnswered: false,
        isCorrect: false,
      }
    });
  }
  }
}
