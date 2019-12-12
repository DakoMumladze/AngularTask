import { createSelector } from '@ngrx/store';

import { selectRouterState } from '../../../core/core.module';
import { selectExamples, ExamplesState } from '../examples.state';

import { movieAdapter } from './movies.reducer';

const { selectEntities, selectAll } = movieAdapter.getSelectors();

export const selectmovies = createSelector(
  selectExamples,
  (state: ExamplesState) => state.movies
);

export const selectAllmovies = createSelector(
  selectmovies,
  selectAll
);
export const selectmoviesEntities = createSelector(
  selectmovies,
  selectEntities
);

export const selectSelectedmovie = createSelector(
  selectmoviesEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
