import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() onSearch: EventEmitter<string>= new EventEmitter()
  term: string = ''

  constructor() { }

  ngOnInit(): void {

  }

  handleSearch() {
    this.onSearch.emit(this.term)

    this.term = ''


  }

}
