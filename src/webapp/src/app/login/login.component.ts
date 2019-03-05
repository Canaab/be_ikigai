import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService,FacebookLoginProvider,SocialUser } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  m_id: string;
  redirect_uri: string;

  user: SocialUser;

  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService, private httpClient: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.m_id = params['m_id'];
      this.redirect_uri = params['redirect_uri'];
    });
  }
  

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(this.user){
        console.log(this.user.id)
        console.log(this.m_id)
        console.log(this.redirect_uri)

        this.httpClient.post(" https://51e78cbe.ngrok.io/api/private/link",
        {
            "fb_id": this.user.id,
            "m_id": this.m_id
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
          
          window.location.href = this.redirect_uri + "&authorization_code=OK";
          }
        }); 
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
