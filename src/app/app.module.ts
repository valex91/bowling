import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { FrameComponent } from './components/frame/frame.component';
import { PinsComponent } from './components/pins/pins.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScoreboardComponent,
    FrameComponent,
    PinsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
