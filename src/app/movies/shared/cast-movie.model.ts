import { CastModel } from './cast.model';

export interface CastMovieModel {
    cast: CastModel;
    crew: Array<Object>;
    id: number;
}
