import { Component } from '@angular/core';

import musicas from '../../assets/gatilhos/musicas.json';
import asmr from '../../assets/gatilhos/asmr.json';
import frequencias from '../../assets/gatilhos/frequencias.json';
import natureza from '../../assets/gatilhos/natureza.json'
import leidaatracao from '../../assets/gatilhos/leidaatracao.json'

import { Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  data = [
    {
      title: 'Músicas',
      albums: musicas
    },
    {
      title: 'ASMR',
      albums: asmr
    },
    {
      title: 'Frequencias',
      albums: frequencias
    },
    {
      title: 'Natureza',
      albums: natureza
    },
    {
      title: 'Afirmações Positivas',
      albums: leidaatracao
    }
  ];

  opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  };
  constructor(
    private router: Router,
    public tabs: TabsPage) {}

  openAlbum(album) {
    const titleEscaped = encodeURIComponent(album.title);
    
    this.router.navigateByUrl(`/tabs/tab1/${titleEscaped}`);
    this.tabs.changeData(album.title)
    
  }

  // Helper function for image names
  dasherize(string) {
    return string.replace(/[A-Z]/g, function(char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  };

}

