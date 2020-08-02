import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { StreamingService } from '../services/streaming-service.service';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-dance',
  templateUrl: './dance.page.html',
  styleUrls: ['./dance.page.scss'],
})
export class DancePage implements OnInit {

  danceList: any;
  moreData: any = [];
  options: any = {"page": 1, "limit": 8, "contentType":"dance"};
  newsCurrentPage: number;
  totalNewsPages: number;
  error: any;

  constructor(private streamingService: StreamingService, private streamingMedia: StreamingMedia,
    private admobFree: AdMobFree, private platform: Platform, private statusBar: StatusBar
    ) { 
    this.options.page=1;
    this.options.limit=8;
    this.newsCurrentPage=1;
      this.streamingService.getVideos(this.options).subscribe(data=>{
        this.danceList=data
        this.totalNewsPages = JSON.parse(JSON.stringify(data)).pages; 
        console.log(data)
        console.log( this.totalNewsPages)
      },
      err=>{
        this.error = "Failed to process. Check internet connection Or Update the app"
      }
    )
    
  }

  ngOnInit() {
     // Ads getting ready 
     this.platform.ready().then(() => {
       this.statusBar.show();
      this.showBannerAdds();
      this.showInterstitialAds();
      }); 
  }

  playFile(url, mode){
    console.log(url);
    if(mode =="normal"){
      this.streamingMedia.playVideo(url);
    }else{
      let options: StreamingVideoOptions = {
        successCallback: () => { console.log('Video played') },
        errorCallback: (e) => { console.log('Error streaming'); },
        orientation: 'landscape',
        shouldAutoClose: true,
        controls: true
    }
    this.streamingMedia.playVideo(url,options);
    };  
  }

loadData(event) {
    this.getMoreNews(event);    
    
    // Ads getting ready 
    this.platform.ready().then(() => {
      this.showBannerAdds();
      this.showInterstitialAds();
      }); 
}
getMoreNews(event){
  this.options.page = this.newsCurrentPage+1;
  if(this.totalNewsPages>=this.newsCurrentPage){
    this.streamingService.getVideos(this.options).subscribe((data)=>{
      this.moreData.push(data);
      this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
      this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
      console.log("scroll data, totalPage: "+this.totalNewsPages);
      console.log("scroll data, currentPage: "+this.newsCurrentPage);
      console.log(this.moreData)
      event.target.complete();

      },err=>{
        console.log("Error: "+JSON.stringify(err));
        this.error = "Failed to Process! Check internet connection or report: details in the contact";
        event.target.complete();
      })
    }else{
      event.target.complete();
    }
  }


  //Adds
showBannerAdds(){
  const bannerConfig: AdMobFreeBannerConfig = {
   // isTesting: true,
    autoShow: true,
    id: "ca-app-pub-1941754750452964/1298976597"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
     .catch(e => {alert(e)});

}

  showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
       // isTesting: true, // Remove in production
        autoShow: true,//,
        id: "ca-app-pub-1941754750452964/4864377589"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {})
    .catch(e => alert(e));

  }
}
