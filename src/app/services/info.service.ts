import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for info types
export enum InfoType {
  discounts = 'discounts',
  committee = 'committee',
  news_all = 'news/all',
  news_few = 'news/few'
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  url = 'http://localhost:5000/api/info';
  apiKey = ''; // <-- Enter your own key here!
 
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }
 
  /**
  * Get data from the Union API 
  * map the result to return only the results that we need
  * 
  * @param {SearchType} type discounts, committee
  * @returns Observable with the search results
  */
  getInfo(type: InfoType): Observable<any> {
    return this.http.get(`${this.url}/${type}`).pipe(
      map(results => results)
    );
  }
}
