import { moviestate } from './movies.model';
import { movieReducer, initialState } from './movies.reducer';
import { actionmoviesDeleteOne, actionmoviesUpsertOne } from './movies.actions';

describe('movieReducer', () => {
  const TEST_INITIAL_STATE: MovieState = {
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
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = movieReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a movie', () => {
    const action = actionmoviesUpsertOne({
      movie: {
        id: '1234',
        title: 'test',
        imageUrl: 'test',
        description: 'test'
      }
    });
    const state = movieReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].title).toEqual('test');
  });

  it('should update a movie', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = actionmoviesUpsertOne({
      movie: {
        id: id,
        title: 'updated',
        imageUrl: 'updated',
        description: 'updated'
      }
    });

    const state = movieReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        title: 'updated',
        imageUrl: 'updated',
        description: 'updated'
      })
    );
  });

  it('should remove a movie', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = actionmoviesDeleteOne({ id });
    const state = movieReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });
});
