import { createAction, props } from '@ngrx/store';
import { movie } from './movies.model';

export const actionmoviesUpsertOne = createAction(
  '[movies] Upsert One',
  props<{ movie: movie }>()
);

export const actionmoviesDeleteOne = createAction(
  '[movies] Delete One',
  props<{ id: string }>()
);
