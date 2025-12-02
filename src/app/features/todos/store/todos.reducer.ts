import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as TodosActions from './todos.actions';

export interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: any | null;
}

export const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null
};

export const todosReducer = createReducer(
    initialState,
    on(TodosActions.loadTodos, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(TodosActions.loadTodosSuccess, (state, { todos }) => ({
        ...state,
        todos,
        loading: false
    })),
    on(TodosActions.loadTodosFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
    on(TodosActions.addTodo, (state, { title }) => ({
        ...state,
        todos: [
            ...state.todos,
            { id: Date.now(), title, completed: false }
        ]
    })),
    on(TodosActions.toggleTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    })),
    on(TodosActions.deleteTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter(todo => todo.id !== id)
    }))
);
