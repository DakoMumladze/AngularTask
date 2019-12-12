import { actionmoviesDeleteOne, actionmoviesUpsertOne } from './movies.actions';

describe('movies Actions', () => {
  it('should create ActionmoviesUpsertOne action', () => {
    const action = actionmoviesUpsertOne({
      movie: {
        id: '1',
        title: 'test',
        imageUrl: 'test',
        description: ''
      }
    });
    expect(action.type).toEqual(actionmoviesUpsertOne.type);
    expect(action.movie).toEqual(
      jasmine.objectContaining({
        id: '1',
        title: 'test',
        imageUrl: 'test',
        description: ''
      })
    );
  });

  it('should create ActionmoviesDeleteOne action', () => {
    const action = actionmoviesDeleteOne({ id: '1' });
    expect(action.type).toEqual(actionmoviesDeleteOne.type);
    expect(action.id).toEqual('1');
  });
});
