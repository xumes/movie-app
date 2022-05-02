import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
   { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
