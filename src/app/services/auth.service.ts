import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  /**
   * Permet à un utilisateur de se créer un compte.
   * @param email : string, l'email du user
   * @param password : string, user's pwd
   */
  createNewUser(email : string, password : string) {
    return new Promise<void> (
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error) ;
          }
        );
      }
    );
  }

  /**
   * Permet de connecter l'utilisateur si il a déjà un compte.
   * @param email : string, l'email du user
   * @param password: string, mdp du user
   */
  signInUser(email: string, password: string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signOutUser() {
    firebase.auth().signOut();
  }
}

