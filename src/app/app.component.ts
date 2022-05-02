import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'movie-app';
  items: Observable<any[]>;

  movies: any
  constructor(db: AngularFireDatabase){
    this.items = db.list('providers').valueChanges()
  }
}
