import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.module';

import { todosReducer } from './todos/todos.reducer';
import { TodosState } from './todos/todos.model';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketState } from './stock-market/stock-market.model';
import { movieReducer } from './crud/movies.reducer';
import { formReducer } from './form/form.reducer';
import { FormState } from './form/form.model';
import { moviestate } from './crud/movies.model';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<ExamplesState> = {
  todos: todosReducer,
  stocks: stockMarketReducer,
  movies: movieReducer,
  form: formReducer
};

export interface ExamplesState {
  todos: TodosState;
  stocks: StockMarketState;
  form: FormState;
  movies: moviestate;
}

export interface State extends AppState {
  examples: ExamplesState;
}
