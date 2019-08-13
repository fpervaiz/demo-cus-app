import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = 'all',
  debate = 'debate',
  speaker = 'speaker',
  panel = 'panel',
  other = 'other'
}
 
@Injectable({
  providedIn: 'root'
})

export class EventService {
  url = 'http://localhost:5000/api/events';
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
  * @param {string} time Event upcoming or finished
  * @param {SearchType} type All, debate, speaker, panel or other
  * @returns Observable with the search results
  */
  searchData(time: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}/${time}/${type}`).pipe(
      map(results => results)
    );
  }
 
  /**
  * Get detailed information for an event ID
  * 
  * @param {string} id event ID to retrieve information
  * @returns Observable with detailed information
  */
  getDetails(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  /**
  * Get detailed information for next event
  * 
  * @returns Observable with detailed information
  */
  nextEvent() {
    return this.http.get(`${this.url}/next`).pipe(map(results => results));
  }

  /**
  * Get detailed information for next event
  * 
  * @returns Observable with detailed information
  */
  getTerm() {
    return this.http.get(`${this.url}/term`).pipe(map(results => results));
  }
}