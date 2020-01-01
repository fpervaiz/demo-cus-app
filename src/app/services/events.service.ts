import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types
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
  url = 'https://app-cus.ddns.net/api/events';

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Basic ' + btoa("appuser:cusapp1815")
    })
  };

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
    return this.http.get(`${this.url}/${time}/${type}`, this.httpOptions).pipe(
      map(results => results));
  }

  /**
  * Get detailed information for an event ID
  * 
  * @param {string} id event ID to retrieve information
  * @returns Observable with detailed information
  */
  getDetails(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`, this.httpOptions).pipe(
      map(results => results)
    );
  }

  /**
  * Get detailed information for next event
  * 
  * @returns Observable with detailed information
  */
  nextEvent() {
    return this.http.get(`${this.url}/next`, this.httpOptions).pipe(map(results => results));
  }

  /**
  * Get detailed information for next event
  * 
  * @returns Observable with detailed information
  */
  getTerm() {
    return this.http.get(`${this.url}/term`, this.httpOptions).pipe(map(results => results));
  }
}