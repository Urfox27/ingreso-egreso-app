import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs!: Subscription;

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState> ) { }

  initAuthListener() {
    
    this.auth.authState.subscribe( fuser => {
      if( fuser ){
        //existe
        this.userSubs = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {

            const user = Usuario.fromFirebase( firestoreUser );
            this.store.dispatch(authActions.setUser({ user }));
          })

      }else{
        //no existe
        if(this.userSubs){
          this.userSubs.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
      }
      
    });
  }

  createUser( nombre:string, email:string, password:string ) {
    return this.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {
              const newUser = new Usuario( user!.uid, nombre, email );
              return this.firestore.doc(`${ user!.uid }/usuario`).set({...newUser});
            });
  }

  loginUser( email:string, password:string ){
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser!= null )
    );
  }



}
