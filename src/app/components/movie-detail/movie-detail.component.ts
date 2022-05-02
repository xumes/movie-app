import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieDetail } from 'src/app/Movie';
import { MovieDbService } from 'src/app/services/movie-db.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  private movieId: number = 0;
  result:any =  {};
  movieDetail: MovieDetail = {
    id: 0,
    title: "",
    overview: "",
    poster_path: "",
    backdrop_path: "",
    vote_average: 0,
    popularity: 0,
    status: "",
    release_date: "",
    tagLine: "",
    vote_count: 0,
    runtime: 0
  };

  constructor( private route: ActivatedRoute, private movieDbService: MovieDbService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId = parseInt(id)
    }

    return this.getDetails(this.movieId)

  }

  getDetails(id: number) {
    this.movieDbService.getMovieDetails(id)
      .subscribe((detail) => {
        this.result = detail;
        this.movieDetail = this.movieDbService.formatMovieDetail(this.result)
        console.log("details", this.movieDetail)
      })
  }

}
