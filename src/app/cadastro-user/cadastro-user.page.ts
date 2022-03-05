import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.page.html',
  styleUrls: ['./cadastro-user.page.scss'],
})
export class CadastroUserPage implements OnInit {
  username: string = ""
  password: string = ""
  cpassword: string = ""
  nome: string;
  sobrenome: string;
  nascimento: Date;
  email: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public toastController: ToastController,
    public db: AngularFireDatabase
  ) { }

  ngOnInit() {
  }

  async register(){
    const {username, password, cpassword} = this
    let usuario = {
      nome: this.nome,
      nascimento: this.nascimento,
      email: this.username
    }
    
    if(password !== cpassword){
      return this.errorPasswordToast()
    } else {
      try {
        await this.afAuth.createUserWithEmailAndPassword(username , password).then(res =>{
          let uid = res.user.uid
          this.db.database.ref("usuarios").push(usuario).then((res)=>{
            this.router.navigate(['/tabs/tab1'])
          }).catch(()=>{
            this.router.navigate(['login'])
          })
          // this.db.database.ref('usuarios').child(uid).set(usuario).then((res)=>{
          //   console.log(res)
          //   this.router.navigate(['/tabs/tab1'])
          // })
        })
        
      } catch (error) {
        console.log(error)
        if(error.code == 'auth/weak-password') {
          this.errorSenhaFracaToast()
        } else {this.errorExisteToast()}
      }
    }
    
  }
  async errorExisteToast() {
    const toast = await this.toastController.create({
      message: 'Email já cadastrado. Por favor escolha outro nome de usario.',
      duration: 2000
    });
    toast.present();
  }

  async errorPasswordToast() {
    const toast = await this.toastController.create({
      message: 'Senhas não combinam. Por favor tente outra vez.',
      duration: 2000
    });
    toast.present();
  }

  async errorSenhaFracaToast() {
    const toast = await this.toastController.create({
      message: 'A senha deve ter pelo menos 6 caracteres.',
      duration: 2000
    });
    toast.present();
  }

}
