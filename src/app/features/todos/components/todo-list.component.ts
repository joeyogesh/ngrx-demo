import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { selectAllTodos, selectLoading } from '../store/todos.selectors';
import { loadTodos, toggleTodo, deleteTodo } from '../store/todos.actions';

@Component({
    selector: 'app-todo-list',
    standalone: true, // ✅ standalone
    imports: [CommonModule],
    template: `
    <div *ngIf="loading$ | async">Loading todos...</div>
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <input type="checkbox" [checked]="todo.completed" (change)="onToggle(todo.id)">
        {{ todo.title }}
        <button (click)="onDelete(todo.id)">Delete</button>
      </li>
    </ul>
  `
})
export class TodoListComponent implements OnInit {
    todos$: Observable<Todo[]>;
    loading$: Observable<boolean>;

    constructor(private store: Store) {
        this.todos$ = this.store.select(selectAllTodos);
        this.loading$ = this.store.select(selectLoading);
    }

    ngOnInit() {
        this.store.dispatch(loadTodos());
    }

    onToggle(id: number) {
        this.store.dispatch(toggleTodo({ id }));
    }

    onDelete(id: number) {
        this.store.dispatch(deleteTodo({ id }));
    }
}
