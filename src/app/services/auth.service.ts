import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Observable } from 'rxjs/internal/Observable';
import { map,  } from 'rxjs/operators';

import { Usuario } from '../models/user.model';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user$!: Observable<User | null>;// observable para consultar si el usuario esta logeado 

  constructor( public auth: Auth,
               public firestore: Firestore
              
  ) {
    // this.user$ = authState(this.auth);
   }
 // --------------experimental init ----------------------------

   //promesa para esperar a que fire base abra coneccion 
  //  async initFireConnection(): Promise<void>{
  //   await this.auth.authStateReady();
  //   console.log('user: ',this.auth.currentUser);
  //  }
  //   get usuarioActual() {
  //   return this.auth.currentUser;
  // }

  // --------------experimental end ----------------------------
  initAuthListener(){

    authState(this.auth).subscribe( fuser => {
      console.log( fuser );
    })
    
  }
 // --------------experimental init ----------------------------

//  crearUsuario(nombre: string, email: string, password: string) {
    
//     return createUserWithEmailAndPassword(this.auth, email, password)
//     .then( ({user}) => { //des estructuramos el usuario

//       const newUser = new Usuario( user.uid, nombre, email );

//       return this.firestore.doc(`${user.uid}/usuario`).set( newUser );
      

//     })
//   }
  // --------------experimental end ----------------------------

  async crearUsuario(nombre: string, email: string, password: string) {
    
    const credential = await createUserWithEmailAndPassword(this.auth, email, password)
    
      const newUser = new Usuario( credential.user.uid, nombre, email );

      // ✅ Versión moderna de set() en Firestore
    // const userRef = doc(this.firestore, `users/${credential.user.uid}`);
    const userRef = doc(this.firestore, `${credential.user.uid}/usuario`);
    await setDoc(userRef, { ...newUser });

    console.log('Usuario creado y documento Firestore generado:', newUser);
    return credential;
      
      
    
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut(){
    return this.auth.signOut();
  }

  isAuth(){
    return authState(this.auth).pipe(
      map( fbUser => fbUser != null)
    );
  }
}
