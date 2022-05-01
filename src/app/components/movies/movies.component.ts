import { Component, OnInit, Input } from '@angular/core';
import { MovieDbService } from 'src/app/services/movie-db.service';
import { Movie } from '../../Movie'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  @Input() term: string = ''
  result:any =  {};
  movies: Movie[] = [];

  constructor(private movieDbService: MovieDbService) { }

  ngOnInit(): void {
    if (!this.term) {
     return this.getTrending()
    }
  }

  searchMovieByTitle(term: string) {
    if (!term) {
      return this.getTrending()
     }

    this.movieDbService.findMoviesByTitle(term)
    .subscribe((movies) => {
      this.result = movies
      this.movies = this.movieDbService.formatMovies(this.result)
    })
  }

  getTrending() {
    this.movieDbService.getWeekTrendingMovies()
    .subscribe((movies) => {
      this.result = movies
      this.movies = this.movieDbService.formatMovies(this.result)
    })
  }

}
