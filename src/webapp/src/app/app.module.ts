import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";

import { MaphilightModule } from 'ng-maphilight';
import { DiagrammeComponent } from './diagramme/diagramme.component'

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component'


let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("231117241129042")
  }
]);


export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DiagrammeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    MaphilightModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
