import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private location: Location,  private admobFree: AdMobFree, platform: Platform) {
     // Ads getting ready 
     platform.ready().then(() => {
      this.showBannerAdds();
      this.showInterstitialAds();
      }); 
   }

  ngOnInit() {
  }
  backPage(){
    this.location.back();
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
