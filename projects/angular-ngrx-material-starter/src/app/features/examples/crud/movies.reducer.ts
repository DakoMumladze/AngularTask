import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { movie, moviestate } from './movies.model';
import { actionmoviesDeleteOne, actionmoviesUpsertOne } from './movies.actions';
import { Action, createReducer, on } from '@ngrx/store';

export function sortByTitle(a: movie, b: movie): number {
  return a.title.localeCompare(b.title);
}

export const movieAdapter: EntityAdapter<movie> = createEntityAdapter<movie>({
  sortComparer: sortByTitle
});

export const initialState: moviestate = movieAdapter.getInitialState({
  ids: ['123'],
  entities: {
    '123': {
      id: '123',
      title: 'Reactive Programming with Angular and ngrx',
      imageUrl: 'Oren Farhi',
      description:
        'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
    }
  }
});

const reducer = createReducer(
  initialState,
  on(actionmoviesUpsertOne, (state, { movie }) =>
    movieAdapter.upsertOne(movie, state)
  ),
  on(actionmoviesDeleteOne, (state, { id }) => movieAdapter.removeOne(id, state))
);

export function movieReducer(state: moviestate | undefined, action: Action) {
  return reducer(state, action);
}
