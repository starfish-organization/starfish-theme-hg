import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  bootstrap: [AppComponent],
  providers: [],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app-root'
    }),
    ServerModule,
    AppModule
  ]
})
export class ServerAppModule {}
