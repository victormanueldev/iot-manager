import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any> = null;

  constructor(
    private afAuth  : AngularFireAuth,
    private afs     : AngularFirestore
  ) {

    //Return an observable whe nchange auth state 
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if(user) {
          return of(user);
        } else {
           return of(null);
        }
      })
    )

  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }

  signUp(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  logout(): Promise<void>{
    return this.afAuth.auth.signOut();
  }
}
