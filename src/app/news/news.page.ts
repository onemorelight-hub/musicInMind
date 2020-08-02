import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { GoogleNews } from '../models/googleNews';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { LoadingService } from '../services/loading.service'; 
import { NavController, Platform } from '@ionic/angular';
import { Catagories } from '../shared/catagories';
import { CatagoryService } from '../services/catagory.service';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  topNews: GoogleNews;
  errMess: any;
  selectedCatagory: string;
  catagories = Catagories;
  // explore news 
  listNewsPages: any =[];
  newsCurrentPage: number;
  totalNewsPages: number;

  options: any = {"page": 2, "limit": 20};

  browserOptions : InAppBrowserOptions = {
    location : 'no',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'no',
    clearsessioncache : 'no',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

constructor(private newsService: NewsService, private router : Router, private route: ActivatedRoute,
  private inAppBrowser: InAppBrowser, private loadingService: LoadingService, 
  private catagoryService: CatagoryService, public navCtrl: NavController, private admobFree: AdMobFree,
  private platform: Platform, private statusBar: StatusBar) {
    this.catagoryService.catagory.subscribe((data)=>{
      this.selectedCatagory = data;
    })
    this.newsCurrentPage = 1;
    this.totalNewsPages =2;
}

ngOnInit() {
  this.getTopNews();
  // Ads getting ready 
  this.platform.ready().then(() => {
    this.statusBar.show();
    this.showBannerAdds();
    this.showInterstitialAds();
    }); 
}

method(url){
  console.log("Method clicked: ",url)
  let target = "_self";
  const browser = this.inAppBrowser.create(url,target,this.browserOptions);
  this.loadingService.showLoading();     
  browser.on('loadstart').subscribe((eve) => {
    this.loadingService.showLoading();     
  }, err => {
    this.loadingService.stopLoadin();
  })
  browser.on('loadstop').subscribe(()=>{
    this.loadingService.stopLoadin();
  }, err =>{
    this.loadingService.stopLoadin();
  })
  browser.on('loaderror').subscribe(()=>{
    this.loadingService.stopLoadin();
  }, err =>{
    this.loadingService.stopLoadin();
  })
  browser.on('exit').subscribe(()=>{
    this.loadingService.stopLoadin();
  }, err =>{
    this.loadingService.stopLoadin();
  })
}

segmentChanged(catagory){
  this.catagoryService.catagory.next(catagory.detail.value);
  this.resetAll()
  this.getTopNews();
  // Ads getting ready 
  this.platform.ready().then(() => {
    this.showBannerAdds();
    this.showInterstitialAds();
    }); 
}

// explore news implementation 
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
  this.newsService.getNews(this.options).subscribe((data)=>{
    this.listNewsPages.push(data);
    this.totalNewsPages=JSON.parse(JSON.stringify(data)).pages;
    this.newsCurrentPage=JSON.parse(JSON.stringify(data)).page;
    console.log("scroll data, totalPage: "+this.totalNewsPages);
    console.log("scroll data, currentPage: "+this.newsCurrentPage);
    console.log("scroll data: "+JSON.stringify(this.listNewsPages));
    event.target.complete();

  },err=>{
    console.log("Error: "+JSON.stringify(err));
    this.errMess = "Failed to Process! Check internet connection or report: details in the contact";
    event.target.complete();
  })
}else{
  event.target.complete();
}
}

getTopNews(){
  this.newsService.getTopNews().subscribe((res)=>{
  //  console.log('top News: '+JSON.stringify(res));
    console.log(res.status);
    this.topNews=res;
  },error=>{
    console.log(error)
    if(error.status == 202){
      this.errMess =error.error.text;
    }else{
    console.log('error news: '+JSON.stringify(error))
    this.errMess ="Failed to Process! Check internet connection or report: details in the contact";
    }
  })
}

resetAll(){
  this.errMess = null;
  this.topNews = null;
  this.listNewsPages = [];
  this.newsCurrentPage = 1;
  this.totalNewsPages =2;
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
