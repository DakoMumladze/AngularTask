import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../examples.state';
import { actionmoviesDeleteOne, actionmoviesUpsertOne } from './movies.actions';
import { selectmovies } from './moviess.selectors';

export const movies_KEY = 'EXAMPLES.movies';

@Injectable()
export class moviesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {}

  persistmovies = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionmoviesUpsertOne, actionmoviesDeleteOne),
        withLatestFrom(this.store.pipe(select(selectmovies))),
        tap(([actions, moviesState]) =>
          this.localStorageService.setItem(movies_KEY, moviesState)
        )
      ),
    { dispatch: false }
  );
}
