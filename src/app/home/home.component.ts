import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LibraryService, URLTYPE } from '../shared/library.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.getAuthor();
  }

  getAuthor() {
    const data = this.libraryService.list(URLTYPE.AUTHORBOOK).pipe(
      map(data => {
        const withoutBook = data.data.filter(item => delete item.book);
        return withoutBook;
      })
    ).subscribe(response => {
      console.log(response);
    })
  }


}
