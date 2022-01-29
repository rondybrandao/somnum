import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ""
  password: string = ""
  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  async login(){
    const {username, password} = this
    try {
      await this.authService.login(username, password);
      //this.router.navigate(['home'])
    } catch (error) {
      console.dir(error)
      if(error.code === "auth/user-not-found"){
        console.log("user not found")
      }
    }
  }

}
