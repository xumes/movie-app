import { Component, Input, OnInit } from '@angular/core';
import { MovieDbService } from 'src/app/services/movie-db.service';
import { Movie } from '../../Movie'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() term: string = ''
  result:any =  {};
  movies: Movie[] = [];

  constructor(private movieDbService: MovieDbService) { }

  ngOnInit(): void {

  }

}
