import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingService } from './services/loading.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.platform.backButton.subscribe(() =>{
      this.loadingService.stopLoadin();
      this.statusBar.show();
      console.log(this.router.url);
      if(this.router.url == "/tabs/movie" || this.router.url == "/tabs/news" || this.router.url == "/tabs/trends" || this.router.url == "/tabs/dance"){
        console.log("closing the app")
        navigator["app"].exitApp();
      }
    })
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
     this.statusBar.show();
    this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
  }
}
