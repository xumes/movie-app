import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Movie } from '../Movie'
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieDbService {
  private movieDbBaseUrl: string = 'https://api.themoviedb.org/3/';
  private movieDbAccessToken: string = environment.movieDbApiKey;
  private movieImagePath: string = "https://image.tmdb.org/t/p/w500"
  private headers = new HttpHeaders();

  constructor(private http:HttpClient) {
    this.headers.set('Authorization', 'Bearer ' + this.movieDbAccessToken);
    this.headers.set('Content-Type', 'application/json;charset=utf-8');
  }

  getWeekTrendingMovies():Observable<any[]>{
    const url: string = this.movieDbBaseUrl + '/trending/movie/week?api_key=' + this.movieDbAccessToken
    const result = this.http.get<any[]>(url, {headers: this.headers})
    return result
  }

  formatMovies(list: any): Movie[] {
    const results = list.results

    let moviesList: Movie[] = [];
   for (let item of results) {
    moviesList.push(this.formatMovie(item))
   }

   return moviesList
  }

  formatMovie(item: any): Movie {
    return {
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: this.movieImagePath + item.poster_path,
      backdrop_path: this.movieImagePath + item.backdrop_path,
      vote_average: item.vote_average,
    }
  }
}
