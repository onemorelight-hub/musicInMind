import { Component, OnInit } from '@angular/core';
import { YouTubeService } from '../services/you-tube.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-trends',
  templateUrl: './trends.page.html',
  styleUrls: ['./trends.page.scss'],
})
export class TrendsPage implements OnInit {

  indiaTrend : any
  usaTrend : any;
  ukTrend : any;
  latestTrailer : any;
  liveNews : any;
  movieSongs : any;
  LatestMusic : any;

  catagories = ['India', 'USA', "Trailer", "Live News", "Music", "Songs"];
  selectedCatagory = "India";
 
  errMess: any;
  constructor(private youTubeService: YouTubeService, private youtube: YoutubeVideoPlayer,  private admobFree: AdMobFree,private platform: Platform) {
    
   }

  ngOnInit() {
    this.youTubeService.getIndiaTrendVideos().subscribe((data)=>{
     this.indiaTrend = data;
    // console.log(JSON.stringify(data))
    },
    err=>{
      console.log("error: "+JSON.stringify(err))
      this.errMess = "Falied to process. Check internet connection or Update the App";
    }
    )
     // Ads getting ready 
     this.platform.ready().then(() => {
      this.showBannerAdds();
      this.showInterstitialAds();
      }); 
  }

 openVideo(id){
   console.log("video clicked: "+id)
  this.youtube.openVideo(id);
 }

 segmentChanged(catagory){
  this.reset(); 
  // Ads getting ready 
  this.platform.ready().then(() => {
    this.showBannerAdds();
    this.showInterstitialAds();
    });  
  switch(catagory.detail.value){
    case "USA": 
      this.youTubeService.getUSATrendVideos().subscribe((data)=>{
        this.usaTrend = data;
      },
      err=>{
        console.log("error: "+JSON.stringify(err))
        this.errMess = "Falied to process. Check internet connection or Update the App";
      })
     break;
     case "UK": 
      this.youTubeService.getUSATrendVideos().subscribe((data)=>{
        this.ukTrend = data;
      },
      err=>{
        console.log("error: "+JSON.stringify(err))
        this.errMess = "Falied to process. Check internet connection or Update the App";
      })
     break;
     case "Trailer": 
      this.youTubeService.getLatestTraillerVideos().subscribe((data)=>{
        this.latestTrailer = data;
      },
      err=>{
        console.log("error: "+JSON.stringify(err))
        this.errMess = "Falied to process. Check internet connection or Update the App";
      })
     break;
     case "Live News": 
      this.youTubeService.getLiveNewsVideos().subscribe((data)=>{
        this.liveNews = data;
      },
      err=>{
        console.log("error: "+JSON.stringify(err))
        this.errMess = "Falied to process. Check internet connection or Update the App";
      })
     break;
     case "Music": 
      this.youTubeService.getLatestMusicVideos().subscribe((data)=>{
        this.LatestMusic = data;
      },
      err=>{
        console.log("error: "+JSON.stringify(err))
        this.errMess = "Falied to process. Check internet connection or Update the App";
      })
     break;
     case "Songs": 
      this.youTubeService.getMovieSongVideos().subscribe((data)=>{
        this.movieSongs = data;
      },
      err=>{
        console.log("error: "+JSON.stringify(err))
        this.errMess = "Falied to process. Check internet connection or Update the App";
      })
     break;
  }
}

reset(){
  this.indiaTrend = null;
  this.usaTrend = null;
  this.ukTrend = null;
  this.latestTrailer = null;
  this.liveNews = null;
  this.movieSongs= null;
  this.LatestMusic = null;
}

//Adds
showBannerAdds(){
  const bannerConfig: AdMobFreeBannerConfig = {
    //isTesting: true,
    autoShow: true,
    id: "ca-app-pub-1941754750452964/1298976597"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
    // .catch(e => {alert(e)});

}

  showInterstitialAds(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        // isTesting: true, // Remove in production
        autoShow: true,//,
        id: "ca-app-pub-1941754750452964/4864377589"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {})
    //.catch(e => alert(e));

  }
}
