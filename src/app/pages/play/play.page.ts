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
    private admobFree: AdMobFree, platform: Platform) { 
     this.activatedRoute.queryParams.subscribe(params => {
      this.url = params['url']; 
      console.log(this.url);
   });
    // Ads getting ready 
    platform.ready().then(() => {
      this.showBannerAdds();
      this.showInterstitialAds();
      }); 
  }

  ngOnInit() {
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
