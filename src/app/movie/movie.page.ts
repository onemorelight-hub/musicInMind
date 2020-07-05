import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { StreamingService } from '../services/streaming-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  movieList: any;
  rowCount: any;
  error: any;
  moreData: any = [];
  options: any = {"page": 1, "limit": 6, "contentType":"dance"};
  newsCurrentPage: number;
  totalNewsPages: number;
  constructor(private streamingService: StreamingService, private youTubePlayer: YoutubeVideoPlayer, private router: Router 
    ,  private admobFree: AdMobFree,private platform: Platform) { 
   this.newsCurrentPage=1;   
    this.streamingService.getMovies(this.options).subscribe(data=>{
        this.movieList=data
        var rowCounnt = Math.ceil(this.movieList.docs.length/2);
        this.rowCount = Array(rowCounnt).fill(1);
        this.totalNewsPages = JSON.parse(JSON.stringify(data)).pages; 
        console.log(data)
        console.log( this.totalNewsPages)
        console.log(this.rowCount)
    },
    
      err=>{
        this.error = "Failed to process. Check internet connection Or Update the app"
      }
    )
     // Ads getting ready 
     this.platform.ready().then(() => {
      this.showBannerAdds();
      this.showInterstitialAds();
      }); 
  }

  ngOnInit() {
  }

  playFile(url, contentType){
    console.log(url);
    console.log(contentType);
    if(contentType=="youtube"){
      this.youTubePlayer.openVideo(url);
    }else{
      console.log("routing");
      let navigationExtras: NavigationExtras = {
        queryParams: {
          url: url
        }
      };
      this.router.navigate(['/play'],navigationExtras);
    }
  }


  loadData(event) {
    console.log("claas")
    this.getMoreData(event);    
    // Ads getting ready 
    this.platform.ready().then(() => {
      this.showBannerAdds();
      this.showInterstitialAds();
      });  
}
getMoreData(event){
  this.options.page = this.newsCurrentPage+1;
  if(this.totalNewsPages>=this.newsCurrentPage){
    this.streamingService.getMovies(this.options).subscribe((data)=>{
      this.moreData.push(data);
      var rowCounnt = Math.ceil(JSON.parse(JSON.stringify(data)).docs.length/2);
      this.rowCount = Array(rowCounnt).fill(1);
      
      this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
      this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
      console.log("scroll data, totalPage: "+this.totalNewsPages);
      console.log("scroll data, currentPage: "+this.newsCurrentPage);
      console.log("scroll data, rowCounnt: "+rowCounnt);

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
