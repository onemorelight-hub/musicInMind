import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  url: any;
  constructor(private activatedRoute: ActivatedRoute, private sanatizer: DomSanitizer,
    private admobFree: AdMobFree,private platform: Platform) { 
     this.activatedRoute.queryParams.subscribe(params => {
      this.url = params['url']; 
      console.log(this.url);
   });
   
    
  }

  ngOnInit() {
    // Ads getting ready 
    this.platform.ready().then(() => {
      this.showInterstitialAds();
      }); 
  }

  sanatize(url): any{
    return this.sanatizer.bypassSecurityTrustResourceUrl(url);
  }

  doRefresh(event){
    console.log("refresh claaed");
    this.ngOnInit();
    event.target.complete();
  }

  //Adds
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
