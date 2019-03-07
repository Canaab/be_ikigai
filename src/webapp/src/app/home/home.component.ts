import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

import { HttpClient } from '@angular/common/http';
import { Job } from './Job';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private add = "https://e80cb164.ngrok.io";

  user: SocialUser;
  private loggedIn: boolean;

  section: String;

  job:String;
  description:String;
  onisep:String;
  accuracy:String;
  
  job1:Job;
  job2:Job;
  job3:Job;
  job4:Job;

  

  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.sendID();
    });

    this.job1=new Job;
    this.job2=new Job;
    this.job3=new Job;
    this.job4=new Job;
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signOut(): void {
    this.authService.signOut();
  }

  sendID() {
    this.httpClient.post(this.add+"/api/private/login",
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
    this.httpClient.post(this.add+"/api/private/result",
    {
        "fb_id": this.user.id
    })
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
          
          this.job1.name = Object.values(val)[0][0].name;
          this.job1.description = Object.values(val)[0][0].description;
          this.job1.onisep = Object.values(val)[0][0].onisep;
          this.job1.accuracy = Object.values(val)[0][0].accuracy;

          this.job2.name = Object.values(val)[0][1].name;
          this.job2.description = Object.values(val)[0][1].description;
          this.job2.onisep = Object.values(val)[0][1].onisep;
          this.job2.accuracy = Object.values(val)[0][1].accuracy;

          this.job3.name = Object.values(val)[0][2].name;
          this.job3.description = Object.values(val)[0][2].description;
          this.job3.onisep = Object.values(val)[0][2].onisep;
          this.job3.accuracy = Object.values(val)[0][2].accuracy;

          this.job4.name = Object.values(val)[0][3].name;
          this.job4.description = Object.values(val)[0][3].description;
          this.job4.onisep = Object.values(val)[0][3].onisep;
          this.job4.accuracy = Object.values(val)[0][3].accuracy;

      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    console.log("envoi fb_id for result");
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
        this.section = "Découvre peut-être ton futur métier";
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


  clickjobs(id: number): void {

    switch(id){
      case 1:{
        this.job = this.job1.name;
        this.description = this.job1.description;
        this.onisep = this.job1.onisep;
        break;
      }
      case 2:{
        this.job = this.job2.name;
        this.description = this.job2.description;
        this.onisep = this.job2.onisep;
        break;
      }
      case 3:{
        this.job = this.job3.name;
        this.description = this.job3.description;
        this.onisep = this.job3.onisep;
        break;
      }
      case 4:{
        this.job = this.job4.name;
        this.description = this.job4.description;
        this.onisep = this.job4.onisep;
        break;
      }
      default:{
        this.job = "Erreur";
        break;
      }
    }
    
    
  }

}




