import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { console.log('authentication.service')}

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password)
      
    } catch (error) {
      alert("error!" + error.message);
    }
  }

 async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['login']);
  }

  public getAuth() {
   return this.afAuth;
 }
}
