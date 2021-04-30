import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Rx';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {Book} from '../../models/book.model';

@Injectable()
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  /**
   * Permet de sauvegarder la liste sur un node de la BDD.
   */
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data: DataSnapshot) => {
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        }
      );
  }

  constructor() {
    this.getBooks();
  }

  /**
   * Récupère un livre selon son id. Once ne fait qu'une seule requête de données,
   * et retourne une promise permettant l'utilisation de .then() pour retourner
   * les données reçues.
   * @param id : number , l'index du livre dans la liste.
   */
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/'+id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   * Créer un Nouveau livre.
   * @param newBook
   */
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed !');
        },
        (error) => {
          console.log('Could not remove photo ! : ' +error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookE1) => {
        if (bookE1 === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove,1);
    this.saveBooks();
    this.emitBooks();
  }

  /**
   * Méthode chargée d'uploader une image.
   * @param file
   */
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        /**Permet de ne pas avoir 2x le même nom d'image.*/
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' +almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de Chargement ! '+error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
