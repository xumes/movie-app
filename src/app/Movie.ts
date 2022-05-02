export interface Movie {
  id?: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string
  vote_average: number
}

export interface MovieDetail {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  vote_average: number,
  popularity: number,
  status: string,
  release_date: string,
  tagLine: string,
  vote_count: number,
  runtime: number
}
