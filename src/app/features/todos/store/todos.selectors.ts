import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

export const selectTodosFeature = createFeatureSelector<TodosState>('todos');

export const selectAllTodos = createSelector(
    selectTodosFeature,
    (state) => state.todos
);

export const selectLoading = createSelector(
    selectTodosFeature,
    (state) => state.loading
);
