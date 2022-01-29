import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';

import { SharedDirectivesModule } from '../directives/shared-directives.module';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule,
    SharedDirectivesModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [PlayPage]
})
export class PlayPageModule {}
