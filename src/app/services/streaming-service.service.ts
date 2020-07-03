import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { streamingUrl } from '../shared/baseUrl'
@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private httpClient: HttpClient) { }

  getMovies(options): Observable<any>{
    return this.httpClient.post(streamingUrl+'movie/expl-movies',options);
  }

  getVideos(options): Observable<any>{
    console.log(options);
    return this.httpClient.post(streamingUrl+'dance/expl-insta-videos',options);
  }
}
