import * as assert from 'assert';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import { moviestate } from './movies.model';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { moviesEffects, movies_KEY } from './movies.effects';
import { actionmoviesDeleteOne, actionmoviesUpsertOne } from './movies.actions';

const scheduler = new TestScheduler((actual, expected) =>
  assert.deepStrictEqual(actual, expected)
);

describe('moviesEffects', () => {
  describe('persistmovies', () => {
    const moviesState: moviestate = {
      entities: {
        '1': {
          imageUrl: 'imageUrl',
          description: 'Description',
          id: '1',
          title: 'Title'
        }
      },
      ids: ['1']
    };
    let localStorage: LocalStorageService;
    let store: Store<any>;

    beforeEach(() => {
      localStorage = jasmine.createSpyObj('localStorage', ['setItem']);
      store = of({
        examples: {
          movies: moviesState
        }
      }) as any;
    });

    it('should not dispatch any actions', () => {
      const actions = new Actions(EMPTY);
      const effects = new moviesEffects(actions, store, localStorage);
      const metadata = getEffectsMetadata(effects);

      expect(metadata.persistmovies.dispatch).toEqual(false);
    });

    it('should call setItem on LocalStorageService for delete one action', () => {
      scheduler.run(helpers => {
        const { cold } = helpers;
        const action = actionmoviesDeleteOne({ id: '1' });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new moviesEffects(actions, store, localStorage);

        effects.persistmovies.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            movies_KEY,
            moviesState
          );
        });
      });
    });

    it('should call setItem on LocalStorageService for upsert one action', () => {
      scheduler.run(helpers => {
        const { cold } = helpers;
        const action = actionmoviesUpsertOne({ movie: {} as any });
        const source = cold('a', { a: action });
        const actions = new Actions(source);
        const effects = new moviesEffects(actions, store, localStorage);

        effects.persistmovies.subscribe(() => {
          expect(localStorage.setItem).toHaveBeenCalledWith(
            movies_KEY,
            moviesState
          );
        });
      });
    });
  });
});
