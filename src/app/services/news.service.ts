import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { apiGatewayUrl } from '../shared/baseUrl' 
import { CatagoryService } from '../services/catagory.service'
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  currentCatagory : string;
  constructor(private httpClient : HttpClient,
     private catagoryService: CatagoryService) {
       this.catagoryService.catagory.subscribe((data)=>{
         this.currentCatagory = data;
       })
  }
  
  data: any;
  getTopNews(): Observable<any>{
    
    switch(this.currentCatagory){
      case "Top": 
      var url = apiGatewayUrl +'in/topnews';
      break;
      case "Business": 
      var url = apiGatewayUrl + 'in/businessNews';
      break;
      case "Health": 
      var url = apiGatewayUrl + 'in/healthNews';
      break;
      case "Sports": 
      var url = apiGatewayUrl + 'in/sportsNews';
      break;
      case "Science": 
      var url = apiGatewayUrl + 'in/scienceNews';
      break;
      case "Technology": 
      var url = apiGatewayUrl + 'in/technologyNews';
      break;
      case "Entertainment": 
      var url = apiGatewayUrl + 'in/entertainmentNews';
      break;
    }
    console.log(url);

    return this.httpClient.get(url);
  }

  getNews(options): Observable<any>{ 
    switch(this.currentCatagory){
      
      case "Top": 
      var url = apiGatewayUrl + 'in/expl-top-news';
      break;
      case "Business": 
      var url = apiGatewayUrl + 'in/expl-business-news';
      break;
      case "Health": 
      var url = apiGatewayUrl + 'in/expl-health-news';
      break;
      case "Sports": 
      var url = apiGatewayUrl + 'in/expl-sports-news';
      break;
      case "Science": 
      var url = apiGatewayUrl + 'in/expl-science-news';
      break;
      case "Technology": 
      var url = apiGatewayUrl + 'in/expl-technology-news';
      break;
      case "Entertainment": 
      var url = apiGatewayUrl + 'in/expl-entertainment-news';
      break;
    }
    console.log(url);
    console.log('Checking the options: '+JSON.stringify(options));
    return this.httpClient.post(url,options);
  }
}
