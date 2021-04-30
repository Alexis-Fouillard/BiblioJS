import { Component } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

    const config = {
      apiKey: 'AIzaSyDHHhUoOcrH4VbeHYg8_drwjUi-Na3MnSk',
      authDomain: 'biblioa.firebaseapp.com',
      projectId: 'biblioa',
      storageBucket: 'biblioa.appspot.com',
      messagingSenderId: '421478796256',
      appId: '1:421478796256:web:c87754c4152c20a16bb985',
      measurementId: 'G-1GBR5P7C7J'
    };
    // Initialize Firebase
    firebase.initializeApp(config);
  }
  title : 'BibliothequeJS';
}
