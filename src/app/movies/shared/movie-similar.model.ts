import { MovieModel } from './movie.model';
import { MovieGenreModel } from './movie-genre.model';

export interface MovieSimilarModel {
    pag: number;
    results: Results[];
    total_pages: number;
    total_results: number;
}

interface Results {
    adult: boolean;
    backdrop_path: string;
    genre_ids: MovieGenreModel;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
