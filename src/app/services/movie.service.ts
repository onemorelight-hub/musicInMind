import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movieUrl } from '../shared/baseUrl'
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<any>{
    return this.httpClient.get(movieUrl+'getmovies');
  }

  getVideos(): Observable<any>{
    return this.httpClient.get(movieUrl+'getvideos');
  }
}
