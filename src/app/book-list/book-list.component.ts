import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from '../../models/book.model';
import {Subscription} from 'rxjs';
import {BooksService} from '../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private bookService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.booksSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.bookService.emitBooks();
  }

  /**
   * Redirige vers la page de création de livre.
   */
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  /**
   * Supprime un livre d ela bibliotheque
   * @param book : Book, Le livre a supprimé.
   */
  onDeleteBook(book: Book){
    this.bookService.removeBook(book);
  }

  /**
   * Redirige vers la page view
   * @param id : number , L'identifiant du livre.
   */
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
