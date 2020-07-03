import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { youTubeUrl } from '../shared/baseUrl'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor(private httpClient: HttpClient) { }
  
  getIndiaTrendVideos():Observable<any>{
    return this.httpClient.get(youTubeUrl+"IndiaTrends");
  }
  getUSATrendVideos():Observable<any>{
    return this.httpClient.get(youTubeUrl+"USATrends");
  }
  getLiveNewsVideos():Observable<any>{
    return this.httpClient.get(youTubeUrl+"LiveNews");
  }
  getLatestMusicVideos():Observable<any>{
    return this.httpClient.get(youTubeUrl+"LatestMusic");
  }
  getLatestTraillerVideos():Observable<any>{
    return this.httpClient.get(youTubeUrl+"LatestTrailler");
  }
  getMovieSongVideos():Observable<any>{
    return this.httpClient.get(youTubeUrl+"MovieSong");
  }
}
