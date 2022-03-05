import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';

import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, 
        IonicModule.forRoot(), 
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
    providers: [{ 
        provide: RouteReuseStrategy, 
        useClass: IonicRouteStrategy},
        Insomnia],
    bootstrap: [AppComponent]
})
export class AppModule {}
