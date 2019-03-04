import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: SocialUser;
  private loggedIn: boolean;

  section: String;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });   
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signOut(): void {
    this.authService.signOut();
  }

  clickSection(id: number): void {

    switch(id){
      case 1:{
        this.section = "Love";
        break;
      }
      case 2:{
        this.section = "Passion";
        break;
      }
      case 3:{
        this.section = "Mission";
        break;
      }
      case 4:{
        this.section = "Ikigai";
        break;
      }
      case 5:{
        this.section = "Good";
        break;
      }
      case 6:{
        this.section = "Need";
        break;
      }
      default:{
        this.section = "Erreur";
        break;
      }
    }
    
    
  }

}
