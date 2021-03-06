import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Movie, MovieDetail } from '../Movie'
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieDbService {
  private movieDbBaseUrl: string = 'https://api.themoviedb.org/3';
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
//https://api.themoviedb.org/3/search/movie?query=batman&api_key=474403c8576fa6b937dead073a877273&page=1
  findMoviesByTitle(term: string,  page?: number):Observable<any[]>{
    page = (page !== undefined) ? page : 1;
    const url: string = this.movieDbBaseUrl + '/search/movie?query=' + term + '&api_key=' + this.movieDbAccessToken + '&page=' + page
    const result = this.http.get<any[]>(url, {headers: this.headers})
    return result
  }

  getMovieDetails(id: number, page?: number): Observable<any[]>{
    page = (page !== undefined) ? page : 1;
    const url: string = this.movieDbBaseUrl + '/movie/' + id + '?api_key=' + this.movieDbAccessToken + '&page=' + page
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

  formatMovieDetail(item: any): MovieDetail {
    return {
      id: item.id,
      title: item.title,
      overview: item.overview,
      poster_path: this.movieImagePath + item.poster_path,
      backdrop_path: this.movieImagePath + item.backdrop_path,
      vote_average: item.vote_average,
      popularity: item.popularity,
      status: item.status,
      release_date: item.release_date,
      tagLine: item.tagLine,
      vote_count: item.vote_count,
      runtime: item.runtime
    }
  }
}
