import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BaseComponent } from './base/base.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt'
import { LoginComponent } from './ui/components/login/login.component';
import {FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login'
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config : {
        tokenGetter : () => {
          if (typeof window !== 'undefined') {
            return localStorage.getItem("accessToken");
          }
          return null;
        },
        allowedDomains :["localhost:7021"]
      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule
    ],
  providers: [
    {provide : "baseUrl", useValue:"https://localhost:7021/api",multi:true},
    {provide : "baseSignalRUrl", useValue:"https://localhost:7021/",multi:true},
    
    provideClientHydration(withEventReplay()),
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("894462296372-vc7madqnhl9gtbopcm385v8udni2rsvf.apps.googleusercontent.com")
          },
          {
            id : FacebookLoginProvider.PROVIDER_ID,
            provider : new FacebookLoginProvider("3974447892801368")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
