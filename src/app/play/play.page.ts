import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import albums from '../../assets/gatilhos/albums';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

import { IonDatetime } from '@ionic/angular';

import { AnimationOptions } from 'ngx-lottie';

import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';

import asmr from '../../assets/gatilhos/asmr.json';
import frequencias from '../../assets/gatilhos/frequencias.json';
import natureza from '../../assets/gatilhos/natureza.json'
import leidaatracao from '../../assets/gatilhos/leidaatracao.json'


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit  {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  
  data = null
  tinglesAdds = []
  repoAsmr = asmr
  
  dataRepoGatilhos = [
    
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
  
  id
  timeLeft: number = 1800;
  interval;
  plus10 = 10
  menos10 = 10
  seconds = 0
  minutes = null
  hours = null

  tingles = {
    'frequencia-369hz' : {'title':'369hz','sinal':false,'bgcolor': '','animacao':true},
    'frequencia-432hz' : {'title':'432hz','sinal':false,'bgcolor': '','animacao':true},
    'frequencia-528hz': {'title':'528hz','sinal':false,'bgcolor': '','animacao':true},
    'frequencia-741hz': {'title':'741hz','sinal':false,'bgcolor': '','animacao':true},
    'frequencia-852hz': {'title':'852hz','sinal':false,'bgcolor': '','animacao':true},
    'brushing': {'title':'Brushing', 'sinal':false, 'bgcolor': '','animacao':true},
    'scratching': {'title':'Scratching', 'sinal':false, 'bgcolor': '','animacao':true},
    'pluck': {'title':'Pluck', 'sinal':false, 'bgcolor': '','animacao':true},
    'tuctuc' :{'title':'Tuc Tuc', 'sinal':false, 'bgcolor': '','animacao':true},
    'hands': {'title':'Movimento de Mãos', 'sinal':false, 'bgcolor': '','animacao':true},
    'mastigando': {'title':'Mastigando', 'sinal':false, 'bgcolor': '','animacao':true},
    'sons-de-boca': {'title':'Sons de Boca', 'sinal':false, 'bgcolor': '','animacao':true},
    'ondas': {'title':'Ondas no Mar', 'sinal':false, 'bgcolor': '','animacao':true},
    'trovao': {'title':'Trovões', 'sinal':false, 'bgcolor': '','animacao':true},
    'chuva-e-trovao':{'title':'Chuva e Trovão', 'sinal':false, 'bgcolor': '','animacao':true},
    'ventania': {'title':'Ventania', 'sinal':false, 'bgcolor': '','animacao':true},
    'chuva': {'title':'Chuva', 'sinal':false, 'bgcolor': '','animacao':true},
    'mantra-om': {'title':'Mantra Om', 'sinal':false, 'bgcolor': '','animacao':true},
    'mantra-kubera': {'title':'Mantra Kubera', 'sinal':false, 'bgcolor': '','animacao':true},
    'abundancia': {'title':'Abundancia', 'sinal':false, 'bgcolor': '','animacao':true},
    'prosperidade': {'title':'Prosperidade', 'sinal':false, 'bgcolor': '','animacao':true},
    'hooponopono': {'title':'Hooponopono', 'sinal':false, 'bgcolor': '','animacao':true},
    'bemsuperior': {'title':'Bem Superior', 'sinal':false, 'bgcolor': '','animacao':true},
    'dinheiro': {'title':'Eu Ganho Dinheiro', 'sinal':false, 'bgcolor': '','animacao':true}
   } 
  
  entrada_usuario = [];

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 3.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  };

  slideOpts2 = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 3.4,
    slidesOffsetBefore: 20,
    spaceBetween: 30,
    freeMode: true
  };

  options: AnimationOptions = {
    path: '/assets/animacoes/music.json',
  };
  optionsLottieTime: AnimationOptions = {
    path: '/assets/animacoes/relaxing-time.json',
  };


  constructor(
    private activatedRoute: ActivatedRoute, 
    private nativeAudio: NativeAudio,
    private router: Router,
    private insomnia: Insomnia
    ) {}

  ngOnInit() {
    
    this.startTimer()
  
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    
    //console.log(title)
    
    const decodedTitle = decodeURIComponent(title);
    
    this.data = albums[decodedTitle];    
    
    this.id = this.data.musica

    this.insomnia.keepAwake().then(()=>{
      this.nativeAudio.preloadSimple(this.id, 'assets/audios/'+this.data.musica+'.mp3')
      .then(()=>{
        this.nativeAudio.loop(this.id)
        //this.tabs.changeSinal()
      })
      .catch(()=>{this.playBG(title)})
    })

    
  }
  

  
  dasherize(string) {
    return string.replace(/[A-Z]/g, function(char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  };

  playBG(som){
    let id = albums[som].musica
    this.nativeAudio.loop(id)
  }

  stopBG(som){
    let id = albums[som].musica
    this.nativeAudio.stop(id)
  }

  stop(id){
    
    let index = this.tinglesAdds.findIndex(i => i.image == id)

    this.tingles[id]['animacao'] = true
    this.tinglesAdds.splice(index, 1)
    this.nativeAudio.stop(id)
  }

  play(data){
    
    let chave = data.image
    
    this.tingles[chave]['sinal'] = !this.tingles[chave]['sinal']
    
    if(this.tingles[chave]['sinal'] === true){
      //this.tingles[chave]['bgcolor'] = 'rgba(255, 255, 255, 0.466)'
      this.tingles[chave]['animacao'] = false
     
      let titleTingles = this.tingles[chave]['title']
      let tingleTemp = albums[titleTingles]
      
      this.tinglesAdds.push(tingleTemp)

      this.nativeAudio.preloadSimple(chave, 'assets/audios/'+chave+'.mp3')
      .then(()=>this.nativeAudio.loop(chave))
      .catch(()=> {
        this.nativeAudio.loop(chave)
  
      })
    } else {
        this.stop(chave)
        
    }
  }


  playAll(){}

  stopAll(){

    this.tinglesAdds.forEach(e=>{
      let chave = e.image
      this.tingles[chave]['sinal'] = !this.tingles[chave]['sinal']

      this.tingles[chave]['animacao'] = true

      this.nativeAudio.stop(e.musica)
      //this.stop(e.musica)
    })
    this.tinglesAdds.splice(0, this.tinglesAdds.length)
  }

  startTimer() {
    
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.seconds = Math.floor((this.timeLeft) % 60);
        console.log(this.timeLeft)
        //let minutes =  Math.floor(((this.timeLeft*1000) / 1000 / 60) % 60)
        //let hours = Math.floor(((this.timeLeft*1000) / (1000 * 60 * 60)) % 24);
        //this.hours = ('0'+hours).slice(-2)
        //this.minutes = ('0'+minutes).slice(-2)
        //console.log(('0'+this.hours).slice(-2) +':'+ ('0'+this.minutes).slice(-2))
      } else {
        this.stopAll()
        this.nativeAudio.stop(this.id)
        this.pauseTimer()
      }
    },1000)
  }

  pauseTimer() {
    this.insomnia.allowSleepAgain().then(()=>{
      clearInterval(this.interval);
    })
    
  }

  plus10min(){
    this.timeLeft = this.timeLeft + 600
  }

  menos10min(){
    this.timeLeft = this.timeLeft - 600 
  }

  voltar(){
    this.pauseTimer()
    this.stopAll()
    this.stopBG(this.data.title)
    this.router.navigateByUrl(`/tabs/tab1`);
  }

  volume(event, id){
    let range = event.detail.value
    let volume = range/10
    this.nativeAudio.setVolumeForComplexAsset(id, volume).then(
      onSuccess => {console.log(onSuccess)},
      onError =>{console.log(onError)});
  }
}
