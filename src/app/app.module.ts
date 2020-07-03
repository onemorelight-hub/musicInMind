import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { CatagoryService } from './services/catagory.service'
import { NewsService } from './services/news.service'
import { YouTubeService } from './services/you-tube.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { DurationPipe } from './pipe/duration.pipe';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NewsService,
    InAppBrowser,
    SpinnerDialog,
    AdMobFree,
    CatagoryService,
    YoutubeVideoPlayer,
    StreamingMedia,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
