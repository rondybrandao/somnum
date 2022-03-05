import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { PlayPage } from '../play/play.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  providers: [PlayPage, NativeAudio],
  declarations: [TabsPage]
})
export class TabsPageModule {}
