import { Component, ViewChild } from '@angular/core';
import { PlayPage } from '../play/play.page';
import albums from '../../assets/gatilhos/albums';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tabs') tabs: IonTabs;
  data
  title
  selected = '';
  progress = 42;
  artist: any;
  selectedPlay = false
  
  constructor(private player: PlayPage) {}

  setSelectedTab() {
    this.selected = this.tabs.getSelected();
  }

  changeData(data){
    
    this.data = albums[data] 
    
    this.title = data
    this.artist = this.data.artist
    this.changeSinal()
  }

  // Helper function for image names
  dasherize(string) {
    return string.replace(/[A-Z]/g, function(char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase()
    })
  }

  play(data){
    this.selectedPlay = !this.selectedPlay

    this.player.playBG(data)
  }

  stop(data){
    this.selectedPlay = !this.selectedPlay
    this.player.stopBG(data)
  }

  changeSinal(){
    this.selectedPlay = false
  }

}

