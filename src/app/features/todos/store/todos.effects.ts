import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { TodoService } from '../../../core/services/todos.service';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from './todos.actions';

@Injectable()
export class TodosEffects {
    loadTodos$;

    constructor(
        private readonly actions$: Actions,
        private readonly todoService: TodoService
    ) {
        this.loadTodos$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loadTodos),
                mergeMap(() =>
                    this.todoService.getTodos().pipe(
                        map(todos => loadTodosSuccess({ todos })),
                        catchError(error => of(loadTodosFailure({ error })))
                    )
                )
            )
        );
    }
}
