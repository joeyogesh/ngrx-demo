import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { selectAllTodos, selectLoading } from '../store/todos.selectors';
import { loadTodos, toggleTodo, deleteTodo } from '../store/todos.actions';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-card todo-list-root">
      <div *ngIf="loading$ | async" class="loading">
        <div class="spinner" aria-hidden></div>
        <span>Loading todos...</span>
      </div>

      <ng-container *ngIf="(todos$ | async) as todos">
        <header class="header">
          <div class="title-row">
            <h2 class="main-title">My Tasks <span class="count">{{ todos.length }}</span></h2>
            <small class="kbd">Press Enter to add</small>
          </div>
          <p class="subtitle">Stay focused — small wins every day.</p>
        </header>

        <ul>
          <li *ngIf="todos.length === 0" class="empty">No todos yet — add your first task.</li>
          <li *ngFor="let todo of todos" [class.completed]="todo.completed">
            <label class="item">
              <input type="checkbox" [checked]="todo.completed" (change)="onToggle(todo.id)" />
              <span class="title">{{ todo.title }}</span>
            </label>
            <div class="actions">
              <button class="ghost" (click)="onDelete(todo.id)" aria-label="Delete todo">Delete</button>
            </div>
          </li>
        </ul>
      </ng-container>
    </div>
  `,
  styles: [
    `:host { display: block; max-width: 720px; margin: 1.5rem auto; }
      .todo-card { background: #fff; border-radius: 12px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); padding: 1rem; border: 1px solid rgba(15,23,42,0.04); }
      .todo-list-root { border: none; padding: 0; background: transparent; }
      .loading { display: flex; align-items: center; gap: 0.5rem; color: #6b7280; padding: 0.75rem; }
      .spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(0,0,0,0.08); border-top-color: #2563eb; animation: spin 0.8s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
      ul { list-style: none; margin: 0; padding: 0; }
      li { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid #f1f5f9; }
      li:last-child { border-bottom: none; }
      .item { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
      .title { font-size: 1rem; }
      li.completed .title { text-decoration: line-through; color: #6b7280; }
      .actions button { background: transparent; border: 1px solid transparent; padding: 0.25rem 0.5rem; border-radius: 6px; cursor: pointer; color: #ef4444; }
      .actions button.ghost:hover { background: rgba(239,68,68,0.06); }
      .empty { padding: 0.75rem; color: #6b7280; text-align: center; }
      `
  ]
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
