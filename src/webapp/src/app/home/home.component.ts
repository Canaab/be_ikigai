import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: SocialUser;
  private loggedIn: boolean;

  section: String;

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.sendID();
    });   
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signOut(): void {
    this.authService.signOut();
  }

  sendID() {
    this.httpClient.post(" https://51e78cbe.ngrok.io/api/private/login",
    {
        "fb_id": "10213903947695256"
    })
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    console.log("envoi fb_id")
  }

  getResult() {
    this.httpClient.post("https://51e78cbe.ngrok.io/api/private/result",
    {
        "fb_id": "10213903947695256"
    })
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    console.log("envoi fb_id for result")
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
        this.getResult();
        console.log("ikigai")
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
