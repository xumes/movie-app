import { Component, OnInit } from '@angular/core';
import { MovieDbService } from 'src/app/services/movie-db.service';
import { Movie } from '../../Movie'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  result:any =  {};
  movies: Movie[] = [];

  constructor(private movieDbService: MovieDbService) { }

  ngOnInit(): void {
    this.movieDbService.getWeekTrendingMovies()
      .subscribe((movies) => {
        this.result = movies
        this.movies = this.movieDbService.formatMovies(this.result)
        console.log("movies", this.movies)
      })
  }

}
